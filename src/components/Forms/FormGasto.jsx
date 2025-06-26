import { useAuth } from "../../hooks/useAuth";
import { useGasto } from "../../hooks/useGasto";
import { useState } from "react";

export default function FormGasto() {
  const { createGasto, createGastoStatus, handleCreateGastoStatus } = useGasto();
  const { users, user } = useAuth();
  const [selectedOptions, setSelectedOptions] = useState([user.user.id]);

  const toggleUser = (userId) => {
    setSelectedOptions((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const createNewGasto = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);

    const gastoFinal = {
      ...fields,
      monto: parseFloat(fields.monto),
      seDivide: selectedOptions, // los IDs de usuarios seleccionados
      creadoPor: user.user.id
    };

    try {
      await createGasto(gastoFinal);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      {createGastoStatus ? 
        <div>
          <p>Gasto creado con éxito</p>
          <button onClick={handleCreateGastoStatus}>Crear otro gasto</button>
        </div> :
      <form onSubmit={createNewGasto}>
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
      </form> }
    </>
  );
}
