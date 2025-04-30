import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import axios from "axios"; // Import axios for API requests

function CreatePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([""]);
  const toast = useToast(); // For user feedback

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleRemoveIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleAddInstruction = () => setInstructions([...instructions, ""]);
  const handleRemoveInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));
  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleAddTag = () => setTags([...tags, ""]);
  const handleRemoveTag = (index) =>
    setTags(tags.filter((_, i) => i !== index));
  const handleTagChange = (index, value) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const handleSaveRecipe = async () => {
    // Validate form data
    if (
      !title ||
      !image ||
      !description ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      tags.length === 0
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newRecipe = {
      name: title,
      image,
      description,
      ingredients,
      instructions,
      servingSize: servings,
      tags,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipes",
        newRecipe
      );
      toast({
        title: "Success",
        description: "Recipe saved successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Optionally, reset the form
      setTitle("");
      setImage("");
      setDescription("");
      setIngredients([""]);
      setInstructions([""]);
      setServings("");
      setTags([""]);
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Error",
        description: "Failed to save the recipe. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="gray.100"
      minH="100vh"
      color="black"
      pb={{ base: "60px", md: "0" }}
    >
      <Box maxW="800px" mx="auto" p={6}>
        <Box
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={6}
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Create New Recipe
          </Text>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="medium" mb={2}>
                Recipe Title:
              </Text>
              <Input
                placeholder="What's the name of your recipe?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                border="1px solid"
                borderColor="gray.300"
              />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Recipe Image URL:
              </Text>
              <Input
                placeholder="Enter the URL of your recipe image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                border="1px solid"
                borderColor="gray.300"
              />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Description:
              </Text>
              <Textarea
                placeholder="What's your recipe about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={120}
                border="1px solid"
                borderColor="gray.300"
              />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Ingredients:
              </Text>
              {ingredients.map((ingredient, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input
                    placeholder="What are the ingredients?"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    border="1px solid"
                    borderColor="gray.300"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveIngredient(index)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                bg="white"
                color="orange.500"
                border="1px solid"
                borderColor="orange.300"
                _hover={{ bg: "orange.300", color: "white" }}
                onClick={handleAddIngredient}
              >
                Add Ingredients
              </Button>
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Instructions:
              </Text>
              {instructions.map((instruction, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value)
                    }
                    border="1px solid"
                    borderColor="gray.300"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveInstruction(index)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                bg="white"
                color="orange.500"
                border="1px solid"
                borderColor="orange.300"
                _hover={{ bg: "orange.300", color: "white" }}
                onClick={handleAddInstruction}
              >
                Add Steps
              </Button>
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Servings:
              </Text>
              <Input
                placeholder="How many servings does this recipe make?"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                border="1px solid"
                borderColor="gray.300"
              />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Tags:
              </Text>
              {tags.map((tag, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input
                    placeholder="Keywords"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    border="1px solid"
                    borderColor="gray.300"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveTag(index)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                bg="white"
                color="orange.500"
                border="1px solid"
                borderColor="orange.300"
                _hover={{ bg: "orange.300", color: "white" }}
                onClick={handleAddTag}
              >
                Add Tags
              </Button>
            </Box>
            <Flex justify="flex-end">
              <Button colorScheme="orange" onClick={handleSaveRecipe}>
                Save
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePage;
