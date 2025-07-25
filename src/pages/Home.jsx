import { useAuth } from '../hooks/useAuth.jsx'
import { usePaginationFilters } from '../hooks/useFilters.jsx'
import { useGasto } from '../hooks/useGasto.jsx'
import FormGasto from '../components/Forms/FormGasto.jsx'
import { Search } from '../components/Icons/Search.jsx'
import { Arrow } from '../components/Icons/Arrow.jsx'
import GastosCardsShort from '../components/Cards/GastosCardsShort.jsx'
import { Filters } from '../components/Icons/Filters.jsx'
import { useState } from 'react'
import Notifications from '../components/Icons/Notifications.jsx'
import { NuevoGasto } from '../components/Icons/NuevoGasto.jsx'
import { Logout } from '../components/Icons/Logout.jsx'
import { Navigate } from "react-router-dom"
import Swal from 'sweetalert2'


export function Home() {
    const {user, logout, isAuthenticated} = useAuth()
    const {gastos, createGastoStatus, handleCreateGastoStatus} = useGasto()

    const {handlePagination, gastosPagination, handleEstadoChange, handleSearchChange, currentPage, gastosFiltered, searchTerm, estado} = usePaginationFilters({gastos})

    const [filters, setFilters] = useState(false)
    const handleFilter = ()=>{
        setFilters(!filters)
    }

    const handlerLogout = async () => {
        try {
            const confirm = await Swal.fire({
                    title: "¿Cerrar Sesión?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#690cc0ff",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, Cerrar Sesión",
                    cancelButtonText: "Cancelar"
                  });
            
                  if (!confirm.isConfirmed) return;
            await logout();
            if(!isAuthenticated) return <Navigate to="/login" replace/>

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }


    if (!gastos) return <p>Cargando gastos...</p>

    return (
        <section className='Home-section'>
            {createGastoStatus &&  <FormGasto />}
            <header className='top_Home-section'>
                <div className="header_Home-section">
                    <img src="../images/isotipoShorted.png" alt="logo de Gastapp" className='logo_Home-section' />
                    <span><Notifications/></span>
                </div>
                <div className='saludo_Home-section'>
                    <h3>Hola {user.nombre}</h3>
                    <h1>HOME</h1>
                    {/* agregar boton de logout */}
                    <button onClick={handlerLogout}><Logout/></button>
                </div>
            </header>
            <div className='Gastos-container'>
                <div className='menu_Home-section'>
                   {gastos.length > 0 && <button onClick={handleFilter} className='open-filters_Gastos-container'><Filters/><span>Filtros</span></button>}
                   <button onClick={handleCreateGastoStatus} className="open-form_Form-Gasto"> <NuevoGasto/><span>New</span></button>
                </div>
                { filters && <form className='form-filters-search_Home-section'>
                    <div className='filters-search_Home-section'>
                       <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        placeholder="Filtrar por título o categoría"
                        onChange={handleSearchChange}
                        />
                        <label htmlFor="search"><Search/></label>
                    </div>     
                    <div className='filters-state_Home-section'>
                        <select 
                            name="estado" 
                            id="estado" 
                            onChange={handleEstadoChange} 
                            value={estado}
                            >
                            <option value="">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="pagado">Pagado</option>
                        </select>
                    </div>            
                    
                </form>}
        
                {gastos.length > 0 ? (
                    <div className={gastos.length <= 4 ? 'Gastos-incluye_Profile Gastos-incluye-pagination' : 'Gastos-incluye_Profile'}>
                        <h2>
                            Gastos que te incluyen ({gastos.length})
                        </h2>
                        {gastosFiltered.length > 0 ? 
                        <ul>
                            {gastosPagination.map((gasto) => (
                                <GastosCardsShort key={gasto._id} gasto={gasto} />
                            ))}
                        </ul> : <div className='Gastos-message'>
                        <p>No posee gastos con los filtros aplicados, cree uno!</p>
                        <button onClick={handleCreateGastoStatus} className="open-form_Form-Gasto-02"> Crear Nuevo Gasto</button>
                    </div>}
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
