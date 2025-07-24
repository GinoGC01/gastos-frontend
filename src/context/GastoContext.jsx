import { createContext, useEffect, useState } from "react";
import { URL_BACK } from "../config.js";
import { useAuth } from "../hooks/useAuth.jsx";

const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [onSession, setOnSession] = useState(false);
  const [gastos, setGasto] = useState(null);
  const [createGastoStatus, setCreateGastoStatus] = useState(false)
  const [gastoDeleted, setGastoDeleted] = useState(null)
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
  const [gastosFiltered, setGastosFiltrados] = useState([])

  const getGastos = async () => {
    try {
      const response = await fetch(URL_BACK + "gastos", {
       credentials : "include"
      });
      const data = await response.json();
      if (data && data.status) {
        setGasto(data.gastos.reverse());
      }
    } catch (error) {
      console.log('data error context')
      console.error(error);
    }
  };

  //boolean
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
            setCreateGastoStatus(false)
           
        }
        await getGastos()
        return true
    } catch (error) {
        console.error(error)
    }
  }

  //devuelve booleano
  const deleteGasto = async (gastoId) => {
  try {
    const response = await fetch(`${URL_BACK}gastos/${gastoId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error("Error al eliminar gasto:", data.message || "Respuesta no válida")
      setGastoDeleted(data)
      return false
    }
    setGastoDeleted(data) 
    await getGastos()    // Refrescar la lista actualizada
    return true //para la navegacion
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
      return true
    } catch (error) {
      console.error("Error al actualizar gasto:", error);
      if(error.message === "Inicie Sesion para continuar"){
        setOnSession(false)
      }
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
        console.log('data pagado', data)
        return true
      }
      return false
    } catch (error) {
      console.error("Error al actualizar gasto:", error);
    }
  }

  const handleCreateGastoStatus = () => {
    setCreateGastoStatus(!createGastoStatus)
  }

  const handleGastosFiltered = ({ titulo = '', categoria = '' }) => {
  const gastosFiltrados = gastos.filter(gasto => {
    const tituloMatch = !titulo || gasto.titulo.toLowerCase().includes(titulo.toLowerCase());
    const categoriaMatch = !categoria || gasto.categoria.toLowerCase().includes(categoria.toLowerCase());
    return tituloMatch || categoriaMatch;
  });

  // console.log(gastosFiltrados, titulo, categoria)

  setGastosFiltrados(gastosFiltrados);
  };

  useEffect(() => {
    if(isAuthenticated){
      getGastos();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(user){
      setOnSession(true)
    }}, [user])

  return (
    <GastosContext.Provider value={{ 
      gastos, 
      getGastos, 
      createGastoStatus, 
      createGasto, 
      handleCreateGastoStatus, 
      deleteGasto,
      gastoDeleted, 
      updateGasto,
      updatePagado,
      categoriasDisponibles,
      gastosFiltered,
      handleGastosFiltered,
      onSession}}>
      {children}
    </GastosContext.Provider>
  );
};

export default GastosContext;
