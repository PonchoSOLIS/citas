export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
      weekday: 'long',
      year:'numeric',
      month: 'long',
      day: 'numeric'
    }
    return nuevaFecha.toDateString('es-ES',opciones)  //este metodo existe en los tipos fecha
  }