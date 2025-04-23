import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Image,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar(Logged)";

function CreatePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [tags, setTags] = useState([""]);

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

  return (
    <Box
      bg="gray.100"
      minH="100vh"
      color="black"
      pb={{ base: "60px", md: "0" }} // Adjust padding for mobile view
    >
      <Navbar />
      <Box maxW="800px" mx="auto" p={6}>
        {/* Container */}
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
            {/* Recipe Title */}
            <Box>
              <Text fontWeight="medium" mb={2}>
                Recipe Title:
              </Text>
              <Input
                placeholder="What's the name of your recipe?"
                border="1px solid"
                borderColor="gray.300" // Uniform gray border
              />
            </Box>

            {/* Recipe Image */}
            <Box>
              <Text fontWeight="medium" mb={2}>
                Recipe Image:
              </Text>
              <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={4}
              >
                <Image
                  src="/images/default-recipe.jpg"
                  alt="Recipe"
                  borderRadius="md"
                  mb={4}
                />
                <HStack spacing={4}>
                  <Button size="sm" colorScheme="orange">
                    Upload Photo
                  </Button>
                  <Button size="sm" variant="outline">
                    Set as Cover
                  </Button>
                </HStack>
              </Box>
            </Box>

            {/* Description */}
            <Box>
              <Text fontWeight="medium" mb={2}>
                Description:
              </Text>
              <Textarea
                placeholder="What's your recipe about?"
                maxLength={120}
                border="1px solid"
                borderColor="gray.300" // Uniform gray border
              />
            </Box>

            {/* Ingredients */}
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
                    borderColor="gray.300" // Uniform gray border
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
                borderColor="orange.300" // Uniform gray border
                _hover={{ bg: "orange.300", color: "white" }}
                onClick={handleAddIngredient}
              >
                Add Ingredients
              </Button>
            </Box>

            {/* Instructions */}
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
                    borderColor="gray.300" // Uniform gray border
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
                borderColor="orange.300" // Uniform gray border
                _hover={{ bg: "orange.300", color: "white" }}
                onClick={handleAddInstruction}
              >
                Add Steps
              </Button>
            </Box>

            {/* Servings */}
            <Box>
              <Text fontWeight="medium" mb={2}>
                Servings:
              </Text>
              <Input
                placeholder="How many servings does this recipe make?"
                border="1px solid"
                borderColor="gray.300" // Uniform gray border
              />
            </Box>

            {/* Tags */}
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
                    borderColor="gray.300" // Uniform gray border
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
                borderColor="orange.300" // Uniform gray border
                _hover={{ bg: "orange.300", color: "white" }}
                onClick={handleAddTag}
              >
                Add Tags
              </Button>
            </Box>
            {/* Save Button */}
            <Flex justify="flex-end">
              <Button colorScheme="orange">Save</Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePage;
