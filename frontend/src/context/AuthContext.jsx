import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ======================================================
  // TOKEN
  // Session lasts only for the current browser tab.
  // ======================================================

  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token");
  });

  // ======================================================
  // USER
  // ======================================================

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data in sessionStorage:", error);

      sessionStorage.removeItem("user");

      return null;
    }
  });

  // ======================================================
  // LOGIN
  // ======================================================

  const login = (newToken, newUser) => {
    // Store authentication only in this tab.
    sessionStorage.setItem("token", newToken);

    sessionStorage.setItem("user", JSON.stringify(newUser));

    // Remove old persistent authentication
    // from previous versions.
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(newToken);
    setUser(newUser);
  };

  // ======================================================
  // UPDATE USER
  // ======================================================

  const updateUser = (updatedUser) => {
    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = () => {
    sessionStorage.removeItem("token");

    sessionStorage.removeItem("user");

    // Clean old persistent auth.
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // ======================================================
  // AUTH STATE
  // ======================================================

  const isAuth = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        updateUser,
        logout,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ======================================================
// useAuth
// ======================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;
