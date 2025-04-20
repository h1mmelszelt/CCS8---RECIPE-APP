import { Box, Flex, Text, Input, InputGroup, InputRightElement, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SearchIcon , HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <Box px={6} py={4} boxShadow="md" >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Link to="/">
          <Text
            fontSize={{ base: "22", sm: "28" }}
            fontWeight="bold"
          >
            <Text as="span" color="black">Insane</Text>
            <Text as="span" color="#FD660B">Recipe</Text>
          </Text>
        </Link>

        <InputGroup ml="800px" maxW="500px" position="absolute" right="300px">
          <InputRightElement pointerEvents="none">
            <SearchIcon 
                color="#FD660B" 
                boxSize={6}
            />
          </InputRightElement>
          <Input 
                type="text" 
                placeholder="Search recipes..." 
                borderRadius="15px"
                bg="#E6E6E6"
          />
        </InputGroup>

        <Flex gap={1.5} position="absolute" right="100px">
        <Button borderWidth="1px" borderColor="#CACACA" textColor="black">LOG IN</Button>
        <Button borderWidth="1px" bg="#FD660B" textColor="white">SIGN IN</Button>
        </Flex>

         <Menu>
          <MenuButton
            mr = "15"
            as={Button} 
            colorScheme="gray"
            position="absolute" right="15px"
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
