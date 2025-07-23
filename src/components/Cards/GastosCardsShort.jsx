import { useGasto } from "../../hooks/useGasto.jsx";
import useHandlerGastos from "../../hooks/useHandlerGastos.jsx";
import { Persona } from '../Icons/Persona.jsx';
import { Personas } from '../Icons/Personas.jsx';
import { Pagado } from '../Icons/Pagado.jsx';
import * as Icons from "../Icons";
import useHref from "../../hooks/useHref.jsx";

function getCategoriaIcon(value) {
  const key = value.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase()); // ejemplo: telefono_internet -> TelefonoInternet
  return Icons[key] || null;
}

export default function GastosCardsShort({ gasto }) {
  const { categoriasDisponibles } = useGasto();
  const { handlerGasto, handlerFecha } = useHandlerGastos({ gasto });
  const categoriaFiltered = categoriasDisponibles.find(c => c.value === gasto.categoria);

  const {handleClick} = useHref()

  return (
    <div
      onClick={()=>{handleClick(`/gasto/${gasto._id}`)}}
      className={`Card-short_cardSimple ${gasto.estado === 'pagado' ? 'Card-short_cardSimple-bg-green' : 'Card-short_cardSimple-bg-yellow'}`}
      style={{ cursor: 'pointer' }}
    >
      <header data-view-transition={`tu-nombre-${gasto._id}`}>
        <div className="categoria_cardSimple">
          {
            gasto.categoria ? (() => {
              const Icon = getCategoriaIcon(gasto.categoria);
              return Icon && <Icon />;
            })() : 'No se cargo categoria'
          }
          <p>{categoriaFiltered?.label}</p>
        </div>
        <div className="details_cardSimple">
          {gasto.seDivide.length > 1 ? <Personas /> : <Persona />}
          {gasto.estado === 'pagado' && <Pagado />}
        </div>
      </header>

      <div className="Card-short-data_cardSimple">
        <h3>{gasto.titulo}</h3>
        <div className="gasto-Card-short-data_cardSimple">
          <h4>$ {gasto.monto}</h4>
          {gasto.seDivide.length > 1 && <p>{handlerGasto.toFixed(2)} C/U</p>}
        </div>
      </div>

      <footer>{handlerFecha}</footer>
    </div>
  );
}
