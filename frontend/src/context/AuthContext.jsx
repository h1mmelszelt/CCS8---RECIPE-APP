import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define the checkAuthStatus function
  /*const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token);
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        const currentTime = Date.now() / 1000;
        console.log("Current time:", currentTime, "Token expiry:", decoded.exp);

        if (decoded.exp < currentTime) {
          // Token has expired
          console.log("Token has expired");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          // Token is valid
          console.log("Token is valid");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
    console.log("No token found");
      setIsAuthenticated(false);
    }
  };*/

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  // Initial check for authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};