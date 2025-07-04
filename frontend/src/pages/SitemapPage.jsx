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
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function SitemapPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId") || null;
  const handleAccountLink = (path) => (e) => {
    e.preventDefault();
    if (!userId) {
      navigate("/login");
    } else {
      navigate(`/${path}/${userId}`);
    }
  };
  const handleShareRecipe = (e) => {
    e.preventDefault();
    if (!userId) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  };
  // Defensive: never allow malformed dynamic routes in any navigation or link
  // (SitemapPage) - All links must be valid
  const isValidPath = (path) => path && !path.includes('/:') && !path.endsWith('/:');
  const sitemapLinks = [
    {
      heading: "Explore",
      links: [
        { label: "Home", to: "/home" },
        { label: "Recipes", to: "/search" },
        { label: "Notifications", to: "/notifications", isAccount: true, path: "notifications" },
        { label: "Share Recipe", to: "/create" },
        { label: "Get Started", to: "/" },
      ],
    },
    {
      heading: "Helpful links",
      links: [
        { label: "FAQ", to: "/faq" },
        { label: "About Us", to: "/about-us" },
        { label: "Contact", to: "/contact-us" },
        { label: "Site Map", to: "/site-map" },
      ],
    },
    {
      heading: "Account",
      links: [
        { label: "My Profile", to: userId ? `/profile/${userId}` : "/login" },
        { label: "Settings", to: userId ? `/settings/${userId}` : "/login", isAccount: true, path: "settings" },
        { label: "Advanced Settings", to: userId ? `/advanced-settings/${userId}` : "/login", isAccount: true, path: "advanced-settings" },
        { label: "Notification Settings", to: userId ? `/notification-settings/${userId}` : "/login", isAccount: true, path: "notification-settings" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ],
    },
    {
      heading: "Categories",
      links: [
        { label: "Filipino", to: "/search?filter=filipino" },
        { label: "Desserts", to: "/search?filter=desserts" },
        { label: "Healthy", to: "/search?filter=healthy" },
        { label: "Quick & Easy", to: "/search?filter=quick-easy" },
        { label: "All Categories", to: "/search" },
      ],
    },
  ];
  // Ensure all links in sitemapLinks are validated
  const validatedSitemapLinks = sitemapLinks.map(section => ({
    ...section,
    links: section.links.filter(link => isValidPath(link.to))
  }));

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
        {validatedSitemapLinks.map((section) => (
          <VStack align="start" spacing={2} key={section.heading} minW="180px">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {section.heading}
            </Text>
            {section.links
              .filter((link, idx, arr) => {
                // Always show Login button in Account section
                if (section.heading === "Account" && link.label === "Login") return true;
                // Filter out malformed links (containing '/:' or ending with '/:')
                return arr.findIndex(l => l.to === link.to) === idx && isValidPath(link.to);
              })
              .map((link) => (
                link.isAccount ? (
                  <a
                    key={link.label}
                    href={link.to}
                    style={{
                      fontSize: "1rem",
                      color: "#222",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      cursor: "pointer"
                    }}
                    onClick={handleAccountLink(link.path)}
                    onMouseOver={e => (e.currentTarget.style.color = "orange")}
                    onMouseOut={e => (e.currentTarget.style.color = "#222")}
                  >
                    {link.label}
                  </a>
                ) : link.label === "Share Recipe" ? (
                  <a
                    key={link.label}
                    href={link.to}
                    style={{
                      fontSize: "1rem",
                      color: "#222",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      cursor: "pointer"
                    }}
                    onClick={handleShareRecipe}
                    onMouseOver={e => (e.currentTarget.style.color = "orange")}
                    onMouseOut={e => (e.currentTarget.style.color = "#222")}
                  >
                    {link.label}
                  </a>
                ) : (
                  <RouterLink
                    key={link.label}
                    to={link.to}
                    style={{
                      fontSize: "1rem",
                      color: "#222",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = "orange")}
                    onMouseOut={e => (e.currentTarget.style.color = "#222")}
                  >
                    {link.label}
                  </RouterLink>
                )
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
      {/* Defensive: filter out any malformed links in the footer */}
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
          {[{ label: "Sitemap", to: "/site-map" }]
            .filter(link => link.to && !link.to.includes('/:') && !link.to.endsWith('/:'))
            .map(link => (
              <RouterLink key={link.label} to={link.to}>
                <Text fontSize="sm" color="black.400" _hover={{ color: "orange.500" }}>
                  {link.label}
                </Text>
              </RouterLink>
            ))}
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