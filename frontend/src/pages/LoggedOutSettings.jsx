import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Switch,
  Button,
  Divider,
} from "@chakra-ui/react";

const LoggedOutSettings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for Dark Mode
  const [isColorBlindMode, setIsColorBlindMode] = useState(false); // State for Color Blind Mode

  const handleSaveChanges = () => {
    console.log("Dark Mode:", isDarkMode);
    console.log("Color Blind Mode:", isColorBlindMode);
    alert("Settings saved successfully!");
  };

  return (
    <Box position="relative" minH="100vh" bg="gray.50" p={6}>
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="md"
        p={6}
        maxW="800px"
        mx="auto"
        mt={200}
      >
        <Text
          fontSize={{ base: "20px", md: "24px" }}
          fontWeight="bold"
          color="#FD660B"
          mb={4}
          textAlign="center"
        >
          Settings
        </Text>

        <Divider borderColor="gray.300" mb={6} />

        {/* Theme Dark Mode */}
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="16px" fontWeight="medium" color="black">
            Theme Dark Mode
          </Text>
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={isDarkMode}
            onChange={(e) => setIsDarkMode(e.target.checked)}
          />
        </Flex>

        {/* Color Blind Mode */}
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="16px" fontWeight="medium" color="black">
            Color Blind Mode
          </Text>
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={isColorBlindMode}
            onChange={(e) => setIsColorBlindMode(e.target.checked)}
          />
        </Flex>

        <Divider borderColor="gray.300" mb={6} />

        {/* Save Changes Button */}
        <Button
          bg="#58653C"
          color="white"
          _hover={{ bg: "green.500" }}
          width="100%"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default LoggedOutSettings;