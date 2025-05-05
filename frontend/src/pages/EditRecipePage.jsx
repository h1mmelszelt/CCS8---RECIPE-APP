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
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditRecipePage() {
  const { recipeId } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([""]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [ingredientInput, setIngredientInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();
  const [invalidFields, setInvalidFields] = useState({
    title: false,
    image: false,
    description: false,
    ingredients: [],
    instructions: [],
    tags: [],
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(
          `https://cs-test-z2vm.onrender.com/api/recipes/${recipeId}`
        );
        const recipe = data.data.recipe;

        setTitle(recipe.name || "");
        setImage(recipe.image || "");
        setDescription(recipe.description || "");
        setIngredients(
          recipe.ingredients && recipe.ingredients.length
            ? recipe.ingredients
            : [""]
        );
        setInstructions(
          recipe.instructions && recipe.instructions.length
            ? recipe.instructions
            : [""]
        );
        setServings(recipe.servingSize || "");
        setTags(recipe.tags && recipe.tags.length ? recipe.tags : [""]);

        // Update invalidFields based on fetched data
        setInvalidFields({
          title: !recipe.name?.trim(),
          image: !recipe.image?.trim(),
          description: !recipe.description?.trim(),
          ingredients:
            !recipe.ingredients || recipe.ingredients.some((i) => !i.trim()),
          instructions:
            !recipe.instructions || recipe.instructions.some((i) => !i.trim()),
          tags: !recipe.tags || recipe.tags.some((tag) => !tag.trim()),
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load recipe.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId, toast]);

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleRemoveIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const resetInvalidField = (field, index = null) => {
    setInvalidFields((prev) => {
      if (index !== null) {
        // Ensure the field is an array before modifying it
        const updatedField = Array.isArray(prev[field]) ? [...prev[field]] : [];
        updatedField[index] = false; // Reset the specific index
        return { ...prev, [field]: updatedField };
      } else {
        return { ...prev, [field]: false }; // Reset the single field
      }
    });
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
    setInvalidFields((prev) => ({
      ...prev,
      instructions: Array.isArray(prev.instructions)
        ? [...prev.instructions, false]
        : [false], // Add a new false value
    }));
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
    setInvalidFields((prev) => ({
      ...prev,
      instructions: Array.isArray(prev.instructions)
        ? prev.instructions.filter((_, i) => i !== index)
        : [], // Remove the corresponding invalid field
    }));
  };

  const handleAddTag = () => setTags([...tags, ""]);
  const handleRemoveTag = (index) =>
    setTags(tags.filter((_, i) => i !== index));
  const handleTagChange = (index, value) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value; // Update the specific instruction
    setInstructions(updatedInstructions); // Update the state
  };

  const handleAddItem = (input, setInput, list, setList) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()]); // Add the new item to the list
      setInput(""); // Clear the input field
    }
  };

  const handleRemoveItem = (index, setList) => {
    setList((prev) => prev.filter((_, i) => i !== index)); // Remove the item at the specified index
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost."
      )
    ) {
      navigate(`/recipes/${recipeId}`);
      toast({
        title: "Edit cancelled",
        description: "No changes were saved.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdateRecipe = async () => {
    const newInvalidFields = {
      title: !title.trim(),
      image: !image.trim(),
      description: !description.trim(),
      ingredients:
        ingredients.length === 0 || ingredients.some((i) => !i.trim()),
      instructions:
        instructions.length === 0 || instructions.some((i) => !i.trim()),
      tags: tags.length === 0 || tags.some((tag) => !tag.trim()), // Validate tags
    };

    const hasInvalidFields = Object.values(newInvalidFields).some(
      (field) => field
    );

    setInvalidFields(newInvalidFields);

    if (hasInvalidFields) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Proceed with saving the recipe
    const updatedRecipe = {
      name: title,
      image,
      description,
      ingredients,
      instructions,
      servingSize: servings,
      tags,
    };

    try {
      await axios.put(
        `https://cs-test-z2vm.onrender.com/api/recipes/${recipeId}`,
        updatedRecipe
      );
      toast({
        title: "Success",
        description: "Recipe updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the recipe. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  if (loading) {
    return <Text>Loading...</Text>;
  }

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
            Edit Recipe
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
                borderColor={invalidFields.title ? "red.500" : "gray.300"}
                focusBorderColor="orange.400"
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
                placeholder="Enter the URL of your recipe image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                onFocus={() => resetInvalidField("image")}
                border="1px solid"
                borderColor={invalidFields.image ? "red.500" : "gray.300"}
                focusBorderColor="orange.400"
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
                onFocus={() => resetInvalidField("description")}
                maxLength={400}
                border="1px solid"
                borderColor={invalidFields.description ? "red.500" : "gray.300"}
                focusBorderColor="orange.400"
              />
              {invalidFields.description && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Description is required.
                </Text>
              )}
            </Box>
            {/* Ingredients Section */}
            <Box>
              <Text fontWeight="bold" color="black" mb={2}>
                Ingredients:
              </Text>
              <HStack spacing={2}>
                <Input
                  placeholder="Add an ingredient to your recipe."
                  value={ingredientInput}
                  focusBorderColor="orange.400"
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onFocus={() => resetInvalidField("ingredients")}
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
                    icon={<AddIcon />}
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

            {/* Instructions Section */}
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
                    onFocus={() => resetInvalidField("instructions", index)} // Reset the error state for this step
                    border="1px solid"
                    borderColor={
                      invalidFields.instructions[index] ? "red.500" : "gray.300"
                    }
                    focusBorderColor="orange.400"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveInstruction(index)}
                  />
                </HStack>
              ))}
              {instructions.length === 0 && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Instruction(s) is required.
                </Text>
              )}
              {instructions.some((instruction) => !instruction.trim()) && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Please fill in all blank instruction fields.
                </Text>
              )}
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
            {/* Servings Section */}
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
            {/* Tags Section */}
            <Box mt={4}>
              <Text fontWeight="bold" color="black" mb={2}>
                Tags:
              </Text>
              <HStack spacing={2}>
                <Input
                  placeholder="Add a tag to your recipe."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onFocus={() => resetInvalidField("tags")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem(tagInput, setTagInput, tags, setTags);
                    }
                  }}
                  border="1px solid"
                  borderColor={invalidFields.tags ? "red.500" : "gray.300"}
                  focusBorderColor="orange.400"
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

            <Flex justify="flex-end" gap={2}>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={handleUpdateRecipe}>
                Update Recipe
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default EditRecipePage;
