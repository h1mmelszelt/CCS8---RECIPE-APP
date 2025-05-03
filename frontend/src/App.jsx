import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sitemap from "./components/Sitemap";
import NavbarWrapper from "./components/NavbarWrapper";
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
import NotificationSettingsPage from "./pages/NotificationSettingsPage";
import FAQPage from "./pages/FAQPage";
import AboutUsPage from "./pages/AboutUsPage";
import SignInRequired from "./pages/SignInRequired";
import { AuthProvider } from "./context/AuthContext";
import SitemapPage from "./pages/SitemapPage";
import LoggedOutSettings from "./pages/LoggedOutSettings";
import EditRecipePage from "./pages/EditRecipePage";

function App() {
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
  const location = useLocation();
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <Box
          minH={"100vh"}
          bg={useColorModeValue("gray.100", "gray.900")}
          fontFamily="'Poppins', sans-serif"
        >
          {/* Navbar */}
          <NavbarWrapper />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<GetStartedPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/profile/:id"
              element={<ProfilePage isOwner={true} />}
            />
            <Route path="/me" element={<MePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings/:id" element={<SettingsPage />} />
            <Route path="/logged-out-settings" element={<LoggedOutSettings />} />
            <Route
              path="/notifications"
              element={<NotificationsPage notifications={notifications} />}
            />
            <Route
              path="/advanced-settings/:id"
              element={<AdvancedSettingsPage />}
            />
            <Route
              path="/notification-settings/:id"
              element={<NotificationSettingsPage />}
            />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recipes/:recipeId" element={<RecipePage />} />
            <Route path="/edit/:recipeId" element={<EditRecipePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/sign-in-required" element={<SignInRequired />} />
            <Route path="/site-map" element={<SitemapPage />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>

          {/* Footer: Hide on SitemapPage */}
          {location.pathname !== "/site-map" && (
            <Sitemap />
          )}
        </Box>
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;
