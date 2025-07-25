import { Link } from 'react-router-dom';

export default function AuthLayout({ title,to, textTo, children }) {
  return (
    <section className="Login-section ">
      <header className="Login-header ">
        <img src="../images/logoShort.png" alt="Logo"  />
      </header>

      <div className="Login-container">
        <h1 className='animate__animated animate__fadeIn'>{title}</h1>

        {children}

        <div className="Login-links">
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
          <Link to={`/${to}`}>{textTo}</Link>
        </div>
      </div>
    </section>
  );
}
