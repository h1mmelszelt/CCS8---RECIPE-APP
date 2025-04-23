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
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, BellIcon, AddIcon } from "@chakra-ui/icons";
import { FiHome, FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

function Navbar({ transparent }) {
  const location = useLocation(); // Get the current route

  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        px={{ base: 4, md: 6 }}
        py={4}
        boxShadow={transparent ? "none" : "md"} // Conditional boxShadow
        position="sticky"
        top="0"
        zIndex="999"
        bg={transparent ? "transparent" : "white"} // Conditional background
      >
        <Flex alignItems="center" justifyContent="space-between" width="100%">
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

          <InputGroup ml="800px" maxW="500px" position="absolute" right="300px">
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

          <Flex gap={1.5} position="absolute" right="100px">
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

          <Menu>
            <MenuButton
              mr="2"
              as={Button}
              _active={{ bg: "white" }}
              bg="transparent"
              colorScheme="gray"
              position="absolute"
              right="15px"
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
              <Button
                as={Link}
                to="/settings"
                color="black"
                _hover={{ bg: "#EAEAEA" }}
                width="100%"
              >
                Settings
              </Button>
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
