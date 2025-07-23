import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function FormRegister() {
    const {register, registered} = useAuth()

    const userAuthRegister = async(e)=>{
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const fields = Object.fromEntries(formData)
        try {
            register(fields)
        } catch (error) {
            console.error(error)

        }
    }

  return (
    <>
    {registered && <div>Usuario registrado con exito!</div>}
    
   { !registered && <form onSubmit={userAuthRegister}>
        <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre"/>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
        </div>
        <div>
            <label htmlFor="pass">Password</label>
            <input type="password" name="pass" id="pass" />
            <p>La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.</p>
        </div>
        <button>Confirmar</button>

    </form>}
        {registered && <Link to="/login">Iniciar Sesion</Link>}
    </>
    
  )
}
