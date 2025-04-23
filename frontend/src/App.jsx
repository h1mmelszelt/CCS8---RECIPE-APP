import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import GetStartedPage from "./pages/GetStartedPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/ProfileSettingsPage";
import NotificationPage from "./pages/NotificationSettingsPage";
import AdvancedSettingsPage from "./pages/AdvancedSettingsPage";
import MePage from "./pages/MePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notification-settings" element={<NotificationPage />} />
          <Route path="/advanced-settings" element={<AdvancedSettingsPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
