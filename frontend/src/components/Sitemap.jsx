import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Input,
  Button,
  Link,
  HStack,
  Divider,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";

function Sitemap() {
  return (
    <Box bg="gray.300" py={10} px={{ base: 6, md: 20 }} color="black">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="start"
        gap={10}
      >
        {/* Logo and Description */}
        <VStack align="start" spacing={4} maxW="300px">
          <Text fontSize="2xl" fontWeight="bold">
            Insane
            <Text as="span" color="orange.500">
              Recipe
            </Text>
          </Text>
          <Text fontSize="sm" color="black.400">
            The purpose of lorem ipsum is to create a natural looking block of
            text (sentence, paragraph, page, etc.) that doesn’t distract from
            the layout.
          </Text>
        </VStack>

        {/* Quick Links */}
        <Flex direction="row" gap={10}>
          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Quick links
            </Text>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Home
            </Link>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Recipes
            </Link>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Blog
            </Link>
          </VStack>

          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Quick links
            </Text>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Share Recipe
            </Link>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              About Us
            </Link>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Contact
            </Link>
          </VStack>

          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Legal
            </Text>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Terms Of Use
            </Link>
            <Link
              href="#"
              fontSize="sm"
              color="black.400"
              _hover={{ color: "white" }}
            >
              Privacy & Cookies
            </Link>
          </VStack>
        </Flex>

        {/* Newsletter */}
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Newsletter
          </Text>
          <Text fontSize="sm" color="black.400">
            Subscribe to our newsletter to get more free tips
          </Text>
          <Flex as="form" gap={2} w="100%">
            <Input
              type="email"
              placeholder="Enter Your Email"
              bg="black.700"
              borderRadius="md"
              _placeholder={{ color: "black.400" }}
              color="white"
            />
            <Button bg="red.500" color="white" _hover={{ bg: "red.600" }}>
              Subscribe
            </Button>
          </Flex>
        </VStack>
      </Flex>

      {/* Divider */}
      <Divider my={6} borderColor="black.400" />

      {/* Footer */}
      <Flex
        justify="space-between"
        align="center"
        mt={10}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Text fontSize="sm" color="black.400">
          © 2023 RecipeLogo. All Right Reserved
        </Text>
        <HStack spacing={4}>
          <Link href="#" isExternal>
            <FaTiktok size={20} color="black" />
          </Link>
          <Link href="#" isExternal>
            <FaTwitter size={20} color="black" />
          </Link>
          <Link href="#" isExternal>
            <FaFacebook size={20} color="black" />
          </Link>
          <Link href="#" isExternal>
            <FaInstagram size={20} color="black" />
          </Link>
          <Link href="#" isExternal>
            <FaPinterest size={20} color="black" />
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Sitemap;
