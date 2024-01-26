import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../auth/AuthProvider";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const goTo = useNavigate();

  const auth = useAuth();
  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("* - Please, enter a valid email");
      return;
    }
    if (formData.password.length < 8) {
      setError("* - Please, enter a valid password(min 8 characters)");
      return;
    }
    try {
      const response = await api.post("/auth/login/companies", formData);
      if (response.data.token) {
        auth.saveUser(response.data);
        goTo("/dashboard");
      }
    } catch (error) {
      if (typeof error.response.data.message === "string") {
        setError(`* - ${error.response.data.message}`);
      } else if (Array.isArray(error.response.data.message)) {
        setError(`* - ${error.response.data.message[0]}`);
      } else {
        setError("* - Something went wrong!");
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <main className="flex h-screen justify-center items-center bg-gray-200">
      <form
        className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
      <div>
        {error && (
          <p className="text-red-500 text-xs italic text-center">{error}</p>
        )}
      </div>
    </main>
  );
}

export default Login;
