import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          console.warn("❌ Token expired");
          localStorage.removeItem("token");
        } else {
          setUser({ token, username: decoded.sub });
        }
      } catch (err) {
        console.error("❌ Invalid token format", err.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);

      if (!data.token) throw new Error("No token in response");

      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser({ token: data.token, username: decoded.sub });
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);

      if (!data.token) throw new Error("No token in response");

      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser({ token: data.token, username: decoded.sub });
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
