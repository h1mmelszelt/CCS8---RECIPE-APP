import React, { useState } from "react";
import Navbar from "../components/Navbar(Logged)";
import { Box, Flex } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard"; // Adjust path if needed

/*FOR YOUR PROFILE */
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("created");

  const tabs = [
    { key: "created", label: "Recipes Created" },
    { key: "bookmarks", label: "Bookmarks" },
    { key: "reviews", label: "Reviews" },
  ];

  return (
    <>
      <Navbar />

      <Flex justify="center" minH="100vh" pt="40px">
        <Box
          width="900px"
          height="700px"
          borderRadius="md"
          bg="transparent"
          overflow="hidden"
        >
          <Flex direction="column" height="100%">
            {/* Box 1: Top section */}
            <Box
              height="250px"
              bg="#FDE4CE"
              p={2}
              borderTopLeftRadius="md"
              borderTopRightRadius="md"
              border="1px solid #ED984D"
            >
              Top
            </Box>

            {/* Box 2: Middle tab section */}
            <Box height="50px" bg="white" p={1} border="1px solid #c5c5c5">
              <Flex height="100%">
                {/* Left group of 3 tabs */}
                <Flex flex="1" height="100%">
                  {tabs.map((tab, idx) => (
                    <Box
                      key={tab.key}
                      flex="1" //how far apart the 3 are
                      height="100%" // orange line tab is pushed to borderline
                      onClick={() => setActiveTab(tab.key)}
                      cursor="pointer"
                      borderRight={
                        idx !== tabs.length - 1 ? "0px solid #e0e0e0" : "none"
                      }
                      bg={activeTab === tab.key ? "white" : "transparent"}
                      color={activeTab === tab.key ? "orange" : "black"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="medium"
                      flexDirection="column"
                      transition="0.2s"
                      _hover={{ bg: "#ffe6d1" }} // 👈 Will now cover the full tab height
                    >
                      <Box>{tab.label}</Box>
                      {activeTab === tab.key && (
                        <Box
                          mt="0px"
                          height="3px"
                          width="80%"
                          bg="orange"
                          borderRadius="full"
                        />
                      )}
                    </Box>
                  ))}
                </Flex>

                {/* Right column (currently empty) */}
                <Box flex="1" textAlign="center"></Box>
              </Flex>
            </Box>

            {/* Box 3: Bottom section */}
            <Box
              height="600px"
              bg="white"
              p={2}
              border="1px solid #c5c5c5"
              borderBottomLeftRadius="md"
              borderBottomRightRadius="md"
            >
              {/* Optional: Render tab content here */}
              {activeTab === "created" && <Box>Created Recipes Content</Box>}
              {activeTab === "bookmarks" && <Box>Bookmarks Content</Box>}
              {activeTab === "reviews" && <Box>Reviews Content</Box>}
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Flex justify="center" minH="100vh" pt="40px">
        <Box>Site map goes here</Box>
      </Flex>
    </>
  );
};

export default ProfilePage;
