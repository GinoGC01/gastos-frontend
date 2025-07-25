import { useState } from 'react'
import { useAuth } from './useAuth.jsx'
import { useGasto } from './useGasto.jsx'
import useHref from './useHref.jsx'
import Swal from 'sweetalert2'

export default function useHandlerGastos({gasto}) {
    const { user } = useAuth()
      const {updateGasto, deleteGasto, updatePagado} = useGasto() //gastoDeleted
    
      const [updateGastoOpen, setUpdateGastoOpne] = useState(false)
      const [selectedOptions, setSelectedOptions] = useState([user.id])
      const [openHistorialAct, setOpenHistorialAct] = useState(false)

      const creadoPor = gasto.creadoPor.toString() === user.id.toString();
      const handlerNombre = creadoPor ? "Creado por ti" : `Creado por ${gasto.seDivide[0]?.userId?.nombre || 'otro usuario'}`;
      const handlerGasto = gasto.monto / gasto.seDivide.length;
      const handlerFecha = new Date(gasto.fechaCreacion).toLocaleString("es-AR", {
        dateStyle: "long",
        timeStyle: "short",
      })

      const {handleClick} = useHref()
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
      e.preventDefault();

      const confirm = await Swal.fire({
        title: "¿Actualizar gasto?",
        text: "Se guardarán los cambios realizados.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#690cc0ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar"
      });

      if (!confirm.isConfirmed) return;

      const newGasto = {
        ...formData,
        monto: Number(formData.monto),
        seDivide: selectedOptions.map(id => ({ userId: id })),
      };

      const actualizado = await updateGasto(newGasto, gasto._id);

      if (actualizado) {
        await Swal.fire({
          title: "Actualizado",
          text: "El gasto se actualizó correctamente.",
          icon: "success",
          confirmButtonColor: "#690cc0ff"
        });
        setUpdateGastoOpne(false);
      } else {
        await Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el gasto.",
          icon: "error",
          confirmButtonColor: "#690cc0ff"
        });
      }
    };
    
     const handleDeleteGasto = async () => {
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "Este gasto se eliminará permanentemente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#690cc0ff",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        const eliminado = await deleteGasto(gasto._id);

        if (eliminado) {
          await Swal.fire({
            title: "Eliminado",
            text: "El gasto fue eliminado correctamente.",
            icon: "success",
            confirmButtonColor: "#690cc0ff"
          });

          handleClick("/home");
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el gasto. Intentalo más tarde.",
            icon: "error",
            confirmButtonColor: "#690cc0ff"
          });
        }
      };
    
    const handlerPagado = async () => {
        const result = await Swal.fire({
          title: "¿Marcar como pagado?",
          text: "¿El gasto fue pagado correctamente?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#690cc0ff",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, marcar",
          cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;

        const actualizado = await updatePagado(gasto._id);

        if (actualizado) {
          await Swal.fire({
            title: "Actualizado",
            text: "El gasto fue marcado como pagado.",
            icon: "success",
            confirmButtonColor: "#690cc0ff"
          });
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el estado del gasto.",
            icon: "error",
            confirmButtonColor: "#690cc0ff"
          });
        }
      };

      const handleropenHistorialAct = ()=>{
        setOpenHistorialAct(!openHistorialAct)
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
        selectedOptions,
        handleropenHistorialAct,
        openHistorialAct
    }
  )
}
