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
  useToast,
} from "@chakra-ui/react";
import { FaUser, FaBell, FaSlidersH } from "react-icons/fa"; // Import icons
import { Link, useLocation, useParams } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

import BG_Image from "/images/11.png";

// Define the isValidPath function at the top of the file
const isValidPath = (path) =>
  path && !path.includes("/:") && !path.endsWith("/:");

const ProfileSettingsPage = () => {
  const toast = useToast();
  const [initialData, setInitialData] = useState(null);
  const { id: userId } = useParams(); // Get userId from URL
  const [userData, setUserData] = useState({
    username: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeSetting, setActiveSetting] = useState("Profile Settings"); // Initialize activeSetting
  const location = useLocation();
  // Defensive: never allow malformed dynamic routes in breadcrumbs
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    userId ? { label: "Profile", path: `/profile/${userId}` } : null,
    { label: "Settings", path: location.pathname + location.search },
  ]
    .filter(Boolean)
    .filter((crumb) => isValidPath(crumb.path));

  useEffect(() => {
    console.log("User ID from URL:", userId);

    const fetchUserData = async () => {
      try {
        if (userId) {
          const { data } = await axios.get(
            `https://thebitebook.onrender.com.onrender.com/api/users/${userId}`
          );
          console.log("Fetched User Data:", data); // Debugging: Log the fetched data
          setUserData({
            username: data.username || "", // Assuming "name" is the first name
            name: data.name || "",
            email: data.email || "",
          });
          setInitialData({
            username: data.username || "",
            name: data.name || "",
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
    if (JSON.stringify(userData) === JSON.stringify(initialData)) {
      // If no changes are made
      toast({
        title: "No new changes.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (userId) {
        await axios.put(
          `https://thebitebook.onrender.comm.onrender.com/api/users/${userId}`,
          userData
        );
        toast({
          title: "Profile updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInitialData(userData); // Update initial data after successful save
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Failed to update profile.",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lleyshpd"); // Use your actual unsigned preset

    try {
      // Upload to Cloudinary
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dz4jym5dr/image/upload",
        formData
      );

      const profilePictureUrl = cloudinaryResponse.data.secure_url;

      // Send the Cloudinary URL to the backend (matches backend logic)
      await axios.put(
        `https://thebitebook.onrender.com/api/users/${userId}/profile-picture`,
        { profilePicture: profilePictureUrl }
      );

      toast({
        title: "Profile picture updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUserData((prevData) => ({
        ...prevData,
        profilePicture: profilePictureUrl,
      }));
    } catch (error) {
      console.error("Error updating profile picture:", error.response?.data || error.message);
      toast({
        title: "Failed to upload profile picture.",
        description: error.response?.data?.message || "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!userId) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: User ID is missing. Please try again.</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Breadcrumbs at the top of the page */}
      <Box maxW="1200px" mx="auto" px={6} pt={6}>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.map((crumb, idx) => (
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
                src={userData.profilePicture} // Display user's profile picture or fallback to default
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
              onClick={() => document.getElementById("profilePictureInput").click()}
            >
              Change Profile Picture
            </Button>
            <Input
              type="file"
              id="profilePictureInput"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
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
                  focusBorderColor="orange.500"
                  value={userData.username}
                  onChange={handleInputChange}
                />
                {/* Adjust input width */}
              </Flex>
            </Box>
            {/* Name Field */}
            <Box width={{ base: "100%", md: "60%" }}>
              <Flex direction="row" align="center" gap={2}>
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="medium"
                  width="35%"
                >
                  Name
                </Text>
                <Input
                  placeholder="Enter your name"
                  name="name"
                  focusBorderColor="orange.500"
                  value={userData.name}
                  onChange={handleInputChange}
                />
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
            <Box width={{ base: "100%", md: "60%" }}></Box>
            <Button
              bg="orange.400"
              color="white"
              _hover={{ bg: "orange.700" }}
              width={{ base: "80%", md: "200px" }}
              mx="auto"
              mt="2%"
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
