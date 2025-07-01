import { createContext, useEffect, useState } from "react";
import { URL_BACK } from "../config";
import { useAuth } from "../hooks/useAuth";

const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [gasto, setGasto] = useState(null);
  const [createGastoStatus, setCreateGastoStatus] = useState(null)
  const [gastoDeleted, setGastoDeleted] = useState(null)
  const [pagado, setPagado] = useState(false)
  const [categoriasDisponibles] = useState([
  { label: "Alimentos", value: "alimentos" },
  { label: "Transporte", value: "transporte" },
  { label: "Salud", value: "salud" },
  { label: "Educación", value: "educacion" },
  { label: "Entretenimiento", value: "entretenimiento" },
  { label: "Hogar", value: "hogar"},
  { label: "Servicios", value: "servicios" },
  { label: "Impuestos", value: "impuestos" },
  { label: "Ropa", value: "ropa" },
  { label: "Mascotas", value: "mascotas" },
  { label: "Tecnología", value: "tecnologia" },
  { label: "Viajes", value: "viajes" },
  { label: "Ahorro", value: "ahorro" },
  { label: "Inversión", value: "inversion" },
  { label: "Deudas", value: "deudas" },
  { label: "Donaciones", value: "donaciones" },
  { label: "Cuidado personal", value: "cuidadoPersonal" },
  { label: "Regalos", value: "regalos" },
  { label: "Internet", value: "internet" },
  { label: "Telefono", value: "telefono" },
  { label: "Otros", value: "otros" }
  ])
  const {user, isAuthenticated} = useAuth()

  const getGastos = async () => {
    try {
      const response = await fetch(URL_BACK + "gastos", {
       credentials : "include"
      });
      const data = await response.json();
      if (data && data.status) {
        setGasto(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createGasto = async (gasto) => {
    if(!gasto) return {message: "need a gasto data"}
    try {
        const fullBody = {
            ...gasto, creadoPor: user.id
        }
        const response = await fetch(URL_BACK + 'gastos',{
            method: 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(fullBody)
        })
        const data = await response.json()
        if(data && data.status){
            setCreateGastoStatus(true)
        }
        await getGastos()
        return data
    } catch (error) {
        console.error(error)
    }
  }

  const deleteGasto = async (gastoId) => {
  const confirmDelete = window.confirm("¿Estás seguro que querés eliminar este gasto?")
  if (!confirmDelete) return
  try {
    const response = await fetch(`${URL_BACK}gastos/${gastoId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error("Error al eliminar gasto:", data.message || "Respuesta no válida")
      setGastoDeleted(data)
      return;
    }

    setGastoDeleted(data) 
    await getGastos()    // Refrescar la lista actualizada

  } catch (error) {
    console.error("Error al eliminar gasto:", error)
  }
  }

    //devuelve booleano
  const updateGasto = async (newGasto, gastoId) => {
    if(!newGasto) return {message: "need a newGasto data"}

    
    try {
      const response = await fetch(`${URL_BACK}gastos/${gastoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newGasto),
      });

      const data = await response.json()
      if(data && data.status){
        await getGastos()
        return true
      }
      console.error("Error al actualizar gasto:", data);
      return false
    } catch (error) {
      console.error("Error al actualizar gasto:", error);
    }
  }

  const updatePagado = async (gastoId) => {
    try {
      const response = await fetch(`${URL_BACK}gasto/${gastoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json()
      if(data && data.status){
        await getGastos()
        setPagado(true)
      }
      return false
    } catch (error) {
      console.error("Error al actualizar gasto:", error);
    }
  }

  const handleCreateGastoStatus = () => {
    setCreateGastoStatus(!createGastoStatus)
  }

  useEffect(() => {
    if(isAuthenticated){
      getGastos();
    }
  }, [isAuthenticated]);

  return (
    <GastosContext.Provider value={{ 
      gasto, 
      getGastos, 
      createGastoStatus, 
      createGasto, 
      handleCreateGastoStatus, 
      deleteGasto,
      gastoDeleted, 
      updateGasto,
      updatePagado,
      pagado,
      categoriasDisponibles}}>
      {children}
    </GastosContext.Provider>
  );
};

export default GastosContext;
