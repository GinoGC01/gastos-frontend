import { useAuth } from "../../hooks/useAuth"
import { useState } from "react";

export default function FormUpdateGasto({ open, handlerUpdate}) {
    const {users, user} = useAuth()
      const [selectedOptions, setSelectedOptions] = useState([user.user.id]);
    
      const toggleUser = (userId) => {
        setSelectedOptions((prev) =>
          prev.includes(userId)
            ? prev.filter((id) => id !== userId)
            : [...prev, userId]
        )
      }

  return (open && <>
    <form>
            <div>
            <label htmlFor="titulo">Título</label>
            <input type="text" name="titulo" id="titulo" required />
            </div>

            <div>
            <label htmlFor="descripcion">Descripción</label>
            <textarea name="descripcion" id="descripcion" />
            </div>

            <div>
            <label htmlFor="monto">Monto</label>
            <input type="number" name="monto" id="monto" required />
            </div>  

            {users.length > 1 && <div>
            <label>Se divide entre:</label>
            <div>
                {users.map((usuario) => (
                usuario._id != user.user.id && <label key={usuario._id} style={{ display: 'block' }}>
                    <input
                    type="checkbox"
                    value={usuario._id}
                    checked={selectedOptions.includes(usuario._id)}
                    onChange={() => toggleUser(usuario._id)}
                    />
                    {usuario.nombre}
                </label>
                ))}
            </div>
            </div>
            }

            <button type="submit">Confirmar</button>
        </form>
        <button onClick={handlerUpdate}>Modificar gasto</button>
     </>
    
  )
}
