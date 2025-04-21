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
    <Box px={6} py={4} boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between" width="100%">
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
        <InputGroup ml="800px" maxW="500px" position="absolute" right="300px">
          <InputRightElement pointerEvents="none">
            <SearchIcon color="#FD660B" boxSize={6} />
          </InputRightElement>
          <Input
            type="text"
            placeholder="Search recipes..."
            borderRadius="15px"
            bg="#E6E6E6"
          />
        </InputGroup>

        {/* Action Buttons */}
        <Flex gap={1} position="absolute" right="100px">
          <IconButton
            icon={<AddIcon boxSize={5} />}
            aria-label="Create"
            bg="white"
            color="#FD660B"
            border="3px solid"
            borderColor="#FD660B"
            _hover={{ bg: "#FFF1E8" }}
            size="sm"
          />

          <IconButton
            icon={<BellIcon boxSize={7} />}
            aria-label="Notifications"
            variant="ghost"
            color="#FD660B"
            _hover={{ bg: "#FFF1E8" }}
            size="md"
          />

          <IconButton
            icon={<FiUser size={25} boxSize={1} />}
            aria-label="User Profile"
            variant="ghost"
            color="black"
            _hover={{ bg: "#FFF1E8" }}
            size="sm"
            borderRadius="full"
            border="3px solid"
            borderColor="black"
          />
        </Flex>

        {/* Hamburger Menu */}
        <Menu>
          <MenuButton
            mr="15"
            as={Button}
            colorScheme="gray"
            position="absolute"
            right="15px"
          >
            <HamburgerIcon boxSize={9} color="#FD660B" />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Navbar;
