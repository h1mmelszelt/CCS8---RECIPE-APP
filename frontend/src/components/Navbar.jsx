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
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Switch,
  Select, 
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, BellIcon, AddIcon } from "@chakra-ui/icons";
import { FiUser, FiHome } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the path if necessary

function Navbar({ transparent }) {

    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove userId from localStorage
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
    sessionStorage.removeItem("userId"); // Remove userId from sessionStorage
    
    const {
      isOpen: isDrawerOpen,
      onOpen: onDrawerOpen,
      onClose: onDrawerClose,
    } = useDisclosure();
    const {
      isOpen: isSettingsDrawerOpen,
      onOpen: onSettingsDrawerOpen,
      onClose: onSettingsDrawerClose,
    } = useDisclosure();
    const {
      isOpen: isAlertOpen,
      onOpen: onAlertOpen,
      onClose: onAlertClose,
    } = useDisclosure();

  const cancelRef = useRef();
  const btnRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId"); // Retrieve userId from storage
  
  const isValidPath = (path) => path && !path.includes('/:') && !path.endsWith('/:');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to SearchPage with query
    } else {
      navigate("/search"); // Show all recipes if query is blank
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

        {/* Drawer Trigger */}
        <IconButton
          ref={btnRef}
          icon={<HamburgerIcon boxSize={8}/>}
          aria-label="Open Menu"
          onClick={onDrawerOpen}
          display={{ base: "none", md: "flex" }}
          bg="transparent"
          color="#FD660B"
          _hover={{ bg: "gray.100" }}
          mr="4"
        />
      </Flex>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap={4}>
              <Link to="/home" onClick={onDrawerClose}>
                Home
              </Link>
              <Link to="/about-us" onClick={onDrawerClose}>
                About Us
              </Link>
              <Link to="/contact-us" onClick={onDrawerClose}>
                Contact Us
              </Link>
              <Link to="/site-map" onClick={onDrawerClose}>
                Site Map
              </Link>
              <Link to="/faq" onClick={onDrawerClose}>
                FAQ
              </Link>
              <Text
    onClick={onSettingsDrawerOpen} // Open the settings drawer on click
    cursor="pointer" // Make the text look clickable
    _hover={{ textDecoration: "underline" }} // Optional: Add hover effect
  >
    Settings
  </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Settings Drawer */}
      <Drawer
        isOpen={isSettingsDrawerOpen}
        placement="right"
        onClose={onSettingsDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
          <Flex direction="column" gap={6}>
        {/* Theme Dark Mode */}
        <Flex justify="space-between" align="center">
          <Text>Theme Dark Mode</Text>
          <Switch
            colorScheme="teal"
            size="lg"
            onChange={(e) => {
              // Handle dark mode toggle logic here
              const isDarkMode = e.target.checked;
              console.log("Dark Mode:", isDarkMode);
            }}
          />
        </Flex>
      </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>


      {/* AlertDialog for "Please Sign In" */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
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
              <Button ref={cancelRef} onClick={onAlertClose}>
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
        <Link to={userId ? `/profile/${userId}` : "/login"}>
          <Flex
            direction="column"
            align="center"
            onClick={() => handleProtectedRoute(userId ? `/profile/${userId}` : "/login")}
          >
            <IconButton
              icon={<FiUser size={20} />}
              aria-label="User Profile"
              variant="ghost"
              color={location.pathname.startsWith("/profile") || location.pathname === "/me" ? "#FD660B" : "black"}
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
              borderRadius="full"
              border="2px solid"
              borderColor={location.pathname.startsWith("/profile") || location.pathname === "/me" ? "#FD660B" : "black"}
            />
            <Box
              fontSize="sm"
              color={location.pathname.startsWith("/profile") || location.pathname === "/me" ? "#FD660B" : "black"}
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
