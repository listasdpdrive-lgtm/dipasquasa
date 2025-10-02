import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Inicializa Redis y Ratelimit (fuera del handler)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "1 m"),
});

// Simple email regex (no perfecta, pero segura para validación básica)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInputs(
  name: string,
  company: string,
  email: string,
  phone: string,
  message: string
) {
  name = name.trim();
  company = company.trim();
  email = email.trim();
  phone = phone.trim();
  message = message.trim();
  if (!name || !email || !phone || !message) {
    return "Todos los campos son requeridos.";
  }
  if (name.length < 2 || name.length > 100) {
    return "El nombre debe tener entre 2 y 100 caracteres.";
  }
  if (company.length > 100)
    return "La empresa no puede tener más de 100 caracteres.";

  if (!emailRegex.test(email) || email.length > 200) {
    return "El email no es válido o es demasiado largo.";
  }
  if (phone.length > 100)
    return "El teléfono no puede tener más de 100 digitos";

  if (message.length < 3 || message.length > 5000) {
    return "El mensaje debe tener entre 3 y 5000 caracteres.";
  }
  return null; // paso todas las validaciones.
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { message: "Demasiadas solicitudes, intenta más tarde." },
        { status: 429 }
      );
    }

    const { name, company, email, phone, message, website } = await req.json();

    // Honeypot anti-spam -> sirve para detectar bots.
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // Ignora bots
    }

    const validationError = validateInputs(
      name,
      company,
      email,
      phone,
      message
    );
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
        <h2 style="color: #2c3e50; margin-bottom: 16px;">📩 Nuevo mensaje desde el formulario web</h2>
        
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        
        <div style="margin-top: 20px; padding: 12px; border-left: 4px solid #3498db; background: #fff;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <hr style="margin: 24px 0;" />

        <p style="font-size: 12px; color: #999;">Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: "dipasquarepuestos@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ ok: true, message: "Correo enviado con éxito" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}
