import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserBalance } from "../../features/authSlice";
import { useSelector } from "react-redux";

function RockobitsSuccess() {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/stripe/checkout-session-subscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          }
        );
        const data = await response.json();

        setStatus(data.payment_status);
        if (data.payment_status === "paid") {

          // Realiza una petición al módulo de wallet para obtener el balance actualizado
          const walletResponse = await fetch(
            `http://localhost:5000/api/wallet/${user.wallet.id}/amount`, // Reemplaza con la ruta correcta
            {
              method: "GET",
            }
          );

          const walletData = await walletResponse.json();

          // Actualiza el balance en el store de Redux
          console.log()
          dispatch(updateUserBalance(walletData.data.decryptedAmount));
        }
      } catch (error) {
        console.error("Error en la petición al backend:", error);
        // Manejo de errores según sea necesario
      }
    };

    if (sessionId) {
      handleSuccess();
    }
  }, [sessionId, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-green-200 p-8 rounded-lg shadow-md">
        {status && (
          <div>
            <p className="text-2xl font-semibold mb-4">
              El pago se encuentra en estado:{" "}
              {status === "paid" ? "Exitoso" : "Fallido"}
            </p>
            <p className="text-gray-600">
              ¡Gracias por completar tu pago de Rockobits..
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RockobitsSuccess;
