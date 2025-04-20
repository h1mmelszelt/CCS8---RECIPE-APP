<<<<<<< HEAD
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
>>>>>>> ff3cba67ddc63e0978f6ad7ad5b8e7a3d9cf84f9
import GetStartedPage from "./pages/GetStartedPage";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
