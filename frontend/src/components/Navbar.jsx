import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
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
import { FiUser, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the path if necessary

function Navbar({ transparent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to SearchPage with query
    }
  };

  const handleProtectedRoute = (path) => {
    if (!isAuthenticated && path !== "/home") {
      navigate("/login"); // Redirect to the login page for protected routes
    } else {
      navigate(path); // Navigate to the intended path
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
          display={{ base: "none", md: "flex" }} // Hide on smaller screens
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
            <Link to="/register">SIGN UP</Link>
          </Button>
        </Flex>

        {/* Hamburger Menu */}
        <Menu>
          <MenuButton
            ml="5"
            as={Button}
            _active={{ bg: "white" }}
            bg="transparent"
            colorScheme="gray"
            display={{ base: "none", md: "flex" }} // Show only on smaller screens
          >
            <HamburgerIcon boxSize={9} color="#FD660B" />
          </MenuButton>
          <MenuList bg="white" border="1px solid #E2E8F0" p={0}>
            {/* Home Menu Item */}
            <MenuItem
              onClick={() => handleProtectedRoute("/home")}
              color="black"
              _hover={{ bg: "#F9F9F9" }} // Slight hover effect
              fontWeight="semibold" // Semi-bold text
              fontSize="sm"
              py={3} // Consistent padding
            >
              Home
            </MenuItem>
            <Box borderBottom="1px solid #E2E8F0" /> {/* Gray line separator */}
            {/* About Us Menu Item */}
            <MenuItem
              as={Link}
              to="/about-us"
              color="black"
              _hover={{ bg: "#F9F9F9" }}
              fontWeight="semibold"
              fontSize="sm"
              py={3}
            >
              About Us
            </MenuItem>
            <Box borderBottom="1px solid #E2E8F0" />
            {/* Contact Us Menu Item */}
            <MenuItem
              as={Link}
              to="/contact-us"
              color="black"
              _hover={{ bg: "#F9F9F9" }}
              fontWeight="semibold"
              fontSize="sm"
              py={3}
            >
              Contact Us
            </MenuItem>
            <Box borderBottom="1px solid #E2E8F0" />
            {/* Site Map Menu Item */}
            <MenuItem
              as={Link}
              to="/site-map"
              color="black"
              _hover={{ bg: "#F9F9F9" }}
              fontWeight="semibold"
              fontSize="sm"
              py={3}
            >
              Site Map
            </MenuItem>
            <Box borderBottom="1px solid #E2E8F0" />
            {/* FAQ Menu Item */}
            <MenuItem
              as={Link}
              to="/faq"
              color="black"
              _hover={{ bg: "#F9F9F9" }}
              fontWeight="semibold"
              fontSize="sm"
              py={3}
            >
              FAQ
            </MenuItem>
            <Box borderBottom="1px solid #E2E8F0" />
            {/* Settings Menu Item */}
            <MenuItem
              as={Link}
              to="/settings"
              color="black"
              _hover={{ bg: "#F9F9F9" }}
              fontWeight="semibold"
              fontSize="sm"
              py={3}
            >
              Settings
            </MenuItem>
            <Box borderBottom="1px solid #E2E8F0" />
          </MenuList>
        </Menu>
      </Flex>

      {/* AlertDialog for "Please Sign In" */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Please Sign In
            </AlertDialogHeader>
            <AlertDialogBody>
              You need to sign in to access your profile.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Navbar for smaller screens */}
      <Box
        display={{ base: "flex", md: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        boxShadow="md"
        zIndex="999"
        justifyContent="space-around"
        alignItems="center"
        borderTop="2px solid #caced4"
        py={2}
      >
        {/* Home Icon */}
        <Link to="/home">
          <Flex direction="column" align="center">
            <IconButton
              icon={<FiHome size={30} />}
              aria-label="Home"
              variant="ghost"
              color={location.pathname === "/home" ? "#FD660B" : "black"} // Highlight if on /home
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
            />
            <Box
              fontSize="sm"
              color={location.pathname === "/home" ? "#FD660B" : "black"}
              mt={1}
            >
              Home
            </Box>
          </Flex>
        </Link>

        {/* Search Icon */}
        <Link to="/search">
          <Flex direction="column" align="center">
            <IconButton
              icon={<SearchIcon boxSize={6} />}
              aria-label="Search"
              variant="ghost"
              color={location.pathname === "/search" ? "#FD660B" : "black"} // Highlight if on /explore
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
            />
            <Box
              fontSize="sm"
              color={location.pathname === "/search" ? "#FD660B" : "black"}
              mt={1}
            >
              Search
            </Box>
          </Flex>
        </Link>

        {/* Create Icon */}
        <Link to="/create">
          <Flex
            direction="column"
            align="center"
            onClick={() => handleProtectedRoute("/create")}
          >
            <IconButton
              icon={<AddIcon boxSize={4} />}
              aria-label="Create"
              bg="white"
              color={location.pathname === "/create" ? "#FD660B" : "black"} // Highlight if on /create
              border="2px solid"
              borderColor={
                location.pathname === "/create" ? "#FD660B" : "black"
              }
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
            />
            <Box
              fontSize="sm"
              color={location.pathname === "/create" ? "#FD660B" : "black"}
              mt={1}
            >
              Create
            </Box>
          </Flex>
        </Link>

        {/* Notification Icon */}
        <Link to="/notifications">
          <Flex
            direction="column"
            align="center"
            onClick={() => handleProtectedRoute("/notifications")}
          >
            <IconButton
              icon={<BellIcon boxSize={8} />}
              aria-label="Notifications"
              variant="ghost"
              color={
                location.pathname === "/notifications" ? "#FD660B" : "black"
              } // Highlight if on /notifications
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
            />
            <Box
              fontSize="sm"
              color={
                location.pathname === "/notifications" ? "#FD660B" : "black"
              }
              mt={1}
            >
              Updates
            </Box>
          </Flex>
        </Link>

        {/* User Icon */}
        <Link to="/me">
          <Flex
            direction="column"
            align="center"
            onClick={() => handleProtectedRoute("/me")}
          >
            <IconButton
              icon={<FiUser size={20} />}
              aria-label="User Profile"
              variant="ghost"
              color={location.pathname === "/me" ? "#FD660B" : "black"} // Highlight if on /profile
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
              borderRadius="full"
              border="2px solid"
              borderColor={
                location.pathname === "/profile" ? "#FD660B" : "black"
              }
            />
            <Box
              fontSize="sm"
              color={location.pathname === "/profile" ? "#FD660B" : "black"}
              mt={1}
            >
              Me
            </Box>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
}

export default Navbar;
