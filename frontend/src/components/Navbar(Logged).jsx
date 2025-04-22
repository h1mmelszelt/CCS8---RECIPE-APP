import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, BellIcon, AddIcon } from "@chakra-ui/icons";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box
      px={{ base: 4, md: 6 }}
      py={4}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="999"
      bg="white"
    >
      {/* Top row: logo, search (desktop), icons */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
        gap={4}
        direction={{ base: "column", md: "row" }}
      >
        {/* Logo */}
        <Link to="/">
          <Text fontSize={{ base: "22px", sm: "28px" }} fontWeight="bold">
            <Text as="span" color="black">
              Insane
            </Text>
            <Text as="span" color="#FD660B">
              Recipe
            </Text>
          </Text>
        </Link>

        {/* Search bar for desktop only */}
        <Box display={{ base: "none", md: "block" }} w={{ md: "400px" }}>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <SearchIcon color="#FD660B" boxSize={5} />
            </InputRightElement>
            <Input
              type="text"
              placeholder="Search recipes..."
              borderRadius="15px"
              bg="#E6E6E6"
              w="100%"
            />
          </InputGroup>
        </Box>

        {/* Action Icons */}
        <Flex
          gap={2}
          alignItems="center"
          justify={{ base: "center", md: "flex-end" }}
        >
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

          <IconButton
            icon={<BellIcon boxSize={6} />}
            aria-label="Notifications"
            variant="ghost"
            color="#FD660B"
            _hover={{ bg: "#FFF1E8" }}
            size="md"
          />

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

          <Menu>
            <MenuButton as={Button} variant="ghost" p={0}>
              <HamburgerIcon boxSize={8} color="#FD660B" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Mobile search bar - visible only on small screens */}
      <Box mt={3} display={{ base: "block", md: "none" }} w="100%">
        <InputGroup>
          <InputRightElement pointerEvents="none">
            <SearchIcon color="#FD660B" boxSize={5} />
          </InputRightElement>
          <Input
            type="text"
            placeholder="Search recipes..."
            borderRadius="15px"
            bg="#E6E6E6"
            w="100%"
          />
        </InputGroup>
      </Box>
    </Box>
  );
}

export default Navbar;
