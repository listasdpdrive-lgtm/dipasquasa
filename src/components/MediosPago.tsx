"use client"

import Image from "next/image"

const images = [
  "/mediospago/mercajoja.png",
  "/mediospago/visardini.png",
  "/mediospago/jefe mastercard.png",
  "/mediospago/efestivo.png",
  "/mediospago/cheques.png",
]

export default function MediosPago() {
  return (
    <div className="w-full py-6 text-center">
      
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        Aceptamos todas las tarjetas y medios de pago
      </h3>

      <div className="flex justify-center items-center gap-6 flex-wrap">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
          >
            <Image
              src={img}
              alt={`imagen-${i}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

    </div>
  )
}