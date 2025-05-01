import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Avatar,
  Divider,
  Link as ChakraLink,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon, AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FiUser, FiHome } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationsPage from "../pages/NotificationsPage";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } =
  useDisclosure();
  // Logout function
  const handleLogout = () => {
    console.log("Logout triggered");
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update authentication state
    navigate("/login"); // Redirect to login page
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/search`); // Clear the query parameter if search is empty
    }
  };

  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Brigid Dawson",
      message: "liked your recipe",
      avatar: "/images/avatar1.jpg",
      time: "4 hours ago",
    },
    {
      id: 2,
      name: "John Dwyer",
      message: "liked your recipe",
      avatar: "/images/avatar2.jpg",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "Tim Hellman",
      message: "liked your recipe",
      avatar: "/images/avatar3.jpg",
      time: "Tuesday",
    },
    {
      id: 4,
      name: "Running low on storage space",
      message: "",
      avatar: "/images/storage-icon.png",
      time: "Monday",
    },
    {
      id: 5,
      name: "Shannon Shaw",
      message: "commented on your recipe",
      avatar: "/images/avatar4.jpg",
      time: "4 days ago",
    },
  ]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  // Toggle notification popup
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      {/* Navbar for larger screens */}
      <Box
        display={{ base: "none", md: "block" }}
        px={{ base: 4, md: 6 }}
        py={4}
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="999"
        bg="white"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          wrap="wrap"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          {/* Logo */}
          <Link to="/home">
            <Flex alignItems="center">
              <Box fontSize={{ base: "22px", sm: "28px" }} fontWeight="bold">
                <Box as="span" color="black">
                  Insane
                </Box>
                <Box as="span" color="#FD660B">
                  Recipe
                </Box>
              </Box>
            </Flex>
          </Link>

          {/* Action Icons */}

          <Flex gap={4} alignItems="center" justify="flex-end" flex="1">
            {/* Search Bar */}
            <InputGroup maxW="400px" display={{ base: "none", md: "flex" }}>
              <InputRightElement cursor="pointer">
                <SearchIcon
                  color="#FD660B"
                  boxSize={5}
                  onClick={() => handleSearch(searchQuery)}
                />
              </InputRightElement>
              <Input
                type="text"
                placeholder="Search recipes..."
                borderRadius="15px"
                bg="#E6E6E6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e.target.value);
                  }
                }}
              />
            </InputGroup>

            {/* Create Icon */}
            <Link to="/create">
              <IconButton
                icon={<AddIcon boxSize={4} />}
                aria-label="Create"
                bg="white"
                color="#FD660B"
                border="2px solid"
                borderColor="#FD660B"
                _hover={{ bg: "#FFF1E8" }}
                size="sm"
              />
            </Link>

            {/* Notifications Icon */}
            <Box position="relative">
              <IconButton
                icon={<BellIcon boxSize={6} color={"black"} />}
                aria-label="Notifications"
                variant="ghost"
                color="#FD660B"
                _hover={{ bg: "#FFF1E8" }}
                size="md"
                onClick={togglePopup}
              />
              {isPopupVisible && (
                <Box
                  position="absolute"
                  top="40px"
                  right="0"
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  borderColor={"gray.400"}
                  p={4}
                  zIndex="1000"
                  width="300px"
                >
                  <Text fontWeight="bold" mb={2}>
                    Notifications
                  </Text>
                  <Divider mb={4} />
                  <VStack align="start" spacing={4}>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <HStack
                          key={notification.id}
                          align="start"
                          spacing={3}
                          width="100%"
                        >
                          <Avatar
                            size="md"
                            src={notification.avatar}
                            name={notification.name}
                          />
                          <Box>
                            <Text fontWeight="bold" fontSize="sm" color="black">
                              {notification.name}{" "}
                              <Text
                                as="span"
                                fontWeight="normal"
                                color="gray.600"
                              >
                                {notification.message}
                              </Text>
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {notification.time}
                            </Text>
                          </Box>
                        </HStack>
                      ))
                    ) : (
                      <Text>No new notifications</Text>
                    )}
                  </VStack>
                  <Divider my={4} />
                  <ChakraLink
                    href="#"
                    fontSize="sm"
                    color="#FD660B"
                    fontWeight="bold"
                    textAlign="center"
                    display="block"
                  >
                    See all recent activity
                  </ChakraLink>
                </Box>
              )}
            </Box>

            {/* User Profile Icon */}
            <Link to={`/profile/${userId}`}>
              <IconButton
                icon={<FiUser size={20} />}
                aria-label="User Profile"
                variant="ghost"
                color="black"
                _hover={{ bg: "#FFF1E8" }}
                size="sm"
                borderRadius="full"
                border="2px solid"
                borderColor="black"
              />
            </Link>

            {/* Hamburger Icon for Drawer */} {/* Drawer Trigger */}
            <IconButton
              icon={<HamburgerIcon boxSize={8} />}
              aria-label="Open Menu"
              onClick={onDrawerOpen}
              bg="transparent"
              color="#FD660B"
              _hover={{ bg: "gray.100" }}
            />
          </Flex>
        </Flex>
      </Box>

                   {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
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
              <Link to={`/settings/${userId}`} onClick={onDrawerClose}>
                Settings
              </Link>
              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Navbar for smaller screens ------------------------------------------------*/}
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
          <Flex direction="column" align="center" justify="center">
            <IconButton
              icon={<FiHome size={30} />}
              aria-label="Home"
              variant="ghost"
              color={location.pathname === "/home" ? "#FD660B" : "black"}
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
          <Flex direction="column" align="center" justify="center">
            <IconButton
              icon={<SearchIcon boxSize={6} />}
              aria-label="Search"
              variant="ghost"
              color={location.pathname === "/search" ? "#FD660B" : "black"}
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
          <Flex direction="column" align="center" justify="center">
            <IconButton
              icon={<AddIcon boxSize={4} />}
              aria-label="Create"
              bg="white"
              color={location.pathname === "/create" ? "#FD660B" : "black"}
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
        {/* Notification Icon */}
        <Link to="/notifications">
          <Flex direction="column" align="center" justify="center">
            <IconButton
              icon={<BellIcon boxSize={8} />}
              aria-label="Notifications"
              variant="ghost"
              color={
                location.pathname === "/notifications" ? "#FD660B" : "black"
              }
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
          <Flex direction="column" align="center" justify="center">
            <IconButton
              icon={<FiUser size={20} />}
              aria-label="User Profile"
              variant="ghost"
              color={
                location.pathname === "/me" ||
                location.pathname === "/profile/:id" ||
                location.pathname === "/settings" ||
                location.pathname === "/notification-settings" ||
                location.pathname === "/advanced-settings"
                  ? "#FD660B"
                  : "black"
              }
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
              borderRadius="full"
              border="2px solid"
              borderColor={
                location.pathname === "/me" ||
                location.pathname === "/profile/:id" ||
                location.pathname === "/settings" ||
                location.pathname === "/notification-settings" ||
                location.pathname === "/advanced-settings"
                  ? "#FD660B"
                  : "black"
              }
            />
            <Box
              fontSize="sm"
              color={
                location.pathname === "/me" ||
                location.pathname === "/profile/:id" ||
                location.pathname === "/settings" ||
                location.pathname === "/notification-settings" ||
                location.pathname === "/advanced-settings"
                  ? "#FD660B"
                  : "black"
              }
              mt={1}
            >
              Me
            </Box>
          </Flex>
        </Link>
      </Box>
      {/* Notifications Page */}
      {isSmallScreen && isNotificationsOpen && (
        <NotificationsPage
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
