import { useAuth } from '../hooks/useAuth.jsx'
import { usePaginationFilters } from '../hooks/useFilters.jsx'
import { useGasto } from '../hooks/useGasto.jsx'
import FormGasto from '../components/Forms/FormGasto.jsx'
import { Search } from '../components/Icons/Search.jsx'
import { Arrow } from '../components/Icons/Arrow.jsx'
import GastosCardsShort from '../components/Cards/GastosCardsShort.jsx'
import { Filters } from '../components/Icons/Filters.jsx'
import {Gasto} from '../components/Icons/Gasto.jsx'
import { useState } from 'react'
import Notifications from '../components/Icons/Notifications.jsx'
import { NuevoGasto } from '../components/Icons/NuevoGasto.jsx'

export function Home() {
    const {user} = useAuth()
    const {gastos, createGastoStatus, handleCreateGastoStatus} = useGasto()

    const {handlePagination, gastosPagination, valor, handleChange, currentPage, gastosFiltered} = usePaginationFilters({gastos})

    const [filters, setFilters] = useState(false)
    const handleFilter = ()=>{
        setFilters(!filters)
    }
    if (!gastos) return <p>Cargando gastos...</p>

    return (
        <section className='Home-section'>
            {createGastoStatus &&  <FormGasto />}
            <div className='top_Home-section'>
                <div className="header_Home-section">
                    <span><Gasto/></span>
                    <span><Notifications/></span>
                </div>
                <div className='saludo_Home-section'>
                    <h3>Hola {user.nombre}</h3>
                    <h1>HOME</h1>
                </div>
            </div>
            <div className='Gastos-container'>
                <div className='menu_Home-section'>
                   {gastos.length > 0 && <button onClick={handleFilter} className='open-filters_Gastos-container'><Filters/><span>Filtros</span></button>}
                   <button onClick={handleCreateGastoStatus} className="open-form_Form-Gasto"> <NuevoGasto/><span>New</span></button>
                </div>
                { filters && <form className='form-filters-search_Home-section'>                  
                    <input
                        type="text"
                        name='search'
                        id='search'
                        value={valor}
                        placeholder='Filtrar por título, estado o categoría'
                        onChange={handleChange}
                    />
                    <label htmlFor="search"><Search/></label>
                </form>}
        
                {gastos.length > 0 ? (
                    <div className={gastos.length <= 4 ? 'Gastos-incluye_Profile Gastos-incluye-pagination' : 'Gastos-incluye_Profile'}>
                        <h2>
                            Gastos que te incluyen ({gastos.length})
                        </h2>
                        <ul>
                            {gastosPagination.map((gasto) => (
                                <GastosCardsShort key={gasto._id} gasto={gasto} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className='Gastos-message'>
                        <p>No posee gastos, cree uno!</p>
                        <button onClick={handleCreateGastoStatus} className="open-form_Form-Gasto-02"> Crear Nuevo Gasto</button>
                    </div>
                )}

                {gastos.length > 4 && <div className='Pagination-Gastos-incluye_Profile'>
                    <button onClick={() => handlePagination('previous')}>
                        <Arrow/>
                    </button>
                    <p>{currentPage + 1} / {gastosFiltered.length > 0 ? Math.ceil(gastosFiltered.length/4): Math.ceil(gastos.length/4)}</p>
                    <button onClick={() => handlePagination('next')}>
                        <Arrow/>
                    </button>
                </div>}
            </div>
        </section>
    )
}
