import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCompressedImageUrl } from "../utils/imageUtils";

function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId") || null;

  const getAvatarColor = (name) => {
    const colors = [
      "teal.500",
      "orange.500",
      "blue.500",
      "purple.500",
      "red.500",
    ];
    const index = name && name.length > 0 ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  useEffect(() => {
    async function fetchNotifications() {
      if (!userId) return;
      try {
        // 1. Get all recipes created by the user
        const recipesRes = await axios.get(`https://thebitebook.onrender.com/api/recipes/user/${userId}`);
        const recipes = recipesRes.data.data || [];
        // 2. For each recipe, fetch its reviews
        let allReviews = [];
        for (const recipe of recipes) {
          const reviewsRes = await axios.get(`https://thebitebook.onrender.com/api/reviews/${recipe._id}`);
          const reviews = Array.isArray(reviewsRes.data) ? reviewsRes.data : (reviewsRes.data.data || []);
          // 3. Build notification objects for each review
          for (const review of reviews) {
            if (!review.user_id || review.user_id._id === userId) continue; // Skip self-reviews
            allReviews.push({
              id: review._id,
              name: review.user_id.name || "Unknown",
              message: `commented on your recipe '${recipe.name}'`,
              avatar: getCompressedImageUrl(review.user_id.profilePicture || ""),
              time: new Date(review.createdAt).toLocaleString(),
              recipeId: recipe._id,
            });
          }
        }
        // Sort by most recent
        allReviews.sort((a, b) => new Date(b.time) - new Date(a.time));
        setNotifications(allReviews);
      } catch (err) {
        setNotifications([]);
      }
    }
    fetchNotifications();
  }, [userId]);

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
        onClick={() => navigate(-1)}
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
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() => navigate(`/recipes/${notification.recipeId}#comment-${notification.id}`)}
            >
              <Avatar
                size="md"
                src={notification.avatar}
                name={notification.name.charAt(0)}
                bg={getAvatarColor(notification.name)}
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
