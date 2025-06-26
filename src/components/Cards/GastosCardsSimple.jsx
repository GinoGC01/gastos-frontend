import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { URL_BACK } from "../../config";

export function GastosCardsSimple({ gasto }) {
  const [updateGasto, setUpdateGasto] = useState(false)
  const { user, users } = useAuth()
  const [selectedOptions, setSelectedOptions] = useState([user.user.id])

  const toggleUser = (userId) => {
    setSelectedOptions((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  const handlerUpdate = () => {
    setUpdateGasto((prev) => !prev)
  }

  const creadoPor = gasto.creadoPor.toString() === user.user.id.toString();
  const handlerNombre = creadoPor ? "Creado por ti" : `Creado por ${gasto.seDivide[0]?.userId?.nombre || 'otro usuario'}`;
  const handlerGasto = gasto.monto / gasto.seDivide.length;
  const handlerFecha = new Date(gasto.fechaCreacion).toLocaleString("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  })

  const [formData, setFormData] = useState({
    titulo: gasto.titulo,
    descripcion: gasto.descripcion,
    monto: gasto.monto,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitUpdateGasto = async (e) => {
    e.preventDefault()

    const updatedGasto = {
      ...formData,
      monto: Number(formData.monto),
      seDivide: selectedOptions.map(id => ({ userId: id })),
    }

    try {
      const response = await fetch(`${URL_BACK}gastos/${gasto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedGasto),
      });

      const data = await response.json()
      console.log(data)
      setUpdateGasto(false);
    } catch (error) {
      console.error("Error al actualizar gasto:", error);
    }
  }

  const handleDeleteGasto = async () => {
    const confirmDelete = window.confirm("¿Estás seguro que querés eliminar este gasto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${URL_BACK}gastos/${gasto._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      // Aquí podrías actualizar la lista de gastos si es necesario
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
    }
  }

  return updateGasto ? (
    <>
      <form onSubmit={handleSubmitUpdateGasto}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            required
            value={formData.titulo}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="monto">Monto</label>
          <input
            type="number"
            name="monto"
            id="monto"
            required
            value={formData.monto}
            onChange={handleInputChange}
          />
        </div>

        {users.length > 1 && (
          <div>
            <label>Se divide entre:</label>
            <div>
              {users.map((usuario) => (
                usuario._id !== user.user.id && (
                  <label key={usuario._id} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={usuario._id}
                      checked={selectedOptions.includes(usuario._id)}
                      onChange={() => toggleUser(usuario._id)}
                    />
                    {usuario.nombre}
                  </label>
                )
              ))}
            </div>
          </div>
        )}
        <button type="submit">Confirmar</button>
      </form>

      <div>
        <button onClick={handlerUpdate}>Volver</button>
        <button onClick={handleDeleteGasto}>Eliminar gasto</button>
      </div>
    </>
  ) : (
    <li>
      <h4>{gasto.titulo}</h4>
      <div>
        <span>{handlerNombre}</span>
        <h4>{handlerFecha}</h4>
      </div>
      <p>{gasto.descripcion}</p>
      <h4>Total: {gasto.monto}</h4>
      <div>
        {gasto.seDivide.length > 1 ? (
          <>
            <span>Se divide entre:</span>
            <ul>
              {gasto.seDivide.map((user) => (
                <li key={user.userId._id}>{user.userId.nombre}</li>
              ))}
            </ul>
          </>
        ) : (
          <span>Gasto unitario</span>
        )}
      </div>
      {gasto.seDivide.length > 1 && <h4>{handlerGasto} C/U</h4>}
      <div>
        <button onClick={handlerUpdate}>Modificar gasto</button>
        <button onClick={handleDeleteGasto}>Eliminar gasto</button>
      </div>
    </li>
  );
}
