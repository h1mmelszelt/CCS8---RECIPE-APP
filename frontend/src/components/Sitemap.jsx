import React, { useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import { AuthContext } from "../context/AuthContext";

function Sitemap() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  const handleShareRecipe = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  };

  const handleAccountLink = (path) => (e) => {
    e.preventDefault();
    if (!userId) {
      navigate("/login");
    } else {
      navigate(`/${path}/${userId}`);
    }
  };

  // Defensive: filter out any sitemap link with a malformed path (containing '/:') before rendering
  return (
    <Box bg="gray.200" py={10} px={{ base: 6, md: 20 }} color="black">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="start"
        gap={10}
      >
        {/* Logo and Description */}
        <VStack align="start" spacing={4} maxW="300px">
          <Text fontSize="2xl" fontWeight="bold">
            Bite
            <Text as="span" color="orange.500">
              Book
            </Text>
          </Text>
          <Text fontSize="sm" color="black.400">
            Discover thousands of delicious recipes, share your own creations,
            and explore a world of culinary inspiration. Join our community
            today!
          </Text>
        </VStack>

        {/* Quick Links */}
        <Flex direction="row" gap={20} mx="auto">
          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Explore
            </Text>
            {[
              { label: "Home", to: "/home" },
              { label: "Recipes", to: "/search" },
              { label: "Notifications", to: "/notifications" },
              { label: "Share Recipe", to: "/create" },
              { label: "Get Started", to: "/" },
            ].filter(link => link.to && !link.to.includes('/:') && !link.to.endsWith('/:')).map(link => (
              <RouterLink key={link.label} to={link.to}>
                <Text fontSize="sm" color="black.400" _hover={{ color: "orange.500" }}>
                  {link.label}
                </Text>
              </RouterLink>
            ))}
          </VStack>

          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Helpful links
            </Text>
            <RouterLink to="/faq">
              <Text
                fontSize="sm"
                color="black.400"
                _hover={{ color: "orange.500" }}
              >
                FAQ
              </Text>
            </RouterLink>
            <RouterLink to="/about-us">
              <Text
                fontSize="sm"
                color="black.400"
                _hover={{ color: "orange.500" }}
              >
                About Us
              </Text>
            </RouterLink>
            <RouterLink to="/contact-us">
              <Text
                fontSize="sm"
                color="black.400"
                _hover={{ color: "orange.500" }}
              >
                Contact
              </Text>
            </RouterLink>
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
            <Button bg="orange.500" color="white" _hover={{ bg: "orange.600" }}>
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
          <Link href="#" isExternal _hover={{ color: "orange.500" }}>
            <FaTiktok size={20} color="black" />
          </Link>
          <Link href="#" isExternal _hover={{ color: "orange.500" }}>
            <FaTwitter size={20} color="black" />
          </Link>
          <Link href="#" isExternal _hover={{ color: "orange.500" }}>
            <FaFacebook size={20} color="black" />
          </Link>
          <Link href="#" isExternal _hover={{ color: "orange.500" }}>
            <FaInstagram size={20} color="black" />
          </Link>
          <Link href="#" isExternal _hover={{ color: "orange.500" }}>
            <FaPinterest size={20} color="black" />
          </Link>
          {/* Add Sitemap link here */}
          <RouterLink to="/site-map">
            <Text
              fontSize="sm"
              color="black.400"
              _hover={{ color: "orange.500" }}
            >
              Sitemap
            </Text>
          </RouterLink>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Sitemap;
