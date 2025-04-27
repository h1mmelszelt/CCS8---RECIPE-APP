import React from "react";
import Navbar from "../components/Navbar";
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
} from "@chakra-ui/react";
import faqImage from "/images/chef asking VideoHive.jpg"; // Replace with your image path

const FAQPage = () => {
  const faqs = [
    {
      question: "Is it free to use the site?",
      answer:
        "Yes! Creating an account, browsing recipes, bookmarking, and submitting your own recipes are all completely free.",
    },
    {
      question: "How do I save recipes I like?",
      answer:
        "You can bookmark recipes by clicking the 'Save' icon on any recipe card. Saved recipes will appear in your profile under 'Bookmarks'.",
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
    <Box bg="white" minH="100vh">
      {/* Navbar */}
      <Navbar transparent={false} />

      {/* Header Section */}
      <Box px={{ base: 4, md: 20 }} py={10}>
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={10}>
          {/* Left Section */}
          <VStack align="start" spacing={4} flex="1">
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="light">
              FREQUENTLY ASKED QUESTIONS
            </Text>
            <Text
              mt={5}
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.600"
            >
              Got a{" "}
              <Text as="span" color="#97C33A">
                Question?
              </Text>
            </Text>
            <Text fontSize="md" color="gray.600">
              We're here to answer! Below are our frequently asked questions. If
              you don't see your question here, please submit a ticket through
              our{" "}
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
          </VStack>

          {/* Right Section - Image */}
          <Box 
            flex="1"
            ml={{ base: 0, md: 10 } }
            display={{ base: "block", md: "block" }} >
            <Image
              src={faqImage}
              alt="FAQ"
              boxSize={{ base: "500px", md: "700px" }}
              objectFit="cover"
              objectPosition="80% center"
              clipPath="polygon(2% 22%, 0 38%, 0 61%, 4% 75%, 9% 86%, 17% 90%, 26% 93%, 35% 94%, 46% 93%, 56% 92%, 69% 89%, 79% 85%, 85% 80%, 90% 73%, 95% 62%, 95% 47%, 94% 33%, 90% 24%, 85% 17%, 74% 12%, 67% 9%, 53% 5%, 38% 2%, 25% 0, 15% 1%, 8% 7%, 5% 15%)"
            />
          </Box>
        </Flex>

        {/* FAQ Section */}
        <Box mt={{ base: 8, md: 12 }}>
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
      </Box>
    </Box>
  );
};

export default FAQPage;