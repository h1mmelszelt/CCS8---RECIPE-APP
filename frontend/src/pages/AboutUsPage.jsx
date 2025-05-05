import {
  Box,
  Text,
  Flex,
  VStack,
  Image,
  Heading,
  Link,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const teamMembers = [
    {
      name: "Rach Bongo",
      role: "Backend Developer",
      description:
        "In this project, I worked as the Backend Developer —building the database schema, developing API endpoints, and creating pages as well as UI components like navbars, recipe cards, and the sitemap. I also contributed to UI/UX design and ensured smooth integration between the frontend and backend.",
      image: "/images/rach.jpg",
      links: {
        facebook: "https://facebook.com/ramzrach",
        github: "https://github.com/racky918",
        instagram: "https://instagram.com/rxcky0_",
      },
    },
    {
      name: "Fabio Hascoet",
      role: "Community Manager",
      description:
        "Fabio ensures our community stays engaged and connected through exciting events and updates.",
      image: "/images/bob.jpg",
      links: {
        facebook: "https://facebook.com/fabiohascoet",
        github: "https://github.com/fabiohascoet",
        instagram: "https://instagram.com/fabiohascoet",
      },
    },
    {
      name: "Marcus Suyko",
      role: "Support Developer",
      description: "i fix stuff.",
      image: "/images/mrcs.jpg", // Replace with actual image path
      links: {
        facebook: "https://facebook.com/marcussuyko",
        github: "https://github.com/marcussuyko",
        instagram: "https://instagram.com/marcussuyko",
      },
    },
  ];

  return (
    <Box bg="gray.50" minH="100vh" py={10} px={{ base: 4, md: 20 }}>
      {/* About the Site Section */}
      <Box mb={16}>
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          mb={6}
          color="orange.500"
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
        >
          Welcome to BiteBook
        </Heading>
        <Text
          fontSize="lg"
          color="gray.700"
          textAlign="center"
          maxW="800px"
          mx="auto"
        >
          BiteBook is your go-to platform for discovering, sharing, and enjoying
          recipes from around the world. Whether you're a home cook or a
          professional chef, BiteBook is here to inspire your culinary journey.
          Explore recipes, connect with food enthusiasts, and share your
          creations with our vibrant community.
        </Text>
      </Box>

      {/* Divider */}
      <Divider borderColor="orange.300" my={10} />

      {/* Meet the Team Section */}
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb={10}
        color="orange.500"
        fontWeight="bold"
        fontFamily="Poppins, sans-serif"
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
            p={8}
            border={"1px solid#d19c79"}
            textAlign="center"
            maxW="400px"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.01)" }}
          >
            <Image
              src={member.image}
              alt={member.name}
              borderRadius="full"
              boxSize="200px"
              mx="auto"
              mb={6}
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
              <Link href={member.links.github} isExternal>
                <Icon as={FaGithub} boxSize={6} color="gray.800" />
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
