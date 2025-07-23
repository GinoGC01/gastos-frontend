import { useState } from 'react'
import GastosCardsShort from './GastosCardsShort'
import { GastosCardsSimple } from './GastosCardsSimple'

export default function CardGastoProfile({gasto}) {
const [open, setOpen] = useState(false)

const handlerOpen = ()=>{
    setOpen(!open)
}

  return (
    !open ? <li onClick={handlerOpen}><GastosCardsShort gasto={gasto} onClick={handlerOpen} /></li> 
     :  <li >
      <GastosCardsSimple gasto={gasto} />
      <button onClick={handlerOpen}>Minimizar</button>
      </li> 
  )
}
