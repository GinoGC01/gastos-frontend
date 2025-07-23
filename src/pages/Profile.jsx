import { useAuth } from '../hooks/useAuth.jsx'
import { useGasto } from '../hooks/useGasto.jsx'
import FormGasto from '../components/Forms/FormGasto.jsx'
import GastosCardsShort from '../components/Cards/GastosCardsShort.jsx'
import { usePaginationFilters } from '../hooks/useFilters.jsx'
import { Search } from '../components/Icons/Search.jsx'
import { Arrow } from '../components/Icons/Arrow.jsx'

export default function Profile() {
    const { user, logout } = useAuth()
    const { gastos } = useGasto()

    const {handlePagination, gastosPagination, valor, handleChange} = usePaginationFilters({gastos})

    if (!gastos) return <p>Cargando gastos...</p>

    return (
        <section className='Profile-section'>
            <div className='Profile-container'>
                <h1 className='Saludo_Profile'>Hola {user.nombre}</h1>
                <FormGasto />

                {gastos.length > 0 ? (
                    <div className='Gastos-incluye_Profile'>
                        <h2>
                            Gastos que te incluyen ({gastos.length})
                        </h2>

                        <form>
                            <label htmlFor="search" className="visually-hidden"><Search/></label>
                            <input
                                type="text"
                                name='search'
                                id='search'
                                value={valor}
                                placeholder='Filtrar por título, estado o categoría'
                                onChange={handleChange}
                            />
                        </form>

                        <ul>
                            {gastosPagination.map((gasto) => (
                                <GastosCardsShort key={gasto._id} gasto={gasto} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>{gastos.message}</div>
                )}

                <div className='Pagination-Gastos-incluye_Profile'>
                            <button onClick={() => handlePagination('previous')}>
                                <Arrow/>
                            </button>
                            <button onClick={() => handlePagination('next')}>
                                <Arrow/>
                            </button>
                </div>
                <button onClick={logout} className='Gasto-eliminar-button_Profile'>
                    Cerrar sesión
                </button>
            </div>
        </section>
    )
}
