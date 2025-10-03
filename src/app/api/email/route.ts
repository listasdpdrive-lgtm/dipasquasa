import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializamos Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple email regex
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
  if (company.length > 100) {
    return "La empresa no puede tener más de 100 caracteres.";
  }
  if (!emailRegex.test(email) || email.length > 200) {
    return "El email no es válido o es demasiado largo.";
  }
  if (phone.length > 100) {
    return "El teléfono no puede tener más de 100 dígitos.";
  }
  if (message.length < 3 || message.length > 5000) {
    return "El mensaje debe tener entre 3 y 5000 caracteres.";
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, message, website } = await req.json();

    // Honeypot anti-spam
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

    // 📤 Envío con Resend
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: Nuevo mensaje de ${name},
      reply_to: email,
      text: Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje:\n${message},
      html: htmlTemplate,
    });

    return NextResponse.json({
      ok: true,
      message: "Correo enviado con éxito",
    });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { message: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}
