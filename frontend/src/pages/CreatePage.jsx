import React, { useState, useEffect } from "react";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "axios"; // Import axios for API requests

function CreatePage() {
  useEffect(() => {
    // Scroll to the top of the page only when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once

  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([""]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const toast = useToast(); // For user feedback
  const navigate = useNavigate();

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

  const resetInvalidField = (field) => {
    setInvalidFields((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleAddItem = (input, setInput, list, setList) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList((prev) => [
        ...prev.filter((item) => item.trim() !== ""),
        input.trim(),
      ]); // Remove blank tags and add the new tag
      setInput(""); // Clear the input field
    }
  };
  const handleRemoveItem = (index, setList) => {
    setList((prev) => prev.filter((_, i) => i !== index)); // Remove the item at the specified index
  };

  const handleSaveRecipe = async () => {
    // Validate form data
    const newInvalidFields = {
      title: !title.trim(),
      image: !image.trim(),
      description: !description.trim(),
      ingredients:
        ingredients.length === 0 || ingredients.every((i) => !i.trim()),
      instructions:
        instructions.length === 0 || instructions.every((i) => !i.trim()),
      tags: tags.length === 0 || tags.every((tag) => !tag.trim()),
    };

    setInvalidFields(newInvalidFields);

    // Check if there are any invalid fields
    if (Object.values(newInvalidFields).some((field) => field)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Retrieve the logged-in user's ID
    const userId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (!userId) {
      toast({
        title: "Error",
        description: "User not logged in. Please log in to create a recipe.",
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
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructions.filter((i) => i.trim()),
      servingSize: servings,
      tags: tags.filter((tag) => tag.trim()),
      user_id: userId, // Include the user ID as the author
    };

    try {
      await axios.post(
        "https://cs-test-z2vm.onrender.com/api/recipes",
        newRecipe
      );

      toast({
        title: "Success",
        description: "Recipe saved successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the home page
      navigate("/home");
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

  const [invalidFields, setInvalidFields] = useState({
    title: false,
    image: false,
    description: false,
    ingredients: false,
    instructions: false,
    tags: false,
  });

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
              <Text fontWeight="bold" color="black" mb={2}>
                Recipe Title:
              </Text>
              <Input
                placeholder="Enter the name of your recipe."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => resetInvalidField("title")} // Reset the error state on focus
                border="1px solid"
                focusBorderColor="orange.400"
                borderColor={invalidFields.title ? "red.500" : "gray.300"}
              />
              {invalidFields.title && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Title is required.
                </Text>
              )}
            </Box>

            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Recipe Image URL:
              </Text>
              <Input
                focusBorderColor="orange.400"
                placeholder="Enter the URL of your recipe image."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                onFocus={() => resetInvalidField("image")} // Reset the error state on focus
                border="1px solid"
                borderColor={invalidFields.image ? "red.500" : "gray.300"}
              />
              {invalidFields.image && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Image URL is required.
                </Text>
              )}
            </Box>

            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Description:
              </Text>
              <Textarea
                placeholder="Enter a brief description of your recipe."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => resetInvalidField("description")} // Reset the error state on focus
                maxLength={400}
                border="1px solid"
                focusBorderColor="orange.400"
                borderColor={invalidFields.description ? "red.500" : "gray.300"}
              />
              {invalidFields.description && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Description is required.
                </Text>
              )}
            </Box>

            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Ingredients:
              </Text>
              <HStack spacing={2}>
                <Input
                  placeholder="Add an ingredient to your recipe."
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onFocus={() => resetInvalidField("ingredients")} // Reset the error state on focus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem(
                        ingredientInput,
                        setIngredientInput,
                        ingredients,
                        setIngredients
                      );
                    }
                  }}
                  focusBorderColor="orange.400"
                  border="1px solid"
                  borderColor={
                    invalidFields.ingredients ? "red.500" : "gray.300"
                  }
                />
                <Tooltip
                  label="Add Ingredient"
                  aria-label="Add Ingredient Tooltip"
                >
                  <IconButton
                    size="sm"
                    colorScheme="orange"
                    icon={<AddIcon />} // Add the plus icon here
                    onClick={() =>
                      handleAddItem(
                        ingredientInput,
                        setIngredientInput,
                        ingredients,
                        setIngredients
                      )
                    }
                  />
                </Tooltip>
              </HStack>
              {invalidFields.ingredients && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Ingredient(s) is required.
                </Text>
              )}
              <HStack spacing={2} mt={2} wrap="wrap">
                {ingredients.map((ingredient, index) => (
                  <Tag
                    key={index}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="orange"
                  >
                    <TagLabel>{ingredient}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveItem(index, setIngredients)}
                    />
                  </Tag>
                ))}
              </HStack>
            </Box>

            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Instructions:
              </Text>
              {instructions.map((instruction, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input
                    placeholder={`Enter step ${index + 1} of your recipe.`}
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value)
                    }
                    onFocus={() => resetInvalidField("instructions")}
                    border="1px solid"
                    focusBorderColor="orange.400"
                    borderColor={
                      invalidFields.instructions && !instruction.trim()
                        ? "red.500"
                        : "gray.300"
                    } // Highlight red if invalid
                  />
                  <Tooltip
                    label="Delete Instruction"
                    aria-label="Delete Instruction Tooltip"
                  >
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemoveInstruction(index)}
                    />
                  </Tooltip>
                </HStack>
              ))}
              {invalidFields.instructions && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Instruction(s) is required.
                </Text>
              )}

              <Button
                icon={<AddIcon />}
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
              <Text fontWeight="bold" color="black" mb={2}>
                Servings:
              </Text>
              <NumberInput
                value={servings || 1} // Default to 1 if servings is empty
                min={1} // Prevent going below 1
                onChange={(valueString) =>
                  setServings(parseInt(valueString) || 1)
                } // Update state
                size="sm"
                maxW="120px"
                focusBorderColor="orange.400"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Tags:
              </Text>
              <HStack spacing={2}>
                <Input
                  placeholder="Add a tag to your recipe."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onFocus={() => resetInvalidField("tags")} // Reset the error state on focus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem(tagInput, setTagInput, tags, setTags);
                    }
                  }}
                  border="1px solid"
                  focusBorderColor="orange.400"
                  borderColor={invalidFields.tags ? "red.500" : "gray.300"}
                />
                <Tooltip label="Add Tag" aria-label="Add Tag Tooltip">
                  <IconButton
                    size="sm"
                    colorScheme="orange"
                    icon={<AddIcon />}
                    onClick={() =>
                      handleAddItem(tagInput, setTagInput, tags, setTags)
                    }
                  />
                </Tooltip>
              </HStack>
              {invalidFields.tags && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Tag(s) is required.
                </Text>
              )}
              <HStack spacing={2} mt={2} wrap="wrap">
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="orange"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveItem(index, setTags)}
                    />
                  </Tag>
                ))}
              </HStack>
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
