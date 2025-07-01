import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from "react-router-dom";

export default function FormLogin() {
    const {login, user, isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated) navigate('/profile')
    },[isAuthenticated, navigate])

    const userAuth = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const fields = Object.fromEntries(formData)
        try{
            login(fields)
        }catch(error){
            console.error(error)
        }   
    }
  return (
    <form onSubmit={userAuth}>
        <div>
            <label htmlFor="email">Email usuario</label>
            <input type="email" name='email' id='email' />
        </div>
        <div>
            <label htmlFor="name">Password</label>
            <input type="password" name='pass' id='pass' />
        </div>
        <button>Entrar</button>
        {user && !user.status && <span>{user.message}</span>}
        <div>
            <Link to="/register">Aun no tengo cuenta</Link>
            <Link to="/">Recuperar passwoord</Link>

        </div>

    </form>
  )
}
