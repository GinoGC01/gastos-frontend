import { createContext, useEffect, useState } from "react";
import { URL_BACK } from "../config";
import { useAuth } from "../hooks/useAuth";

const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [gasto, setGasto] = useState(null);
  const [createGastoStatus, setCreateGastoStatus] = useState(null)
  const [updateGastoMessage, setUpdateMessage] = useState("")
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
            ...gasto, creadoPor: user.user.id
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

  const deleteGasto = async () => {
    const confirmDelete = window.confirm("¿Estás seguro que querés eliminar este gasto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${URL_BACK}gastos/${gasto._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      await getGastos()
      // Aquí podrías actualizar la lista de gastos si es necesario
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
    }
  }

   const updateGasto = async (newGasto) => {
    if(!newGasto) return {message: "need a newGasto data"}
    try {
      const response = await fetch(`${URL_BACK}gastos/${gasto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newGasto),
      });

      const data = await response.json()
      if(data && data.status){
        setUpdateMessage(data.message) // update gasto en proceso. Terminar, falta deleteGasto, e incorporar en el componente.
      }
      await getGastos()
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
      updateGastoMessage }}>
      {children}
    </GastosContext.Provider>
  );
};

export default GastosContext;
