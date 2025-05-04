import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SignInRequired() {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.100"
      textAlign="center"
      pb={20}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Please Sign In
      </Text>
      <Text fontSize="lg" color="gray.600" mb={4}>
        You need to sign in to access this page.
      </Text>
      <Link to="/login">
        <Button colorScheme="orange">Go to Login</Button>
      </Link>
    </Box>
  );
}

export default SignInRequired;
