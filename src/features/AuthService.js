/* eslint-disable no-useless-catch */
import api from "../api/api";

// features/auth/authService.js
const authService = {
  async login(credentials) {
    try {
      // Realiza una solicitud al backend para iniciar sesión
      const response = await api.post("auth/login/companies", {
        email: credentials.email,
        password: credentials.password,
      });
      if (response.status !== 201) {
        throw new Error("Credenciales inválidas");
      }

      return {
        user: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          type: response.data.user.type,
          balance: response.data.user.balance,
          wallet: response.data.user.wallet,
          membership: response.data.user.membership,
        },
        token: response.data.token,
        tokenExpiration: response.data.tokenExpiration,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async loginEmployee(credentials) {
    try {
      // Realiza una solicitud al backend para iniciar sesión
      const response = await api.post("auth/login-employee", {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.status !== 201) {
        throw new Error("Credenciales inválidas");
      }

      return {
        user: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          type: response.data.user.type,
          balance: response.data.user.balance,
          wallet: response.data.user.wallet,
          membership: null,
        },
        token: response.data.token,
        tokenExpiration: response.data.tokenExpiration,
      };
    } catch (error) {
      throw error;
    }
  },

  // Otros métodos relacionados con la autenticación, como verificar la sesión, renovar el token, etc.
};

export default authService;
