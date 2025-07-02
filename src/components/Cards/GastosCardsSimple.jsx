
import { useAuth } from "../../hooks/useAuth";
import { useGasto } from "../../hooks/useGasto.jsx";
import useHandlerGastos from "../../hooks/useHandlerGastos.jsx";
import {Persona} from '../Icons/Persona.jsx'
import {Personas} from '../Icons/Personas.jsx'
import {Pagado} from '../Icons/Pagado.jsx'
import {Eliminar} from '../Icons/Eliminar.jsx'
import {ModificarGasto} from '../Icons/ModificarGasto.jsx'
import * as Icons from "../Icons";

function getCategoriaIcon(value) {
  const key = value.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase()); // convierte 'telefono_internet' => 'TelefonoInternet'
  return Icons[key] || null
}

export function GastosCardsSimple({ gasto }) {
  const { user, users } = useAuth()
  const {categoriasDisponibles} = useGasto()
  const {updateGastoOpen,
        toggleUser,
        handlerUpdate,
        handlerNombre,
        handlerGasto,
        handlerFecha,
        handleInputChange,
        handleSubmitUpdateGasto,
        handleDeleteGasto,
        handlerPagado,
        creadoPor,
        formData,
        selectedOptions} = useHandlerGastos({gasto})

  const categoriaFiltered = categoriasDisponibles.filter(categoria => categoria.value == gasto.categoria)


  return updateGastoOpen ? (
    <>
      <form onSubmit={handleSubmitUpdateGasto}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            required
            value={formData.titulo}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="monto">Monto</label>
          <input
            type="number"
            name="monto"
            id="monto"
            required
            value={formData.monto}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categoria</label>
          <select 
            name="categoria" 
            id="categoria"
            value={formData.categoria}
            onChange={handleInputChange}>
            {
            categoriasDisponibles.map(categoria => {
              return(
                <option value={categoria.value} key={categoria.value}>{categoria.label}</option>
              )
            })
            }
          </select>
        </div>

        {users.length > 1 && (
          <div>
            <label>Se divide entre:</label>
            <div>
              {users.map((usuario) => (
                usuario._id !== user.id && (
                  <label key={usuario._id} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={usuario._id}
                      checked={selectedOptions.includes(usuario._id)}
                      onChange={() => toggleUser(usuario._id)}
                    />
                    {usuario.nombre}
                  </label>
                )
              ))}
            </div>
          </div>
        )}
        <button type="submit">Confirmar</button>
      </form>

      {creadoPor && <div>
        <button onClick={handlerUpdate}>Volver</button>
        <button onClick={handleDeleteGasto}><Eliminar/></button>
      </div>}
    </>
  ) : (
    <div className="Container_cardSimple">
      <div className="Card-extended_cardSimple">
      <header>
        <div className="categoria_cardSimple">
          {
            (() => {
              const Icon = getCategoriaIcon(gasto.categoria);
              return Icon && <Icon />;
            })()
          }
          <p>{categoriaFiltered[0].label}</p>
        </div>
        <div className="details_cardSimple">
          {
            gasto.seDivide.length > 1 ? <Personas/> : <Persona/>
          }
          {(gasto.estado == 'pagado') && <Pagado/>}
        </div>
      </header> {/* HEADER CARD*/}

      <h4 className="titulo_cardSimple bg-component-childs">{gasto.titulo}</h4>
      <p style={{ whiteSpace: "pre-line" }} className="descripcion_cardSimple bg-component-childs">{gasto.descripcion}</p>


      <div className="gastoDetails_cardSimple ">
        <h4 className="bg-component-childs detail_gasto">Total: {gasto.monto}</h4>
        {gasto.seDivide.length > 1 && <h5 className="bg-component-childs detail_gasto">{handlerGasto.toFixed(2)} C/U</h5>}
      </div>

      
      {gasto.seDivide.length > 1 && (
      <div>
        <span className="se-divide_cardSimple">Se divide entre:</span>
            <ul className="bg-component-childs payers-container_cardSimple">
              {gasto.seDivide.map((user) => (
                <li key={user.userId._id}>{user.userId.nombre}</li>
              ))}
            </ul>
      </div>
      )}

      <div className="creadoPor_cardSimple bg-component-childs">
        {<span className="creadoPor-texto_cardSimple">{gasto.seDivide.length > 1 && handlerNombre}</span>}
        <h4>{handlerFecha}</h4>
      </div> 
      
      {creadoPor && !(gasto.estado == 'pagado') && <div className="buttons_cardSimple">
        <button onClick={handlerUpdate}><ModificarGasto/></button>
        <button onClick={handleDeleteGasto}><Eliminar/></button>
        <button onClick={handlerPagado}><Pagado/></button>
      </div>}
    </div>
    </div>
    
  );
}
