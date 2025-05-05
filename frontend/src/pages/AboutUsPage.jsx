import {
  Box,
  Text,
  Flex,
  VStack,
  Image,
  Heading,
  Link,
  Icon,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Rach Bongo",
      role: "Recipe Curator",
      description:
        "Rach is passionate about discovering and sharing unique recipes from around the world.",
      image: "/images/alice.jpg", // Replace with actual image path
      links: {
        facebook: "https://facebook.com/rachbongo",
        twitter: "https://twitter.com/rachbongo",
        instagram: "https://instagram.com/rachbongo",
      },
    },
    {
      name: "Fabio Hascoet",
      role: "Community Manager",
      description:
        "Fabio ensures our community stays engaged and connected through exciting events and updates.",
      image: "/images/bob.jpg", // Replace with actual image path
      links: {
        facebook: "https://facebook.com/fabiohascoet",
        twitter: "https://twitter.com/fabiohascoet",
        instagram: "https://instagram.com/fabiohascoet",
      },
    },
    {
      name: "Marcus Suyko",
      role: "Lead Developer",
      description:
        "Marcus is the tech wizard behind the scenes, making sure everything runs smoothly.",
      image: "/images/charlie.jpg", // Replace with actual image path
      links: {
        facebook: "https://facebook.com/marcussuyko",
        twitter: "https://twitter.com/marcussuyko",
        instagram: "https://instagram.com/marcussuyko",
      },
    },
  ];

  return (
    <Box bg="gray.100" minH="100vh" py={10} px={{ base: 4, md: 20 }}>
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb={10}
        color="orange.500"
        fontWeight="bold"
      >
        Meet the Team
      </Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        gap={10}
        wrap="wrap"
      >
        {teamMembers.map((member, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            p={8} // Increased padding for larger cards
            textAlign="center"
            maxW="400px" // Increased card width
          >
            <Image
              src={member.image}
              alt={member.name}
              borderRadius="full"
              boxSize="200px" // Increased image size
              mx="auto"
              mb={6} // Increased margin below the image
            />
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {member.name}
            </Text>
            <Text fontSize="lg" color="orange.500" mb={4}>
              {member.role}
            </Text>
            <Text fontSize="md" color="gray.600" mb={6}>
              {member.description}
            </Text>
            <Flex justify="center" gap={4}>
              <Link href={member.links.facebook} isExternal>
                <Icon as={FaFacebook} boxSize={6} color="blue.600" />
              </Link>
              <Link href={member.links.twitter} isExternal>
                <Icon as={FaTwitter} boxSize={6} color="blue.400" />
              </Link>
              <Link href={member.links.instagram} isExternal>
                <Icon as={FaInstagram} boxSize={6} color="pink.500" />
              </Link>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AboutUsPage;
