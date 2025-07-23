import useFecha from '../../hooks/useFecha'

export function CardHistorialActualizacion({actualizacion}) {
  const {fechaLarga} = useFecha({fecha: actualizacion.fecha})
  return (
    <li key={actualizacion.fecha} className='Card_historial-actualizaciones'>
                <div className='Content-Card_historial-actualizaciones'>
                  <span>Cambios: </span>
                  {
                    <ul>
                      {Object.entries(actualizacion.cambios).map(([clave, valor]) => (
                        <li key={clave} className={clave == 'descripcion' ? 'descripcion_historial-actualizaciones' : 'normal_historial-actualizaciones'}>
                          {clave !== 'seDivide' ? <strong>{ '- ' + clave + ": "}</strong> :
                          <strong>- Se divide:</strong>}
                          {clave == 'seDivide' && Array.isArray(valor)
                            ? <div>cant. personas (<b>{valor.length}</b>)</div>
                            : String(valor)} 
                            {/* tener en cuenta que 'String(valor)' es por si necesito imprimir el valor de otro campo en caso que no sea 'seDivide' */}
                        </li>
                      ))}
                    </ul>
                  }
                </div>
                <span> Fecha: {fechaLarga}</span>
              </li>
  )
}
