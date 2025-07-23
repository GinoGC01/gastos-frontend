import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { GastosProvider } from './context/GastoContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Profile from './pages/Profile.jsx'
import Protected from './api/Protected.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { Gasto } from './pages/Gasto.jsx'
import { Home } from './pages/Home.jsx'

function App() {
if (!document.startViewTransition) {
  console.warn("Tu navegador no soporta View Transitions");
}
  return (
    <AuthProvider>
      <GastosProvider>
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
          <Routes>
            <Route path='/' element={<h1>Bienvenido</h1>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route element={<Protected/>}>
              <Route path='/nuevo-gasto' element={<h1>Nuevo gasto</h1>}/>
              <Route path='/gasto/:id' element={<Gasto/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/home' element={<Home/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </GastosProvider>
    </AuthProvider>
   
  )
}

export default App
