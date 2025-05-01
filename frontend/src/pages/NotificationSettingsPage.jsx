import {
  Box,
  Image,
  Text,
  Flex,
  VStack,
  Icon,
  Button,
  Divider,
  Switch,
} from "@chakra-ui/react";
import { FaUser, FaBell, FaSlidersH } from "react-icons/fa"; // Import icons
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"; // Import Link for navigation

import BG_Image from "/images/11.png";

const NotificationSettingsPage = () => {
  const { id: userId } = useParams();
  const location = useLocation();
  // Breadcrumbs for Notification Settings Page (stop at Settings)
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    { label: "Profile", path: `/profile/${userId}` },
    { label: "Settings", path: `/settings/${userId}` },
  ];
  const [activeSetting, setActiveSetting] = useState("Notifications"); // State to track active setting
  

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Breadcrumbs at the top of the page */}
      <Box maxW="1200px" mx="auto" px={6} pt={6}>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.path}>
              <Link to={crumb.path} style={{ color: "#FD660B", textDecoration: "underline" }}>{crumb.label}</Link>
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
        direction={{ base: "column", md: "row" }} // Stack vertically on mobile, horizontally on larger screens
        align="flex-start"
        px={{ base: 4, md: 20 }}
        py={10}
        zIndex={2}
        gap={{ base: 4, md: 6 }} // Adjust spacing between boxes for mobile
      >
        {/* Settings Menu */}
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={6}
          width={{ base: "100%", md: "300px" }} // Full width on mobile, fixed width on larger screens
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
              { label: "Profile Settings", icon: FaUser, link: `/settings/${userId}`},
              {
                label: "Notifications",
                icon: FaBell,
                link: `/notification-settings/${userId}`,
              },
              {
                label: "Advanced Settings",
                icon: FaSlidersH,
                link: `/advanced-settings/${userId}`,
              },
            ].map((item) => (
              <Link to={item.link} key={item.label} style={{ width: "100%" }}>
                <Flex
                  key={item.label}
                  align="center"
                  width="100%"
                  bg={activeSetting === item.label ? "#dfedc3" : "transparent"}
                  borderLeftWidth={activeSetting === item.label ? "4px" : "0"}
                  borderLeftColor={
                    activeSetting === item.label ? "green.600" : "transparent"
                  }
                  p={2}
                  cursor="pointer"
                  onClick={() => setActiveSetting(item.label)} // Set active setting on click
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

        {/* Large Content Box */}
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={6}
          flex="1"
          width="100%" // Full width on mobile
          zIndex={1}
        >
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="bold"
            color="#FD660B"
            mb={4}
          >
            Notifications
          </Text>

          {/* Divider Line */}
          <Box mb={6}>
            <Divider borderColor="gray.300" />
          </Box>

          {/* Notification Settings Section */}
          <Flex direction="column" gap={6}>
            <Box>
              <Text fontSize="18px" fontWeight="bold" color="#FD660B" mb={2}>
                Email Notifications
              </Text>
              <Flex justify="space-between" align="center" mb={4}>
                <Box>
                  <Text fontSize="16px" fontWeight="bold" color="black">
                    Weekly Newsletter
                  </Text>
                  <Text fontSize="14px" color="gray.600">
                    Receive our weekly newsletter with the latest updates and
                    popular posts.
                  </Text>
                </Box>
                <Switch colorScheme="green" size="lg" /> {/* Slider button */}
              </Flex>
              <Flex justify="space-between" align="center" mb={4}>
                <Box>
                  <Text fontSize="16px" fontWeight="bold" color="black">
                    General Activity
                  </Text>
                  <Text fontSize="14px" color="gray.600">
                    Receive alerts when others engage with your content.
                  </Text>
                </Box>
                <Switch colorScheme="green" size="lg" />{" "}
                {/* Slider button with default ON */}
              </Flex>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="16px" fontWeight="bold" color="black">
                    User Account
                  </Text>
                  <Text fontSize="14px" color="gray.600">
                    Stay informed about important updates to your account, like
                    password changes and login activity.
                  </Text>
                </Box>
                <Switch colorScheme="green" size="lg" />{" "}
                {/* Slider button with default ON */}
              </Flex>
            </Box>
            <Button
              bg="#58653C"
              color="white"
              _hover={{ bg: "green.500" }}
              width={{ base: "80%", md: "200px" }} // Full width on mobile
              mx="auto"
              mt="5%"
            >
              Save Changes
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NotificationSettingsPage;
