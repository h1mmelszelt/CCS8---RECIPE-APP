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
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Navbar({ transparent }) {
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
  );
}

export default Navbar;
