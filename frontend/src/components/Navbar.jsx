import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, BellIcon, AddIcon } from "@chakra-ui/icons";
import { FiHome, FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

function Navbar({ transparent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery); // Replace with actual search logic
    }
  };

  return (
    <Box
      px={{ base: 4, md: 6 }}
      py={4}
      boxShadow={transparent ? "none" : "md"} // Conditional boxShadow
      position="sticky"
      top="0"
      zIndex="999"
      bg={transparent ? "transparent" : "white"} // Conditional background
      display={{ base: "none", md: "block" }} // Hide on small screens, show on medium and larger screens
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        flexDirection={{ base: "column", md: "row" }} // Stack items on smaller screens
      >
        {/* Logo */}
        <Link to="/">
          <Text fontSize={{ base: "22", sm: "28" }} fontWeight="bold">
            <Text as="span" color="black">
              Insane
            </Text>
            <Text as="span" color="#FD660B">
              Recipe
            </Text>
          </Text>
        </Link>

        {/* Search Bar */}
        <InputGroup
          mt={{ base: 4, md: 0 }} // Add margin on smaller screens
          maxW={{ base: "100%", md: "500px" }} // Full width on smaller screens
          position={{ base: "static", md: "absolute" }} // Adjust position for smaller screens
          right={{ md: "300px" }}
        >
          <InputRightElement
            pointerEvents="auto" // Make the icon clickable
            onClick={handleSearch} // Trigger search on click
            cursor="pointer"
          >
            <SearchIcon color="#FD660B" boxSize={6} />
          </InputRightElement>
          <Input
            type="text"
            placeholder="Search recipes..."
            borderRadius="15px"
            bg="#E6E6E6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(); // Trigger search on Enter key
            }}
          />
        </InputGroup>

        {/* Buttons */}
        <Flex
          gap={1.5}
          mt={{ base: 4, md: 0 }} // Add margin on smaller screens
          display={{ base: "none", md: "flex" }} // Hide on smaller screens
          position="absolute"
          right="100px"
        >
          <Link to="/login">
            <Button borderWidth="1px" borderColor="#CACACA" textColor="black">
              LOG IN
            </Button>
          </Link>
          <Button
            borderWidth="1px"
            bg="#FD660B"
            borderColor="#FD660B"
            textColor="white"
          >
            SIGN UP
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
