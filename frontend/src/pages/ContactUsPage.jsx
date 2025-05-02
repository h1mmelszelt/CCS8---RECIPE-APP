import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Icon,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import phone from "/images/phone by iStock.jpg";

const ContactUsPage = () => {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); 

  return (
    <Box bg="white" minH="100vh">
      <Box px={{ base: 4, md: 20 }} py={10}>
        {/* Header Section */}
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="light"
          textAlign="left"
          mb={2}
        >
          CONTACT US
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={10}
          mt={8}
        >
          {/* Left Section */}
          <VStack align="start" spacing={6} flex="1">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="grey.600"
            >
              Send us{" "}
              <Text as="span" color="#97C33A">
                Feedback
              </Text>
            </Text>
            <Text fontSize="md" color="gray.600">
              Fill out the ticket form and our support team will address any of
              your concerns or questions about InsaneRecipe.
            </Text>
            <Text fontSize="md" color="gray.600">
              Or you can get in touch with us through our contact details below:
            </Text>
          </VStack>

          {/* Right Section */}
          <Box
            flex="1"
            ml={{ base: 0, md: 300 }}
            display={{ base: "none", md: "block" }}
            alignSelf="flex-start"
          >
            <Image
              src={phone}
              objectFit="cover"
              alt="Contact Us"
              borderRadius="md"
              boxSize={{ base: "500px", md: "700px" }}
              clipPath="polygon(37% 12%, 45% 11%, 53% 12%, 58% 15%, 62% 20%, 67% 24%, 72% 27%, 76% 33%, 77% 40%, 76% 47%, 73% 54%, 73% 62%, 74% 69%, 72% 75%, 68% 81%, 61% 84%, 51% 85%, 43% 84%, 30% 89%, 18% 90%, 8% 87%, 1% 79%, 1% 69%, 4% 60%, 3% 51%, 0 43%, 0 31%, 5% 24%, 12% 18%, 21% 16%, 30% 15%)"
            />
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="start"
          justify="space-between"
          gap={10}
          mt={10}
        >
          {/* Lower Left Section */}
          <VStack align="start" spacing={4} flex="1">
            <HStack>
              <Icon as={FaPhone} color="#97C33A" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                0XX-XXX-YYYY <br /> 09XX-XXX-YYYY
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaFax} color="#97C33A" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                09XX-XXX-YYYY
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaEnvelope} color="#97C33A" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                marcuscuyko@su.edu.ph
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaMapMarkerAlt} color="#97C33A" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                Somewhere Street, Some City
              </Text>
            </HStack>
          </VStack>

          {/* Mobile-Only Image */}
          <Box
            display={{ base: "block", md: "none" }}
            alignSelf="self-end"
            my={6}
          >
            <Image
              src={phone}
              objectFit="cover"
              alt="Contact Us"
              borderRadius="md"
              boxSize="300px"
              clipPath="polygon(37% 12%, 45% 11%, 53% 12%, 58% 15%, 62% 20%, 67% 24%, 72% 27%, 76% 33%, 77% 40%, 76% 47%, 73% 54%, 73% 62%, 74% 69%, 72% 75%, 68% 81%, 61% 84%, 51% 85%, 43% 84%, 30% 89%, 18% 90%, 8% 87%, 1% 79%, 1% 69%, 4% 60%, 3% 51%, 0 43%, 0 31%, 5% 24%, 12% 18%, 21% 16%, 30% 15%)"
            />
          </Box>

          {/* Lower Right Section */}
          <Box
            flex="1"
            bg="gray.100"
            p={6}
            borderRadius="md"
            boxShadow="md"
            w={{ base: "100%", md: "auto" }}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Submit a Ticket
            </Text>
            <VStack spacing={4}>
              <Input placeholder="Enter your Name" bg="white" />
              <Input placeholder="Enter a valid e-mail address" bg="white" />
              <Textarea placeholder="Enter your message" bg="white" />
              <Button
                bg="orange.500"
                color="white"
                _hover={{ bg: "orange.600" }}
                width={{ base: "100%", md: "25%" }}
              >
                SUBMIT
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
