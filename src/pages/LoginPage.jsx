import FormLogin from '../components/Forms/FormLogin.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'


export default function LoginPage() {


  return (
    <AuthLayout title="Iniciar Sesión" to="register" textTo="Registrarme" >
      <FormLogin />
    </AuthLayout>
  )
}
