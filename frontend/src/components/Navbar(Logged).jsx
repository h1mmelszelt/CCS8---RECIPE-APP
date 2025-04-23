import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon, AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FiUser, FiHome } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

function Navbar() {
  const location = useLocation(); // Get the current route

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
          <Link to="/">
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
          {/* Action Icons */}
          <Flex gap={4} alignItems="center" justify="flex-end" flex="1">
            {/* Search Bar */}
            <InputGroup maxW="400px" display={{ base: "none", md: "flex" }}>
              <InputRightElement pointerEvents="none">
                <SearchIcon color="#FD660B" boxSize={5} />
              </InputRightElement>
              <Input
                type="text"
                placeholder="Search recipes..."
                borderRadius="15px"
                bg="#E6E6E6"
              />
            </InputGroup>

            {/* Create Icon */}
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

            {/* Notifications Icon */}
            <IconButton
              icon={<BellIcon boxSize={6} />}
              aria-label="Notifications"
              variant="ghost"
              color="#FD660B"
              _hover={{ bg: "#FFF1E8" }}
              size="md"
            />

            {/* User Profile Icon */}
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

            {/* Menu */}
            <Menu>
              <MenuButton
                as={Button}
                _active={{ bg: "white" }}
                bg="transparent"
                colorScheme="gray"
              >
                <HamburgerIcon boxSize={9} color="#FD660B" />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Button
                    as={Link}
                    to="/"
                    color="black"
                    _hover={{ bg: "#EAEAEA" }}
                    width="100%"
                  >
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    as={Link}
                    to="/settings"
                    color="black"
                    _hover={{ bg: "#EAEAEA" }}
                    width="100%"
                  >
                    Settings
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    as={Link}
                    to="/"
                    color="black"
                    _hover={{ bg: "#EAEAEA" }}
                    width="100%"
                  >
                    Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

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
        <Link to="/explore">
          <Flex direction="column" align="center">
            <IconButton
              icon={<SearchIcon boxSize={6} />}
              aria-label="Search"
              variant="ghost"
              color={location.pathname === "/explore" ? "#FD660B" : "black"} // Highlight if on /explore
              _hover={{ bg: "#FFF1E8" }}
              size="sm"
            />
            <Box
              fontSize="sm"
              color={location.pathname === "/explore" ? "#FD660B" : "black"}
              mt={1}
            >
              Search
            </Box>
          </Flex>
        </Link>

        {/* Create Icon */}
        <Link to="/create">
          <Flex direction="column" align="center">
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
          <Flex direction="column" align="center">
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
              Inbox
            </Box>
          </Flex>
        </Link>

        {/* User Icon */}
        <Link to="/profile">
          <Flex direction="column" align="center">
            <IconButton
              icon={<FiUser size={20} />}
              aria-label="User Profile"
              variant="ghost"
              color={location.pathname === "/profile" ? "#FD660B" : "black"} // Highlight if on /profile
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
              Profile
            </Box>
          </Flex>
        </Link>
      </Box>
    </>
  );
}

export default Navbar;
