import { useAuth } from "../../hooks/useAuth.jsx";
import { useGasto } from "../../hooks/useGasto.jsx";
import { useState } from "react";
import { ArrowBack } from "../Icons/ArrowBack.jsx";
import {showToast} from '../../utils/toasts/toast.js'

export default function FormGasto() {
  const { createGasto, handleCreateGastoStatus, categoriasDisponibles,createGastoStatus } = useGasto();
  const { users, user } = useAuth();
  const [selectedOptions, setSelectedOptions] = useState([user.id]);

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
      creadoPor: user.id
    };

    try {
      await createGasto(gastoFinal);
       showToast({
            text: '¡Gasto creado!',
            background: '#4CAF50',
          })
    } catch (error) {
      console.error(error);
    }
  };

  return (<>
    {createGastoStatus && <div className='createGastoStatus'></div>}
    <div className="createGasto-container">
      <header>
        <button onClick={handleCreateGastoStatus} className='close-form_Form-Gasto'><ArrowBack/></button>   
        <h3 className="Form-createGasto-title">Nuevo gasto</h3>
      </header>    
      <form onSubmit={createNewGasto} className="Form-createGasto">
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

            <div>
              <label htmlFor="categoria">Categoria</label>
              <select 
              name="categoria" 
              id="categoria" 
              className="seDivide-select_CreateGasto"
              defaultValue={'otros'}
              >
                {
                categoriasDisponibles.map(categoria => {
                  return(
                    <option value={categoria.value} key={categoria.value}>{categoria.label}</option>
                  )
                })
                }
              </select>
            </div>

            {users.length > 1 && <div>
              <span>Se divide entre:</span>
              <div className="seDivide-container_CreateGasto">
                {users.map((usuario) => (
                  usuario._id != user.id && <label key={usuario._id}  className={selectedOptions.includes(usuario._id) ? 'label-activo seDivide_CreateGasto' : 'seDivide_CreateGasto'}>
                    <input
                      type="checkbox"
                      value={usuario._id}
                      checked={selectedOptions.includes(usuario._id)}
                      onChange={() => toggleUser(usuario._id)}
                      className="seDivide_CreateGasto-input"
                    />
                    <span>{usuario.nombre}</span>
                  </label>
                ))}
              </div>
            </div>
            }

            <button type="submit">Confirmar</button>
      </form>     
    </div>
  </>
    
  );
}
