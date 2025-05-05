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
  Heading,
  Divider,
} from "@chakra-ui/react";
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUsPage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box bg="gray.50" minH="100vh" py={10} px={{ base: 4, md: 20 }}>
      {/* Header Section */}
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
          Contact Us
        </Heading>
        <Text
          fontSize="lg"
          color="gray.700"
          textAlign="center"
          maxW="800px"
          mx="auto"
        >
          Have questions or feedback? We're here to help! Reach out to us using
          the form below or through our contact details. We’d love to hear from
          you!
        </Text>
      </Box>

      {/* Divider */}
      <Divider borderColor="orange.300" my={10} />

      {/* Contact Details Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={10}
        mb={16}
      >
        {/* Left Section */}
        <VStack align="start" spacing={6} flex="1">
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="orange.500"
          >
            Get in Touch
          </Text>
          <Text fontSize="md" color="gray.600">
            Fill out the form or contact us directly using the details below.
          </Text>
          <VStack align="start" spacing={4}>
            <HStack>
              <Icon as={FaPhone} color="orange.500" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                0XX-XXX-YYYY <br /> 09XX-XXX-YYYY
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaFax} color="orange.500" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                09XX-XXX-YYYY
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaEnvelope} color="orange.500" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                marcuscuyko@su.edu.ph
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaMapMarkerAlt} color="orange.500" boxSize={5} />
              <Text fontSize="md" color="gray.700">
                Somewhere Street, Some City
              </Text>
            </HStack>
          </VStack>
        </VStack>

        {/* Right Section - Submit Ticket Box */}
        <Box
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="2xl"
          maxW="600px"
          flex="1"
        >
          <Heading
            as="h2"
            size="lg"
            textAlign="center"
            mb={6}
            color="orange.500"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
          >
            Submit a Ticket
          </Heading>
          <VStack spacing={4}>
            <Input
              focusBorderColor="orange.500"
              placeholder="Enter your Name"
              bg="gray.50"
            />
            <Input
              focusBorderColor="orange.500"
              placeholder="Enter a valid e-mail address"
              bg="gray.50"
            />
            <Textarea
              focusBorderColor="orange.500"
              placeholder="Enter your message"
              bg="gray.50"
            />
            <Button
              bg="orange.500"
              color="white"
              _hover={{ bg: "orange.600" }}
              width="100%"
            >
              SUBMIT
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactUsPage;
