import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

const stripePromise = loadStripe(
  "pk_test_51M4ShsFeiEj6y242YNiI1u9Kf1HZM4eHjMZYMeHYrTCHwRfSIA3JwC5znJfpmk0EZWlLbsvQ9wXQZbLAdJZsdhUD00dehK0IeW"
);

function Screens() {
  const [screenName, setScreenName] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userScreens, setUserScreens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Decodificar el token
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);

          // Obtener las pantallas asociadas al usuario
          const response = await api.get(`/screen/company/${decodedToken.id}`);
          setUserScreens(response.data.data);
        } else {
          console.error("El token no está presente en el LocalStorage");
        }
      } catch (error) {
        console.error("Error al obtener las membresías:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (openCheckout && sessionId) {
      redirectToCheckout(sessionId);
    }
  }, [openCheckout, sessionId]);

  const handleCreateScreen = async () => {
    try {
      // Llama al backend para obtener el sessionId
      const response = await api.post("stripe/create-checkout-session-screen", {
        screenName,
        userId,
        screenNameTwo: "Screen xD",
      });

      // Extrae el sessionId de la respuesta
      const sessionId = response.data.sessionId;

      // Almacena el sessionId en el estado para su posterior uso
      setSessionId(sessionId);

      // Abre el flujo de pago de Stripe
      setOpenCheckout(true);

      // Limpiar cualquier error previo
      setError(null);
    } catch (error) {
      console.error("Error al obtener el sessionId:", error);

      // Verifica si el error es debido a que se excedió el límite de pantallas
      if (
        error.response &&
        error.response.data &&
        error.response.data.statusCode === 400 &&
        error.response.data.message === "SCREEN_LIMIT_EXCEEDED"
      ) {
        // Maneja el caso específico de límite de pantallas excedido
        console.error("¡Límite de pantallas excedido!");

        // Actualiza el estado de error para mostrar el mensaje en la interfaz
        setError(
          "Límite de pantallas excedido. No puedes comprar mas pantallas."
        );
      } else {
        // Maneja otros errores según tus necesidades
        // Puedes mostrar un mensaje de error genérico o realizar otras acciones

        // Actualiza el estado de error para mostrar el mensaje en la interfaz
        setError("Error al crear la pantalla. Inténtalo de nuevo más tarde.");
      }
    }
  };

  const redirectToCheckout = async (sessionId) => {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      // Maneja cualquier error que pueda ocurrir al redirigir
      if (error) {
        console.error("Error al redirigir a Checkout:", error);
        // Maneja el error según tus necesidades (puede mostrar un mensaje al usuario)

        // Actualiza el estado de error para mostrar el mensaje en la interfaz
        setError("Error al iniciar el pago. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error al redirigir a Checkout:", error);
      // Maneja el error según tus necesidades (puede mostrar un mensaje al usuario)

      // Actualiza el estado de error para mostrar el mensaje en la interfaz
      setError("Error al iniciar el pago. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tus Pantallas:</h2>
        <ul className="grid grid-cols-2 gap-4">
          {userScreens.map((screen) => (
            <li key={screen.id} className="mb-2 p-4 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  id:{screen.id} - {screen.name}
                </p>
                <span className="text-gray-500">{screen.resolution}</span>
              </div>
              <p className="mt-2">{screen.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-10">Crear Pantalla</h2>
      <form className="flex flex-col items-center mt-4">
        <input
          type="text"
          placeholder="Nombre de la pantalla"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
          className="border p-2 mb-2"
        />
        <button
          type="button"
          onClick={handleCreateScreen}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear pantalla
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <Elements stripe={stripePromise}>
        {/* Renderiza tu componente CheckoutModal aquí si lo necesitas */}
      </Elements>
    </div>
  );
}

export default Screens;
