import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../../api/api";

function CreateEmployees() {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } else {
        console.error("El token no está presente en el LocalStorage");
      }
    } catch (error) {
      console.error("Error al obtener las membresías:", error);
    }
  }, []);

  const handleChange = (e) => {
    setMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("No se ha podido obtener el id del usuario");
      return;
    }

    if (
      formData.name === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.address === "" ||
      formData.phone === ""
    ) {
      setMessage({
        type: "error",
        content: "Por favor, rellena todos los campos.",
      });
      return;
    }

    try {
      // Realiza la solicitud para crear el empleado
      const response = await api.post("/employee/create", {
        ...formData,
        userId,
      });
      setMessage({ type: "success", content: "Empleado creado con éxito." });
      setFormData({
        name: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      });

      // Puedes redirigir o manejar el resultado de la creación aquí
    } catch (error) {
      console.error("Error al crear el empleado:", error);
      setMessage({
        type: "error",
        content: "Error al crear el empleado. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <div>
      <p className="text-yellow-500 text-sm font-bold">
        Component in Construction
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
        <TextField
          label="Nombre"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.name}
        />
        <TextField
          label="Apellido"
          name="lastName"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.lastName}
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.password}
        />
        <TextField
          label="Dirección"
          name="address"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.address}
        />
        <TextField
          label="Teléfono"
          name="phone"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.phone}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4"
        >
          Crear Empleado
        </Button>
      </form>
      {message && (
        <div
          className={`${
            message.type === "success" ? "bg-green-300" : "bg-red-300"
          } p-2  mt-4 rounded`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
}

export default CreateEmployees;
