import { useState } from 'react'
import { useAuth } from './useAuth.jsx'
import { useGasto } from './useGasto.jsx'

export default function useHandlerGastos({gasto}) {
    const { user } = useAuth()
      const {updateGasto, deleteGasto, updatePagado} = useGasto() //gastoDeleted
    
      const [updateGastoOpen, setUpdateGastoOpne] = useState(false)
      const [selectedOptions, setSelectedOptions] = useState([user.id])

      const creadoPor = gasto.creadoPor.toString() === user.id.toString();
      const handlerNombre = creadoPor ? "Creado por ti" : `Creado por ${gasto.seDivide[0]?.userId?.nombre || 'otro usuario'}`;
      const handlerGasto = gasto.monto / gasto.seDivide.length;
      const handlerFecha = new Date(gasto.fechaCreacion).toLocaleString("es-AR", {
        dateStyle: "long",
        timeStyle: "short",
      })

      //estado que abre el formulario
      const handlerUpdate = () => {
        setUpdateGastoOpne((prev) => !prev)
      }

      //form data que viene por defecto
      const [formData, setFormData] = useState({
        titulo: gasto.titulo,
        descripcion: gasto.descripcion,
        monto: gasto.monto,
        categoria: gasto.categoria
      })
    
      const toggleUser = (userId) => {
        setSelectedOptions((prev) =>
          prev.includes(userId)
            ? prev.filter((id) => id !== userId)
            : [...prev, userId]
        )
      } //logica para "seDivide"
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      } //cambia el estado del formulario
    
      const handleSubmitUpdateGasto = async (e) => {
        e.preventDefault()
    
        const newGasto = {
          ...formData,
          monto: Number(formData.monto),
          seDivide: selectedOptions.map(id => ({ userId: id })),
        }

    
          await updateGasto(newGasto, gasto._id)
          setUpdateGastoOpne(false);
        
      }
    
      const handleDeleteGasto = async () => {
        const confirmDelete = window.confirm("¿Estás seguro que querés eliminar este gasto?"); //actualizar a popups mas modernas
        if (!confirmDelete) return;
        await deleteGasto(gasto._id)
      }
    
      const handlerPagado = async () =>{
        const confirmDelete = window.confirm("¿El gasto fue pagado correctamente?"); //actualizar a popups mas modernas
        if (!confirmDelete) return;
        await updatePagado(gasto._id)
      }
  return (
    {
        updateGastoOpen,
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
        selectedOptions
    }
  )
}
