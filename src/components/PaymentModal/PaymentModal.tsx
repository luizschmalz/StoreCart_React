import React, { useEffect } from "react";
import type { PaymentType } from "../../types/PaymentType.type"
import "./PaymentModal.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { toast } from "sonner";

const PaymentModal: React.FC<PaymentType> = ({ visible, onClose, total }) => {

    const navigate = useNavigate();
    const { clearCart } = useCart();

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onClose(), 60000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div className="modal-wrapper" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
          ×
        </button>
        <h2 className="modal-title">Pagamento via PIX</h2>
        <div className="modal-pixbox">
          <p>Email: luizeduardo2014schmalz@gmail.com</p>
          <p>Valor: {total}</p>
        </div>
        <p className="modal-info">
          Copie o código PIX e finalize o pagamento em seu app bancário.
        </p>
        <div className="flex justify-center">
            <button 
            className="button-payment bg-gray-800 hover:bg-gray-400 text-white rounded-xl font-semibold transition w-full sm:w-auto cursor-pointer"
            onClick={() => {
                        onClose();         
                        clearCart();        
                        navigate("/"); 
                        toast.success(`Pagamento realizado, carrinho limpo! 🗑️`, {
                        duration: 3000,
                  });     
                    }}>
                Já paguei, voltar para o início
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
