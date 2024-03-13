import { useState, useEffect } from "react";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Importa el icono de la billetera

function Rockobits() {
  const [packages, setPackages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null); // Nuevo estado para el saldo de la billetera

  console.log(userId);
  useEffect(() => {
    // Cargar la lista de paquetes al montar el componente
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Decodificar el token
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);


          const walletResponse = await api.get(`/wallet/${decodedToken.id}`);
          setWalletBalance(walletResponse.data.data.amount);
        }
        const response = await api.get("package-rockobits");
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleBuyClick = async (packageId) => {
    try {
      // Crear una sesión de checkout para el paquete seleccionado
      const response = await api.post(
        "/stripe/create-checkout-session-package",
        {
          packageId,
          userId,
        }
      );

      // Obtener el sessionId de la respuesta
      const { sessionId } = response.data;

      // Redirigir al usuario al checkout de Stripe
      redirectToCheckout(sessionId);
    } catch (error) {
      console.error("Error al iniciar el proceso de compra:", error);
    }
  };

  const redirectToCheckout = async (sessionId) => {
    try {
      // Redirigir al usuario al checkout de Stripe
      const stripe = await Stripe(
        "pk_test_51M4ShsFeiEj6y242YNiI1u9Kf1HZM4eHjMZYMeHYrTCHwRfSIA3JwC5znJfpmk0EZWlLbsvQ9wXQZbLAdJZsdhUD00dehK0IeW"
      );
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error("Error al redirigir a Checkout:", result.error);
      }
    } catch (error) {
      console.error("Error al redirigir a Checkout:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center">
      <AccountBalanceWalletIcon sx={{ fontSize: 30 }} className="mr-2" /> {/* Icono de billetera */}
        <span className="text-xl">Saldo: {walletBalance} <b>Rockobits</b></span>{" "}
        {/* Mostrar el saldo de la billetera */}
      </div>
      <h2 className="text-4xl font-bold text-center mb-4">
        Comprar combos de <b>Rockobits</b>
      </h2>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id} className="mb-2 bg-gray-100 p-4 rounded">
            <span className="font-bold">{pkg.rockobitsAmount} Rockobits</span> -{" "}
            {pkg.price / 100} USD, Nombre del Paquete: {pkg.name}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleBuyClick(pkg.id)}
            >
              Comprar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rockobits;
