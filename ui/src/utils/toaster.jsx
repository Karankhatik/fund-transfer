
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const defaultPosition = "top-right"; // Default position if not specified

function successToast({ message, position = defaultPosition, autoClose }) {
  toast.success(message, {
    position,
    autoClose
  });
}

function warningToast({ message, position = defaultPosition, autoClose }) {
  toast.warn(message, {
    position,
    autoClose
  });
}

function infoToast({ message, position = defaultPosition, autoClose = 300 }) {
  toast.info(message, {
    position,
    autoClose
  });
}

function errorToast({ message, position = defaultPosition, autoClose }) {
  toast.error(message, {
    position,
    autoClose
  });
}

function loaderOverlay() {
  return {
    overlay: (base) => ({
      ...base,
      background: 'transparent'
    }),
    spinner: (base) => ({
      ...base,
      width: '100px',
      '& svg circle': {
        stroke: 'rgba(33, 29, 29, 0.5)'
      }
    })
  };
}

const Toast = {
  successToast,
  warningToast,
  infoToast,
  errorToast,
  loaderOverlay
};

export default Toast;
