/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const CheckoutModal = ({ open, onClose, onConfirm, sessionId, membership }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="flex flex-col justify-center items-center">
        {membership && sessionId && (
          <p className="font-bold">{membership && membership.name}</p>
        )}
        {!sessionId && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-red-500"> Ya tienes una membresia activa.</p>
            <p className="text-red-500 ">
              {" "}
              Desactiva la membresia activa para adquirir una nueva.
            </p>
            <p className="text-red-500 text-xs ">
              {" "}
              (Si desactivas la membresia actual perderas los beneficios y el
              tiempo que quede disponible)
            </p>
          </div>
        )}
      </DialogTitle>
      <DialogContent>
        {membership && sessionId && (
          <>
            <p className="font-bold text-4xl flex mb-4 justify-center">
              {" "}
              {membership.amount}$
            </p>

            <DialogContentText>
              Selecciona "Ir al Checkout" para ir a la página de pago.
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {sessionId && (
          <Button
            onClick={() => {
              onConfirm(sessionId);
            }}
          >
            Ir al Checkout
          </Button>
        )}
        {!sessionId && <Button onClick={onClose}>Aceptar</Button>}

        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
