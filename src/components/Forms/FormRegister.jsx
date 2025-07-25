import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import 'animate.css';

export default function FormRegister() {
  const { register, registered } = useAuth();
  const passRef = useRef();
  const pass2Ref = useRef();
  const [error, setError] = useState("");

  const validarPassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pass);
  };

  const userAuthRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);

    const pass = passRef.current.value;
    const pass2 = pass2Ref.current.value;

    // Validaciones
    if (pass !== pass2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!validarPassword(pass)) {
      setError(
        "La contraseña no cumple con los requisitos de seguridad."
      );
      return;
    }

    try {
      setError("");
      await register(fields);
    } catch (error) {
      console.error(error);
      setError("Error al registrar usuario.");
    }
  };

  return (
    <>
      {registered && <div>Usuario registrado con éxito!</div>}

      {!registered && (
        <form onSubmit={userAuthRegister} className="FormLogin animate__animated animate__headShake">
          <div className="FormLogin-input"> 
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre" required />
          </div>
          <div className="FormLogin-input" >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="FormLogin-input" >
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              id="pass"
              ref={passRef}
              required
            />
          </div>
          <div className="FormLogin-input">
            <label htmlFor="pass2">Repite el password</label>
            <input
              type="password"
              name="pass2"
              id="pass2"
              ref={pass2Ref}
              required
            />
          </div> 
          <p>
            La contraseña debe tener al menos 8 caracteres, una mayúscula, una
            minúscula, un número y un símbolo.
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button>Confirmar</button>
        </form>
      )}

      {registered && <Link to="/login">Iniciar sesión</Link>}
    </>
  );
}
