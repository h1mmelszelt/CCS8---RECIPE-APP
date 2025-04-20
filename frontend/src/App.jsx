import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
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
