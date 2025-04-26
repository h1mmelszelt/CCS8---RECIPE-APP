import React from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function NotificationsPage({ notifications }) {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="white"
      zIndex="1000"
      p={4}
      overflowY="auto"
    >
      {/* Back Button */}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        onClick={() => navigate(-1)} // Navigate back to the previous page
        variant="ghost"
        size={"lg"}
        color="#FD660B"
      />
      <Text fontWeight="bold" mb={2} fontSize="lg" color="black">
        Notifications
      </Text>
      <Divider mb={3} borderColor="gray.400" />
      <VStack align="start" spacing={0}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <HStack
              key={notification.id}
              align="start"
              spacing={3}
              width="100%"
              p={3}
              _hover={{ bg: "gray.100" }}
            >
              <Avatar
                size="md"
                src={notification.avatar}
                name={notification.name}
              />
              <Box>
                <Text fontWeight="bold" fontSize="sm" color="black">
                  {notification.name}{" "}
                  <Text as="span" fontWeight="normal" color="gray.600">
                    {notification.message}
                  </Text>
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {notification.time}
                </Text>
              </Box>
            </HStack>
          ))
        ) : (
          <Text fontSize="sm" color="gray.600">
            No new notifications
          </Text>
        )}
        {/* End of Notifications Message */}
        {notifications.length > 0 && (
          <>
            <Divider my={3} borderColor="gray.400" />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              mt={3}
            >
              <Text fontSize="sm" color="gray.600">
                End of notifications
              </Text>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
}

export default NotificationsPage;
