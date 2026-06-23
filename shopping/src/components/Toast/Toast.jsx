import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import "../Css/Toast.css";

function Toast() {
  const { toast, hideToast } = useContext(CartContext);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, hideToast]);

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return 'bi-check-circle-fill';
      case 'error': return 'bi-exclamation-triangle-fill';
      case 'info':
      default: return 'bi-info-circle-fill';
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast-item toast-${toast.type}`}>
        <i className={`bi ${getIcon()}`}></i>
        <p className="toast-message">{toast.message}</p>
        <button onClick={hideToast} className="toast-close">
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
}

export default Toast;
