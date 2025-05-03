import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  VStack,
  Icon,
  Input,
  Button,
  Divider,
  Select,
} from "@chakra-ui/react";
import { FaUser, FaBell, FaSlidersH } from "react-icons/fa"; // Import icons
import { Link, useLocation, useParams } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

import BG_Image from "/images/11.png";

const ProfileSettingsPage = () => {
  const { id: userId } = useParams(); // Get userId from URL
  const [userData, setUserData] = useState({
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeSetting, setActiveSetting] = useState("Profile Settings"); // Initialize activeSetting
  const location = useLocation();
  // Defensive: never allow malformed dynamic routes in breadcrumbs
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    userId ? { label: "Profile", path: `/profile/${userId}` } : null,
    { label: "Settings", path: location.pathname + location.search },
  ].filter(Boolean).filter(crumb => isValidPath(crumb.path));

  useEffect(() => {
    console.log("User ID from URL:", userId);

    const fetchUserData = async () => {
      try {
        if (userId) {
          const { data } = await axios.get(
            `http://localhost:5000/api/users/${userId}`
          );
          console.log("Fetched User Data:", data); // Debugging: Log the fetched data
          setUserData({
            username: data.username || "", // Assuming "name" is the first name
            email: data.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Stop loading after data is fetched
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (userId) {
        await axios.put(`http://localhost:5000/api/users/${userId}`, userData);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Show a loading message while fetching data
  }

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Breadcrumbs at the top of the page */}
      <Box maxW="1200px" mx="auto" px={6} pt={6}>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.path}>
              {idx === breadcrumbs.length - 1 ? (
                <span style={{ color: "#FD660B", fontWeight: "bold" }}>{crumb.label}</span>
              ) : (
                <Link to={crumb.path} style={{ color: "#FD660B", textDecoration: "underline" }}>{crumb.label}</Link>
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
              { label: "Profile Settings", icon: FaUser, link: userId ? `/settings/${userId}` : "/login" },
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
            Profile Settings
          </Text>

          {/* Divider Line */}
          <Box mb={6}>
            <Divider borderColor="gray.300" />
          </Box>

          {/* Profile Picture Section */}
          <Flex
            direction="row"
            align="center"
            mb={6}
            gap={4}
            ml={{ base: "0", md: "20%" }}
          >
            <Box
              bg="gray.200" // Placeholder background color
              borderRadius="full" // Makes the box circular
              width={{ base: "100px", md: "150px" }} // Adjust size for responsiveness
              height={{ base: "100px", md: "150px" }} // Match height to width for a perfect circle
              overflow="hidden" // Ensures the image stays within the circle"
            >
              <Image
                src="/images/Gordon.jpg" // Replace with the actual profile picture path
                alt="Profile Picture"
                objectFit="cover"
                width="100%"
                height="100%"
                mr="10%"
              />
            </Box>
            <Button
              variant="outline" // Outline style for the button
              borderColor="gray.400" // Border color
              color="#FD660B" // Text color
              _hover={{ bg: "orange.100" }} // Background color on hover
              size="sm"
              ml={{ base: "10%", md: "10%" }}
            >
              Change Profile Picture
            </Button>
          </Flex>

          {/* Form Fields */}
          <Flex direction="column" gap={3} align="center">
            {" "}
            {/* Reduce gap between rows */}
            <Box width={{ base: "100%", md: "60%" }}>
              {" "}
              {/* Adjust width for uniformity */}
              <Flex direction="row" align="center" gap={2}>
                {" "}
                {/* Reduce gap between label and input */}
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="medium"
                  width="35%"
                >
                  {" "}
                  {/* Adjust label width */}
                  Username
                </Text>
                <Input
                placeholder="Enter your username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                />
                {/* Adjust input width */}
              </Flex>
            </Box>
            <Box width={{ base: "100%", md: "60%" }}>
              <Flex direction="row" align="center" gap={2}>
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="medium"
                  width="27.5%"
                >
                  Email
                </Text>
                <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="medium"
                color="gray.700"
                >
                  {userData.email || "No email available"}
                </Text>
              </Flex>
            </Box>
            <Box width={{ base: "100%", md: "60%" }}>
            </Box>
            <Button
              bg="#58653C"
              color="white"
              _hover={{ bg: "green.500" }}
              width={{ base: "80%", md: "200px" }}
              mx="auto"
              mt="5%"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileSettingsPage;
