import { useParams } from 'react-router-dom'
import { useGasto } from '../hooks/useGasto'
import { GastosCardsSimple } from '../components/Cards/GastosCardsSimple'
import useHref from '../hooks/useHref.jsx'
import { ArrowBack } from '../components/Icons/ArrowBack.jsx'

export function Gasto() {
    const {id} = useParams()
    const {gastos} = useGasto()

    const gastoFinded = gastos.find(gasto => id === gasto._id)
    const {handleClick} = useHref()

    
    if (!gastoFinded) return <p>Gasto no encontrado</p>;
    
     return (
        <section className='Gasto-section'>
                <header className='volver-header'>
                        <button onClick={()=>{handleClick(`/home`)}} className='close-form_Form-Gasto'><ArrowBack/></button>   
                        <h3 className="Form-createGasto-title">Detalles del gasto</h3>
                </header>  
                <GastosCardsSimple gasto={gastoFinded}/>
        </section>
    )
}
