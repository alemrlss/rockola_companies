import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData) => {},
  checkTokenExpiration: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem("token" ?? false)
  );

  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) ?? {}
  );

  useEffect(() => {
    checkTokenExpiration();
    checkAuth();
  }, []);

  async function checkAuth() {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData) {
    const userInfo = {
      name: userData.user.name,
      email: userData.user.email,
      role: userData.user.type,
      membership: {
        name: userData.user.membership?.name,
        type: userData.user.membership?.type,
        expiration: userData.user.membership?.expiration,
      },
    };
    setUser(userInfo);

    localStorage.setItem("user", JSON.stringify(userInfo));

    localStorage.setItem("token", JSON.stringify(userData.token));
    localStorage.setItem("tokenExpiration", new Date(userData.tokenExpiration));

    setAccessToken(userData.token);
    setIsAuthenticated(true);
  }

  function checkTokenExpiration() {
    const expirationDate = new Date(localStorage.getItem("tokenExpiration"));
    if (expirationDate < new Date()) {
      // Token expirado, limpia el almacenamiento
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      setAccessToken("");
      setIsAuthenticated(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("user");
    setAccessToken("");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        getAccessToken,
        saveUser,
        checkTokenExpiration,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
