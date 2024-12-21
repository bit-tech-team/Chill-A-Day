import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import { BackendClient } from "../utils/backendClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const client = new BackendClient();
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);

  const CHECK_INTERVAL = 60000;

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) {
        return true;
      }
      
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const closeSession = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const loadUserProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      closeSession();
      toast.info("Tu sesión ha expirado, por favor inicia sesión nuevamente");
      setLoading(false);
      return;
    }

    try {
      const { data } = await client.get(`/api/users/profile`);
      setAuth(data);
    } catch {
      setAuth({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        closeSession();
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading, setAuth, closeSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
