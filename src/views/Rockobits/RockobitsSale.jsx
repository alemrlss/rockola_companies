import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/api";
import { updateUserBalance } from "../../features/authSlice";

function RockobitsSale() {
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankTransferFile, setBankTransferFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleEmailChange = (event) => {
    setError("");
    setEmail(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setError("");
    setQuantity(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setError("");
    setPaymentMethod(event.target.value);
  };

  const handleBankTransferFileChange = (event) => {
    setError("");
    setBankTransferFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (quantity <= 0) {
      setError("La cantidad debe ser mayor a 0");
      return;
    }

    if (!paymentMethod) {
      setError("Debes seleccionar un método de pago");
      return;
    }

    if (paymentMethod === "bankTransfer" && !bankTransferFile) {
      setError("Debes subir el archivo de transferencia bancaria");
      return;
    }

    if (!user.id) {
      setError("No se pudo obtener el company_id del usuario");
      return;
    }
    // Realizar la petición al backend para obtener los datos del cliente
    try {
      const response = await api.get(`user/email/${email}`);

      // Verificar si la respuesta es correcta
      if (response.status === 200) {
        setUserData(response.data.data); // Almacenar los datos del cliente en el estado
        setIsModalOpen(true); // Abrir el modal
      } else {
        console.error("Error al obtener los datos del cliente:", response.data);
      }
    } catch (error) {
      console.error("Error al realizar la petición al backend:", error);

      if (error.response.status === 404) {
        setError("El cliente no existe");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // Limpiar los datos del formulario después de cerrar el modal
    setEmail("");
    setQuantity(0);
    setPaymentMethod("");
    setBankTransferFile(null);
  };

  const transferRockobits = async () => {
    try {
      // Construir el objeto de datos para la transferencia
      const transferData = {
        client_id: userData.id,
        company_id: user.id /* Aquí debes obtener el company_id del token */,
        amount: parseInt(quantity),
        type: user.type
      };

      // Realizar la petición POST para transferir los Rockobits
      const response = await api.post(
        "rockobits/transferToClient",
        transferData
      );

      // Verificar si la transferencia fue exitosa
      if (response.status === 201) {
        console.log("Transferencia exitosa:", response.data);
        setIsModalOpen(false); // Cerrar el modal
        setEmail("");
        setQuantity(0);
        setPaymentMethod("");
        setBankTransferFile(null);

        const newBalance = user.balance - parseInt(quantity);

        dispatch(updateUserBalance(newBalance)); // Actualizar el balance en el store de Redux
      } else {
        console.error("Error en la transferencia:", response.data);
      }
    } catch (error) {
      console.error("Error al transferir Rockobits:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Vender Rockobits</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo del Cliente:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad de Rockobits:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Método de Pago:
          </span>
          <div className="mt-1">
            <div className="flex items-center">
              <input
                type="radio"
                id="cash"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                required
              />
              <label
                htmlFor="cash"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Efectivo
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="bankTransfer"
                value="bankTransfer"
                checked={paymentMethod === "bankTransfer"}
                onChange={handlePaymentMethodChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                required
              />
              <label
                htmlFor="bankTransfer"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Transferencia Bancaria
              </label>
            </div>
          </div>
        </div>
        {paymentMethod === "bankTransfer" && (
          <div className="mb-4">
            <label
              htmlFor="bankTransferFile"
              className="block text-sm font-medium text-gray-700"
            >
              Subir Archivo de Transferencia Bancaria:
            </label>
            <input
              type="file"
              id="bankTransferFile"
              accept=".pdf,.doc,.docx"
              onChange={handleBankTransferFileChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Siguiente
        </button>{" "}
      </form>
      <div>{error && <p className="text-red-500 mt-4">{error}</p>}</div>

      {/* Modal con los datos del cliente */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Datos del Cliente</DialogTitle>
        <DialogContent>
          {userData && (
            <>
              <p>
                <strong>Nombre:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Monto de la Transacción:</strong> {quantity}
              </p>
              {/* Agregar más información del cliente aquí si es necesario */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={transferRockobits}
            variant="contained"
            color="primary"
          >
            Vender
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RockobitsSale;
