// Login.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { loginEmployee } from "../../features/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const goTo = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email) || formData.password.length < 8) {
      // Puedes gestionar la validación aquí si es necesario
      return;
    }

    // Disparar la acción de inicio de sesión
    dispatch(loginEmployee(formData))
      .then((result) => {
        // Resultado exitoso del inicio de sesión
        if (result.payload && result.payload.token) {
          console.log("first")
          goTo("/dashboard");
        }
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión
        // Puedes acceder a los errores a través de `auth.error` en el estado global
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <main className="flex h-screen justify-center items-center bg-gray-200">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            onChange={handleInputChange}
            fullWidth
            size="small"
          />
        </div>
        <div className="mb-4 relative">
          <TextField
            id="password"
            name="password"
            onChange={handleInputChange}
            label="Contraseña"
            variant="outlined"
            fullWidth
            size="small"
            type="password"
          />
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          INICIAR
        </Button>
      </form>

      <div className="bg-gray-500 p-4 rounded-md">
        <Link to="/login">Go to Company Login</Link>
      </div>
      <div>
        {auth.status === "failed" && (
          <p className="text-red-500 text-xs italic text-center">
            {auth.error}
          </p>
        )}
      </div>
    </main>
  );
}

export default Login;
