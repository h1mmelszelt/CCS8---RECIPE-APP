import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar"; // Logged-out Navbar
import NavbarLogged from "./Navbar(Logged)"; // Logged-in Navbar

const NavbarWrapper = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <NavbarLogged /> : <Navbar />;
};

export default NavbarWrapper;
