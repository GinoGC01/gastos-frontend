// src/utils/toast.js
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const showToast = ({
  text = 'Algo ocurrió...',
  duration = 3000,
  gravity = 'top',
  position = 'right',
  background = '#333',
  close = true,
  stopOnFocus = true,
  borderRadius = '8px', // nuevo
  customStyle = {},      // permitir estilos extra
} = {}) => {
  Toastify({
    text,
    duration,
    gravity,
    position,
    close,
    stopOnFocus,
    style: {
      background,
      borderRadius,
      ...customStyle, // permite extender o sobrescribir estilos
    },
  }).showToast();
};