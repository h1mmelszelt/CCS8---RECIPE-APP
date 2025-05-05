import {
  Box,
  Image,
  Text,
  Flex,
  Button,
  Divider,
  Switch,
  Select,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { useState } from "react";
import { FaUser, FaBell, FaSlidersH } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import BG_Image from "/images/11.png";
import { useThemeToggle } from "../components/ThemeProvider"; // Import the theme toggle hook

const AdvancedSettingsPage = () => {
  const { id: userId } = useParams(); // Get userId from URL
  const location = useLocation();
  const [activeSetting, setActiveSetting] = useState("Advanced Settings");
  const toggleTheme = useThemeToggle();

  // Defensive: never allow malformed dynamic routes in breadcrumbs
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    { label: "Profile", path: `/profile/${userId}` },
    { label: "Settings", path: `/settings/${userId}` },
  ].filter(
    (crumb) =>
      crumb &&
      crumb.path &&
      !crumb.path.includes("/:") &&
      !crumb.path.endsWith("/:")
  );

  return (
    <Box
      position="relative"
      minH="100vh"
      overflow="hidden"
      pb={{ base: "60px", md: "0" }}
    >
      {/* Breadcrumbs at the top of the page */}
      <Box maxW="1200px" mx="auto" px={6} pt={6}>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs
            .filter(
              (crumb) =>
                crumb &&
                crumb.path &&
                !crumb.path.includes("/:") &&
                !crumb.path.endsWith("/:")
            )
            .map((crumb, idx) => (
              <span key={crumb.path}>
                {idx === breadcrumbs.length - 1 ? (
                  <span style={{ color: "#FD660B", fontWeight: "bold" }}>
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    style={{ color: "#FD660B", textDecoration: "underline" }}
                  >
                    {crumb.label}
                  </Link>
                )}
                {idx < breadcrumbs.length - 1 && " > "}
              </span>
            ))}
        </Text>
      </Box>

      <Box position="relative" zIndex={2}></Box>

      {/* Background Images */}
      <Image
        src={BG_Image}
        position="absolute"
        top="0"
        left="90%"
        transform="translateX(-50%)"
        width={{ base: "90vw", md: "60vw" }}
        maxW="none"
        zIndex={0}
        opacity={1}
        display={{ base: "none", lg: "block" }}
      />
      <Image
        src={BG_Image}
        position="absolute"
        top="70vh"
        left="0vw"
        width={{ base: "70vw", md: "20vw" }}
        maxW="none"
        zIndex={0}
        transform="rotate(180deg)"
        display={{ base: "none", lg: "block" }}
      />

      {/* Account Settings Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        px={{ base: 4, md: 20 }}
        py={10}
        zIndex={2}
        gap={{ base: 4, md: 6 }}
      >
        {/* Settings Menu */}
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={6}
          width={{ base: "100%", md: "300px" }}
        >
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="bold"
            color="#FD660B"
            mb={4}
          >
            Settings
          </Text>
          <VStack align="start" spacing={4}>
            {[
              {
                label: "Profile Settings",
                icon: FaUser,
                link: userId ? `/settings/${userId}` : "/login",
              },
              {
                label: "Notifications",
                icon: FaBell,
                link: userId ? `/notification-settings/${userId}` : "/login",
              },
              {
                label: "Advanced Settings",
                icon: FaSlidersH,
                link: userId ? `/advanced-settings/${userId}` : "/login",
              },
            ].map((item) => (
              <Link to={item.link} key={item.label} style={{ width: "100%" }}>
                <Flex
                  align="center"
                  width="100%"
                  bg={activeSetting === item.label ? "#dfedc3" : "transparent"}
                  borderLeftWidth={activeSetting === item.label ? "4px" : "0"}
                  borderLeftColor={
                    activeSetting === item.label ? "green.600" : "transparent"
                  }
                  p={2}
                  cursor="pointer"
                  onClick={() => setActiveSetting(item.label)}
                >
                  <Icon as={item.icon} color="#97C33A" boxSize={5} mr={3} />
                  <Text
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight="medium"
                    color={
                      activeSetting === item.label ? "green.600" : "#97C33A"
                    }
                    _hover={{ textDecoration: "none" }}
                  >
                    {item.label}
                  </Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={6}
          flex="1"
          width="100%"
          zIndex={1}
        >
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="bold"
            color="#FD660B"
            mb={4}
          >
            Advanced Settings
          </Text>

          {/* Divider */}
          <Box mb={6}>
            <Divider borderColor="gray.300" />
          </Box>

          {/* Security & Privacy Section */}
          <Box mb={6}>
            <Text fontSize="18px" fontWeight="bold" color="#FD660B" mb={4}>
              Security & Privacy
            </Text>
            <Flex justify="space-between" align="center" mb={1}>
              <Text
                fontSize={{ base: "20x", md: "16px" }} // Smaller font size for mobile, larger for desktop
                fontWeight="medium"
                color="black"
              ></Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text
                fontSize={{ base: "16px", md: "16px" }} // Smaller font size for mobile, larger for desktop
                fontWeight="medium"
                color="black"
              >
                Delete My Account
              </Text>
              <Button
                bg="red.500"
                color="white"
                _hover={{ bg: "red.600" }}
                width={{ base: "150px", md: "155px" }} // Same width as Deactivate button
              >
                Delete Account
              </Button>
            </Flex>
          </Box>

          {/* My Account Section */}
          <Box mb={6}>
            <Text fontSize="18px" fontWeight="bold" color="#FD660B" mb={4}>
              My Account
            </Text>
            <Flex justify="space-between" align="center">
              <Text fontSize="16px" fontWeight="medium" color="black">
                Make my profile private
              </Text>
              <Switch colorScheme="green" size="lg" />
            </Flex>
          </Box>

          {/* Theme Section */}
          <Box mb={6}>
            <Text fontSize="18px" fontWeight="bold" color="#FD660B" mb={4}>
              Theme
            </Text>
            <Flex justify="space-between" align="center">
              <Text fontSize="16px" fontWeight="medium" color="black">
                Dark Mode
              </Text>
              <Switch colorScheme="green" size="lg" onChange={toggleTheme} />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdvancedSettingsPage;
