import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useGasto } from '../hooks/useGasto.jsx'
import FormGasto from '../components/Forms/FormGasto.jsx'
import { GastosCardsSimple } from '../components/Cards/GastosCardsSimple.jsx'

export default function Profile() {
    const [openCreateGasto, setOpenCreateGasto] = useState(false)
    const {user, logout} = useAuth()
    const { gasto } = useGasto()


    const handlerOpenNewGasto = () => {
        setOpenCreateGasto(!openCreateGasto)
    }





    if (!gasto) return <p>Cargando gastos...</p>; // espera a que se cargue


    return (
        <section className='Profile-section'>
        <div className='Profile-container'>
        <h1 className='Saludo_Profile'> Hola {user.nombre}</h1>
        {gasto.gastos.length > 0 ? 
        <div className='Gastos-incluye_Profile'>
            <h2>Gastos que te incluyen </h2>
            <ul>
                {
                    gasto.gastos?.map((gasto)=>{
                        return(
                            <GastosCardsSimple key={gasto._id} gasto={gasto}/>
                        )
                    })
                }
            </ul>
        </div>
         : 
        <div>{gasto.message}</div>}
        <button onClick={handlerOpenNewGasto} className='Gasto-nuevo-button_Profile'>{openCreateGasto ? 'Volver' : 'Crear gasto nuevo'}</button>
        {openCreateGasto && <FormGasto/>}
        <button onClick={logout} className='Gasto-eliminar-button_Profile'>Cerrar sesion</button>
        </div>
        
        </section>
    )
}
