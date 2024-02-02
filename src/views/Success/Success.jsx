import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function Success() {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [status, setStatus] = useState(null);
  const { updateUser, user } = useUser();
  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const response = await fetch(
          "https://rockola-backend.onrender.com/api/stripe/checkout-session-subscription",
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
          updateUser({
            ...user,
            membership: {
              name: data.metadata.membership_name,
              type: parseInt(data.metadata.membership_type),
              expiration: data.metadata.membership_expiration,
            },
          });
        }
      } catch (error) {
        console.error("Error en la petición al backend:", error);
        // Manejo de errores según sea necesario
      }
    };

    if (sessionId) {
      handleSuccess();
    }
  }, [sessionId]);
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
              ¡Gracias por completar tu pago! Si tienes alguna pregunta, no
              dudes en contactarnos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Success;
