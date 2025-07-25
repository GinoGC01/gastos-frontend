import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function FormLogin() {
    const {login, user, isAuthenticated, authMessage} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated) navigate('/home')
    },[isAuthenticated, navigate])

    const userAuth = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const fields = Object.fromEntries(formData)
        try{
            await login(fields)
        }catch(error){
            console.error(error)
        }   
    }



  return (
    <form onSubmit={userAuth} className="FormLogin animate__animated animate__headShake">
        <div className="FormLogin-input">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder="brucewane@batman.com"/>
        </div>
        <div className="FormLogin-input">
            <label htmlFor="name">Password</label>
            <input type="password" name='pass' id='pass' placeholder="password segura"/>
        </div>
        <button type="submit">Entrar</button>
        {authMessage != 'Sesion Iniciada con exito' && <span className="message-error_FormLogin">{authMessage}</span>}
    </form>
  )
}
