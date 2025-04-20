import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import GetStartedPage from "./pages/GetStartedPage";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        {/*<Navbar/>*/}
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
