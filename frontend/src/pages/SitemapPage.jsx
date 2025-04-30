import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Link,
  Heading,
  Divider,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const sitemapLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/home" },
      { label: "Recipes", href: "/search" },
      { label: "Share Recipe", href: "/create" },
      { label: "Get Started", href: "/" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
  {
    heading: "Helpful links",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      { label: "Site Map", href: "/site-map" },
    ],
  },
  {
    heading: "Account",
    links: [
        
      { label: "My Profile", href: "/me" },
      { label: "Settings", href: "/settings" },
      { label: "Advanced Settings", href: "/advanced-settings" },
      { label: "Notification Settings", href: "/notification-settings" },
      
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
  {
    heading: "Categories",
    links: [
      { label: "Filipino", href: "/search?filter=filipino" },
      { label: "Desserts", href: "/search?filter=desserts" },
      { label: "Healthy", href: "/search?filter=healthy" },
      { label: "Quick & Easy", href: "/search?filter=quick-easy" },
      { label: "All Categories", href: "/search" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <Box bg="gray.100" minH="100vh" py={12} px={{ base: 4, md: 20 }}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Site Map
      </Heading>
      <Divider mb={8} />
      <Flex
        wrap="wrap"
        justify="center"
        gap={{ base: 8, md: 20 }}
        align="flex-start"
      >
        {sitemapLinks.map((section) => (
          <VStack align="start" spacing={2} key={section.heading} minW="180px">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {section.heading}
            </Text>
            {section.links
              .filter((link, idx, arr) =>
                arr.findIndex(l => l.href === link.href) === idx
              )
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  fontSize="md"
                  color="black.600"
                  _hover={{ color: "orange.500", textDecoration: "underline" }}
                >
                  {link.label}
                </Link>
              ))}
          </VStack>
        ))}
      </Flex>
      <Divider my={10} />
      <Flex
        justify="space-between"
        align="center"
        mt={10}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <VStack align="start" spacing={4} maxW="300px">
                  <Text fontSize="2xl" fontWeight="bold">
                    Insane
                    <Text as="span" color="orange.500">
                      Recipe
                    </Text>
                  </Text>
                  <Text fontSize="sm" color="black.400">
                  Discover thousands of delicious recipes, share your own creations, and
                  explore a world of culinary inspiration. Join our community today!
                  </Text>
                </VStack>

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
                        <Divider my={6} borderColor="black.400" />
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