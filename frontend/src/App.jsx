import { Box, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sitemap from "./components/Sitemap";
import GetStartedPage from "./pages/GetStartedPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/ProfileSettingsPage";
import AdvancedSettingsPage from "./pages/AdvancedSettingsPage";
import MePage from "./pages/MePage";
import ContactUsPage from "./pages/ContactUsPage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import { CustomThemeProvider } from "./components/ThemeProvider";
import NotificationsPage from "./pages/NotificationsPage";
import NotificationSettingsPage from "./pages/NotificationSettingsPage"; // Import NotificationSettingsPage
import FAQPage from "./pages/FAQPage";
import AboutUsPage from "./pages/AboutUsPage";
import SignInRequired from "./pages/SignInRequired";

function App() {
  const loggedInUserId = "6803723a7cf02156db240351"; // Replace with actual logged-in user ID
  const profileOwnerId = "6803723a7cf02156db240351"; // Replace with the profile owner's ID (dynamic)
  const notifications = [
    {
      id: 1,
      name: "John Doe",
      message: "liked your recipe",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "commented on your recipe",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "Alice Johnson",
      message: "shared your recipe",
      time: "Tuesday",
    },
  ];
  return (
    <>
      <CustomThemeProvider>
        <Box
          minH={"100vh"}
          bg={useColorModeValue("gray.100", "gray.900")}
          fontFamily="'Poppins', sans-serif"
        >
          <Routes>
            <Route path="/" element={<GetStartedPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/profile/:id"
              element={
                <ProfilePage isOwner={loggedInUserId === profileOwnerId} />
              }
            />
            <Route path="/me" element={<MePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/notifications"
              element={<NotificationsPage notifications={notifications} />}
            />
            <Route
              path="/advanced-settings"
              element={<AdvancedSettingsPage />}
            />
            <Route
              path="/notification-settings"
              element={<NotificationSettingsPage />}
            />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recipes/:recipeId" element={<RecipePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/sign-in-required" element={<SignInRequired />} />
          </Routes>
          <Sitemap />
        </Box>
      </CustomThemeProvider>
    </>
  );
}

export default App;
