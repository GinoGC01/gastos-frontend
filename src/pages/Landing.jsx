import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Gasto } from '../components/Icons/Gasto';
import { Personas } from '../components/Icons/Personas';
import { Pagado } from '../components/Icons/Pagado';
import '../Landing.css';

export function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Gasto />,
      title: 'Gestión Inteligente',
      description: 'Organiza tus gastos por categorías con un sistema intuitivo y fácil de usar.'
    },
    {
      icon: <Personas />,
      title: 'División Automática',
      description: 'Divide gastos entre múltiples usuarios de forma automática y precisa.'
    },
    {
      icon: <Pagado />,
      title: 'Control de Pagos',
      description: 'Marca gastos como pagados y mantén un historial completo de transacciones.'
    }
  ];

  const categories = [
    'Alimentos', 'Transporte', 'Salud', 'Educación',
    'Entretenimiento', 'Hogar', 'Servicios', 'Tecnología'
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Compartiendo depto',
      comment: 'Gastapp nos ayudó a organizar los gastos del departamento de manera súper simple.',
      avatar: 'M'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Grupo de amigos',
      comment: 'Ya no hay más confusión sobre quién debe qué. Todo está claro y organizado.',
      avatar: 'C'
    },
    {
      name: 'Ana Martínez',
      role: 'Familia',
      comment: 'Perfecto para llevar las cuentas familiares. Interface limpia y fácil de entender.',
      avatar: 'A'
    }
  ];

  return (
    <div className="landing">
      {/* Header/Navbar */}
      <header className={`landing__header ${isScrolled ? 'landing__header--scrolled' : ''}`}>
        <div className="landing__container">
          <div className="landing__header-content">
            <div className="landing__logo">
              <img src="../images/logoShort.png" alt="Gastapp Logo" className="landing__logo-image" />
              <span className="landing__logo-text">Gastapp</span>
            </div>

            <nav className="landing__nav">
              <a href="#features" className="landing__nav-link">Características</a>
              <a href="#how-it-works" className="landing__nav-link">Cómo funciona</a>
              <a href="#testimonials" className="landing__nav-link">Testimonios</a>
            </nav>

            <div className="landing__header-actions">
              <Link to="/login" className="landing__button landing__button--secondary">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="landing__button landing__button--primary">
                Comenzar Gratis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing__hero">
        <div className="landing__hero-background"></div>
        <div className="landing__container">
          <div className="landing__hero-content">
            <div className="landing__hero-text">
              <h1 className="landing__hero-title">
                Gestiona tus gastos
                <span className="landing__hero-title-highlight"> compartidos</span>
                <br />sin complicaciones
              </h1>
              <p className="landing__hero-description">
                La forma más simple de dividir gastos entre amigos, familia o compañeros. 
                Todo en un solo lugar, transparente y fácil de usar.
              </p>
              <div className="landing__hero-actions">
                <Link to="/register" className="landing__button landing__button--primary landing__button--large">
                  Crear cuenta gratis
                </Link>
                <Link to="/login" className="landing__button landing__button--outline landing__button--large">
                  Ver demo
                </Link>
              </div>
              <div className="landing__hero-stats">
                <div className="landing__hero-stat">
                  <span className="landing__hero-stat-number">+1000</span>
                  <span className="landing__hero-stat-label">Usuarios activos</span>
                </div>
                <div className="landing__hero-stat">
                  <span className="landing__hero-stat-number">+5000</span>
                  <span className="landing__hero-stat-label">Gastos gestionados</span>
                </div>
                <div className="landing__hero-stat">
                  <span className="landing__hero-stat-number">21</span>
                  <span className="landing__hero-stat-label">Categorías</span>
                </div>
              </div>
            </div>

            <div className="landing__hero-visual">
              <div className="landing__hero-card landing__hero-card--1">
                <div className="landing__hero-card-header">
                  <Gasto />
                  <span>Nuevo Gasto</span>
                </div>
                <div className="landing__hero-card-body">
                  <h3>Cena Restaurante</h3>
                  <p className="landing__hero-card-amount">$12,500</p>
                  <div className="landing__hero-card-users">
                    <span className="landing__hero-card-avatar">M</span>
                    <span className="landing__hero-card-avatar">J</span>
                    <span className="landing__hero-card-avatar">C</span>
                    <span className="landing__hero-card-more">+2</span>
                  </div>
                </div>
              </div>

              <div className="landing__hero-card landing__hero-card--2">
                <div className="landing__hero-card-success">
                  <Pagado />
                  <span>Gasto Pagado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="landing__features">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2 className="landing__section-title">
              Todo lo que necesitas para gestionar gastos compartidos
            </h2>
            <p className="landing__section-description">
              Herramientas poderosas diseñadas para hacer tu vida más fácil
            </p>
          </div>

          <div className="landing__features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`landing__feature-card ${activeFeature === index ? 'landing__feature-card--active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="landing__feature-icon">{feature.icon}</div>
                <h3 className="landing__feature-title">{feature.title}</h3>
                <p className="landing__feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="landing__features-categories">
            <h3 className="landing__features-categories-title">21 Categorías para organizar tus gastos</h3>
            <div className="landing__features-categories-list">
              {categories.map((category, index) => (
                <span key={index} className="landing__category-tag">
                  {category}
                </span>
              ))}
              <span className="landing__category-tag landing__category-tag--more">Y más...</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="landing__how-it-works">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2 className="landing__section-title">Cómo funciona</h2>
            <p className="landing__section-description">
              Comienza en solo 3 simples pasos
            </p>
          </div>

          <div className="landing__steps">
            <div className="landing__step">
              <div className="landing__step-number">1</div>
              <div className="landing__step-content">
                <h3 className="landing__step-title">Crea tu cuenta</h3>
                <p className="landing__step-description">
                  Regístrate en segundos con tu email. Es completamente gratis y sin compromisos.
                </p>
              </div>
            </div>

            <div className="landing__step-connector"></div>

            <div className="landing__step">
              <div className="landing__step-number">2</div>
              <div className="landing__step-content">
                <h3 className="landing__step-title">Agrega tus gastos</h3>
                <p className="landing__step-description">
                  Crea gastos, elige categorías y selecciona con quién compartirlos.
                </p>
              </div>
            </div>

            <div className="landing__step-connector"></div>

            <div className="landing__step">
              <div className="landing__step-number">3</div>
              <div className="landing__step-content">
                <h3 className="landing__step-title">Divide y controla</h3>
                <p className="landing__step-description">
                  El sistema divide automáticamente y mantiene registro de todo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="landing__testimonials">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2 className="landing__section-title">Lo que dicen nuestros usuarios</h2>
            <p className="landing__section-description">
              Miles de personas ya confían en Gastapp
            </p>
          </div>

          <div className="landing__testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="landing__testimonial-card">
                <div className="landing__testimonial-avatar">
                  {testimonial.avatar}
                </div>
                <p className="landing__testimonial-comment">"{testimonial.comment}"</p>
                <div className="landing__testimonial-author">
                  <h4 className="landing__testimonial-name">{testimonial.name}</h4>
                  <p className="landing__testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing__cta">
        <div className="landing__container">
          <div className="landing__cta-content">
            <h2 className="landing__cta-title">
              ¿Listo para simplificar tus gastos compartidos?
            </h2>
            <p className="landing__cta-description">
              Únete a miles de usuarios que ya están organizando sus finanzas de forma inteligente
            </p>
            <div className="landing__cta-actions">
              <Link to="/register" className="landing__button landing__button--primary landing__button--large">
                Comenzar ahora
              </Link>
              <p className="landing__cta-note">No se requiere tarjeta de crédito</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="landing__container">
          <div className="landing__footer-content">
            <div className="landing__footer-brand">
              <div className="landing__logo">
                <img src="../images/logoShort.png" alt="Gastapp Logo" className="landing__logo-image" />
                <span className="landing__logo-text">Gastapp</span>
              </div>
              <p className="landing__footer-tagline">
                Gestión inteligente de gastos compartidos
              </p>
            </div>

            <div className="landing__footer-links">
              <div className="landing__footer-column">
                <h4 className="landing__footer-column-title">Producto</h4>
                <a href="#features" className="landing__footer-link">Características</a>
                <a href="#how-it-works" className="landing__footer-link">Cómo funciona</a>
                <a href="#testimonials" className="landing__footer-link">Testimonios</a>
              </div>

              <div className="landing__footer-column">
                <h4 className="landing__footer-column-title">Empresa</h4>
                <a href="#" className="landing__footer-link">Sobre nosotros</a>
                <a href="#" className="landing__footer-link">Blog</a>
                <a href="#" className="landing__footer-link">Contacto</a>
              </div>

              <div className="landing__footer-column">
                <h4 className="landing__footer-column-title">Legal</h4>
                <a href="#" className="landing__footer-link">Privacidad</a>
                <a href="#" className="landing__footer-link">Términos</a>
                <a href="#" className="landing__footer-link">Cookies</a>
              </div>
            </div>
          </div>

          <div className="landing__footer-bottom">
            <p className="landing__footer-copyright">
              © 2024 Gastapp. Todos los derechos reservados.
            </p>
            <div className="landing__footer-social">
              <a href="#" className="landing__footer-social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="landing__footer-social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="landing__footer-social-link" aria-label="GitHub">GH</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}