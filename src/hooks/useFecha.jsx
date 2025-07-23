import React from 'react'

export default function useFecha({fecha}) {
    const fechaLarga =  new Date(fecha).toLocaleString("es-AR", {
        dateStyle: "long",
        timeStyle: "short",
      })

  return (
   {
    fechaLarga
   }
  )
}
