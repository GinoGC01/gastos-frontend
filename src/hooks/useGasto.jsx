import { useContext } from 'react'
import GastosContext from '../context/GastoContext'

export function useGasto() {
    const context = useContext(GastosContext)
    if(!context) throw new Error("useGasto must be used within an GastoProvider");
  return context;
}
