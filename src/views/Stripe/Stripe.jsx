import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { jwtDecode } from "jwt-decode";
import Card from "../../components/Memberships/Card";
import CheckoutModal from "../../components/Memberships/CheckoutModal";
import { useUser } from "../../contexts/UserContext";
import api from "../../api/api";

const stripePromise = loadStripe(
  "pk_test_51M4ShsFeiEj6y242YNiI1u9Kf1HZM4eHjMZYMeHYrTCHwRfSIA3JwC5znJfpmk0EZWlLbsvQ9wXQZbLAdJZsdhUD00dehK0IeW"
);

const Stripe = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [membership, setMembership] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [availableMemberships, setAvailableMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const { updateUser } = useUser();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Decodificar el token
          const decodedToken = jwtDecode(token);

          setUserId(decodedToken.id);
          // Verificar si la propiedad countryId está presente en el token
          if (decodedToken && decodedToken.countryId) {
            const countryId = decodedToken.countryId;

            const response = await api.get(`/membership/${countryId}`);
            console.log(response);
            setAvailableMemberships(response.data);
            setLoading(false);
          } else {
            console.error(
              "La propiedad countryId no está presente en el token"
            );
            setLoading(false);
          }
        } else {
          console.error("El token no está presente en el LocalStorage");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener las membresías:", error);
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  useEffect(() => {
    if (selectedMembership) {
      createCheckoutSession();
    }
  }, [selectedMembership]);

  const handleCardClick = async (membershipId) => {
    try {
      await createCheckoutSession();
      setSelectedMembership(membershipId);
      setOpenModal(true);

      // Crear la sesión de checkout cuando se hace clic en "Obtener"
    } catch (error) {
      console.error("Error al procesar el clic en la tarjeta:", error);
    }
  };

  const createCheckoutSession = async () => {
    try {
      const response = await api.post(
        "/stripe/create-checkout-session-subscription",
        {
          membershipId: selectedMembership,
          userId,
        }
      );

      console.log(response.data.sessionId);
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error("Error al crear la sesión de checkout:", error);
    }
  };

  const redirectToCheckout = async (sessionId) => {
    try {
      if (sessionId) {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId,
        });

        if (result.error) {
          console.error("Error al redirigir a Checkout:", result.error);
        }
      }
    } catch (error) {
      console.error("Error al redirigir a Checkout:", error);
    }
  };

  if (loading) {
    return <p>Cargando membresías...</p>;
  }

  return (
    <div className="container mx-auto mt-8 ">
      <h1 className="text-3xl font-bold mb-4">Membresias:</h1>
      <div className="flex flex-wrap">
        {console.log(availableMemberships)}
        {availableMemberships.map((membership, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 mb-8"
          >
            <Card
              membership={membership}
              onClick={() => handleCardClick(membership.id)}
              setMembership={setMembership}
            />
          </div>
        ))}
      </div>

      <CheckoutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={redirectToCheckout}
        sessionId={sessionId}
        selectedMembership={selectedMembership}
        membership={membership}
      />
    </div>
  );
};

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Stripe />
    </Elements>
  );
};

export default StripeWrapper;
