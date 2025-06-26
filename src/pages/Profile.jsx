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
        <>
        <h1> Hola {user.user.nombre}</h1>
        {gasto.gastos.length > 0 ? 
        <div>
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
        <button onClick={handlerOpenNewGasto}>Crear nuevo gasto</button>
        {openCreateGasto && <FormGasto/>}
        <button onClick={logout}>Cerrar sesion</button>
        </>
    )
}
