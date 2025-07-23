
import { useAuth } from "../../hooks/useAuth";
import { useGasto } from "../../hooks/useGasto.jsx";
import useHandlerGastos from "../../hooks/useHandlerGastos.jsx";
import {Persona} from '../Icons/Persona.jsx'
import {Personas} from '../Icons/Personas.jsx'
import {Pagado} from '../Icons/Pagado.jsx'
import {Eliminar} from '../Icons/Eliminar.jsx'
import {ModificarGasto} from '../Icons/ModificarGasto.jsx'
import * as Icons from "../Icons";
import { CardHistorialActualizacion } from "./CardHistorialActualizacion.jsx";

function getCategoriaIcon(value) {
  const key = value.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase()); // convierte 'telefono_internet' => 'TelefonoInternet'
  return Icons[key] || null
}

export function GastosCardsSimple({ gasto }) {
  const { user, users } = useAuth()
  const {categoriasDisponibles, pagado} = useGasto()
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
        selectedOptions,
        openHistorialAct,
        handleropenHistorialAct} = useHandlerGastos({gasto})

  const categoriaFiltered = categoriasDisponibles.filter(categoria => categoria.value == gasto.categoria)


  return updateGastoOpen ? (
    <div className="Card-extended_cardSimple">
      <h4>Actualizar Gastos</h4>

      <form onSubmit={handleSubmitUpdateGasto} className="Form-createGasto updateGasto_Form">
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
            onChange={handleInputChange}
            className="seDivide-select_CreateGasto">
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
            <div className="seDivide-container_CreateGasto">
              {users.map((usuario) => (
                usuario._id !== user.id && (
                  <label key={usuario._id}  className={selectedOptions.includes(usuario._id) ? 'label-activo seDivide_CreateGasto' : 'seDivide_CreateGasto'}>
                    <input
                      type="checkbox"
                      value={usuario._id}
                      checked={selectedOptions.includes(usuario._id)}
                      className="seDivide_CreateGasto-input"
                      onChange={() => toggleUser(usuario._id)}
                    />
                    {usuario.nombre}
                  </label>
                )
              ))}
            </div>
          </div>
        )}
        <button type="submit">Actualizar</button>
      </form>

      {users.length > 0 && <span>Tenga en cuenta que las personas en las que se dividen vuelve a ser 0</span>}

      {creadoPor && <div className="buttons_cardSimple updateGasto_buttons">
        <button onClick={handlerUpdate}>Volver</button>
        <button onClick={handleDeleteGasto}><Eliminar/></button>
      </div>}
    </div>
  ) : (  
    <div className="Card-extended_cardSimple">
      <div className="header-container_cardSimple">
        <header data-view-transition={`tu-nombre-${gasto._id}`}>
        <div className="categoria_cardSimple">
          {
            gasto.categoria ? (() => {
              const Icon = getCategoriaIcon(gasto.categoria);
              return Icon && <Icon />;
            })() : 'No se cargo categoria'
          }
          <p>{gasto.categoria && categoriaFiltered[0].label}</p>
        </div>
        <div className="details_cardSimple">
          {
            gasto.seDivide.length > 1 ? <Personas/> : <Persona/>
          }
          {(pagado || gasto.estado == 'pagado') && <Pagado/>}
        </div>
        </header> {/* HEADER CARD*/}
        <h4 className="titulo_cardSimple">{gasto.titulo}</h4>
      </div>



      <div className="gastoDetails_container_cardSimple">
        <div className="bg-component_container_cardSimple">
          <h4 className="">Descripcion</h4>
          <p style={{ whiteSpace: "pre-line" }} className="descripcion_cardSimple bg-component-childs">{gasto.descripcion}</p>  
        </div>
      

        <div className="bg-component_container_cardSimple" >
          <h4>Paga</h4>
          <div className="gastoDetails_cardSimple ">
            <h4 className="bg-component-childs detail_gasto">Total: {gasto.monto}</h4>

            {gasto.seDivide.length > 1 && <h5 className="bg-component-childs detail_gasto">{handlerGasto.toFixed(2)} C/U</h5>}
          </div>
        </div>


   
        {gasto.seDivide.length > 1 && (
        <div className="bg-component_container_cardSimple">
          <h4 className="se-divide_cardSimple">Se divide entre</h4>
              <ul className="bg-component-childs payers-container_cardSimple">
                {gasto.seDivide.map((user) => (
                  <li key={user.userId._id}>{user.userId.nombre}</li>
                ))}
              </ul>
        </div>
        )}

        <div className="bg-component_container_cardSimple">
          <h4>
            Creado
          </h4>
           <div className="creadoPor_cardSimple bg-component-childs">
          
          {<span className="creadoPor-texto_cardSimple">{gasto.seDivide.length > 1 && handlerNombre}</span>}
          <p>{handlerFecha}</p>
        </div> 
        </div>

       
        
        {creadoPor && !(gasto.estado == 'pagado' || pagado) && <div className="buttons_cardSimple">
          <button onClick={handlerUpdate}><ModificarGasto/></button>
          <button onClick={handleDeleteGasto}><Eliminar/></button>
          <button onClick={handlerPagado}><Pagado/></button>
        </div>}

        {gasto.historialActualizaciones.length > 0 && 
        <div className="historial-actualizaciones_cardSimple">
          <header>
            <button onClick={handleropenHistorialAct}>{openHistorialAct ? "Minimizar" : "Ver historial de cambios"}</button>
          </header>
          {openHistorialAct && <ul>
            {
              gasto.historialActualizaciones?.map(actualizacion => (
              <CardHistorialActualizacion actualizacion={actualizacion} key={actualizacion.fecha}/>
              ))
            }
          </ul>}
        </div>}
        
      </div>
    </div>

    
  );
}
