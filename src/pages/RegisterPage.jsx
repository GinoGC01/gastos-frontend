import FormRegister from '../components/Forms/FormRegister.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'

export default function RegisterPage() {
  return (<AuthLayout title="Registro" textTo={"Iniciar sesión"} to="login">
      <FormRegister/>  
    </AuthLayout>
  )
}
