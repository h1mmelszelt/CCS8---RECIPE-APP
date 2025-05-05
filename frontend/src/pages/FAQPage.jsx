import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Heading,
  Divider,
} from "@chakra-ui/react";
import faqImage from "/images/FAQpic.png"; // Replace with your image path

const FAQPage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Is it free to use the site?",
      answer:
        "Yes! Creating an account, browsing recipes, bookmarking, and submitting your own recipes are all completely free.",
    },
    {
      question: "How do I save recipes I like?",
      answer:
        "You can bookmark recipes by clicking the 'Add to Bookmarks' button on any recipe page. Saved recipes will appear in your profile under 'My Bookmarks'.",
    },
    {
      question: "Can I delete a recipe I posted?",
      answer:
        "Yes. Go to your profile, find the recipe you want to delete, and click the 'Delete' option on the recipe card.",
    },
    {
      question: "How do I update my profile picture?",
      answer:
        "Go to your 'Settings' page, click on your current profile picture, and upload a new one.",
    },
    {
      question: "Will my created recipes be visible to everyone?",
      answer:
        "Yes, all published recipes are public and can be found by other users browsing or searching the site.",
    },
    {
      question: "Will my bookmarks be visible to everyone?",
      answer: "No, your bookmarks are private and only visible to you.",
    },
  ];

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
          Frequently Asked Questions
        </Heading>
        <Text
          fontSize="lg"
          color="gray.700"
          textAlign="center"
          maxW="800px"
          mx="auto"
        >
          Got questions? We’ve got answers! Below are some of the most commonly
          asked questions about our platform. If you don’t find what you’re
          looking for, feel free to reach out to us through our{" "}
          <Text
            as="a"
            href="/contact-us"
            color="orange.500"
            fontWeight="semibold"
          >
            Contact Page
          </Text>
          .
        </Text>
      </Box>

      {/* Divider */}
      <Divider borderColor="orange.300" my={10} />

      {/* FAQ Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={10}
      >
        {/* Left Section */}
        <Box flex="1">
          <Accordion allowToggle>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                borderBottom="1px solid"
                borderColor="gray.300"
              >
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "orange.100", color: "orange.600" }}
                    py={3}
                  >
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color="gray.600">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        {/* Right Section - Image */}
        <Box flex="1" textAlign="center">
          <Image
            src={faqImage}
            alt="FAQ"
            borderRadius="md"
            boxSize={{ base: "300px", md: "400px" }}
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FAQPage;
