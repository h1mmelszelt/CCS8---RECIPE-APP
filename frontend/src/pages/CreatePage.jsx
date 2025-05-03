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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
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
  const [ingredientInput, setIngredientInput] = useState("");
  const [tagInput, setTagInput] = useState("");
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

    const newRecipe = {
      name: title,
      image,
      description,
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructions.filter((i) => i.trim()),
      servingSize: servings,
      tags: tags.filter((tag) => tag.trim()),
    };

    try {
      const response = await axios.post(
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
      // Optionally, reset the form
      setTitle("");
      setImage("");
      setDescription("");
      setIngredients([""]);
      setInstructions([""]);
      setServings("");
      setTags([]);
      setInvalidFields({
        title: false,
        image: false,
        description: false,
        ingredients: false,
        instructions: false,
        tags: false,
      });
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
                placeholder="What's the name of your recipe?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                border="1px solid"
                borderColor={invalidFields.title ? "red.500" : "gray.300"}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Recipe Image URL:
              </Text>
              <Input
                placeholder="Enter the URL of your recipe image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                border="1px solid"
                borderColor={invalidFields.image ? "red.500" : "gray.300"}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Description:
              </Text>
              <Textarea
                placeholder="What's your recipe about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={400}
                border="1px solid"
                borderColor={invalidFields.description ? "red.500" : "gray.300"}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Ingredients:
              </Text>
              <Input
                placeholder="Add an ingredient and press Enter"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
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
                border="1px solid"
                borderColor={invalidFields.ingredients ? "red.500" : "gray.300"}
              />
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
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value)
                    }
                    border="1px solid"
                    borderColor={
                      invalidFields.instructions ? "red.500" : "gray.300"
                    }
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
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box mt={4}>
              <Text fontWeight="bold" color="black" mb={2}>
                Tags:
              </Text>
              <Input
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddItem(tagInput, setTagInput, tags, setTags);
                  }
                }}
                border="1px solid"
                borderColor={invalidFields.tags ? "red.500" : "gray.300"}
              />
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
