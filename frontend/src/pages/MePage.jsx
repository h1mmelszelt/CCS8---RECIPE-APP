import React from "react";
import {
  Box,
  VStack,
  Text,
  Avatar,
  Flex,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaUserCog, FaSignOutAlt, FaStar, FaUser } from "react-icons/fa";
import Navbar from "../components/Navbar(Logged)"; // Import the Navbar

function MePage() {
  return (
    <Box bg="white" minH="100vh" color="black">
      {/* Navbar */}
      <Navbar /> {/* Render the Navbar at the top */}
      {/* Page Content */}
      <Box p={4}>
        {/* User Info Section */}
        <Flex align="center" mb={6}>
          <Avatar
            size="lg"
            name="User Name"
            src="/images/default-avatar.jpg" // Replace with actual avatar URL
            mr={4}
          />
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="black">
              User Name
            </Text>
            <Text fontSize="sm" color="gray.600">
              @username
            </Text>
          </Box>
        </Flex>

        <Divider borderColor="orange.500" mb={6} />

        {/* Options Section */}
        <VStack spacing={4} align="stretch">
          {/* Profile */}
          <Flex
            as={Link}
            to="/profile"
            align="center"
            justify="space-between"
            p={4}
            bg="white"
            border="2px solid orange"
            borderRadius="md"
            _hover={{ bg: "orange.100" }}
          >
            <Flex align="center">
              <Icon as={FaUser} color="orange.500" boxSize={5} mr={4} />
              <Text fontSize="md" fontWeight="medium" color="black">
                Profile
              </Text>
            </Flex>
            <Icon as={ChevronRightIcon} color="gray.500" />
          </Flex>

          {/* Settings */}
          <Flex
            as={Link}
            to="/settings"
            align="center"
            justify="space-between"
            p={4}
            bg="white"
            border="2px solid orange"
            borderRadius="md"
            _hover={{ bg: "orange.100" }}
          >
            <Flex align="center">
              <Icon as={FaUserCog} color="orange.500" boxSize={5} mr={4} />
              <Text fontSize="md" fontWeight="medium" color="black">
                Settings
              </Text>
            </Flex>
            <Icon as={ChevronRightIcon} color="gray.500" />
          </Flex>

          {/* Logout */}
          <Flex
            as={Link}
            to="/logout"
            align="center"
            justify="space-between"
            p={4}
            bg="white"
            border="2px solid orange"
            borderRadius="md"
            _hover={{ bg: "orange.100" }}
          >
            <Flex align="center">
              <Icon as={FaSignOutAlt} color="red.500" boxSize={5} mr={4} />
              <Text fontSize="md" fontWeight="medium" color="black">
                Logout
              </Text>
            </Flex>
            <Icon as={ChevronRightIcon} color="gray.500" />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

export default MePage;
