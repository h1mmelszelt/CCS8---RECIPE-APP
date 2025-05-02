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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`);
        const recipe = data.data.recipe;
        setTitle(recipe.name || "");
        setImage(recipe.image || "");
        setDescription(recipe.description || "");
        setIngredients(recipe.ingredients && recipe.ingredients.length ? recipe.ingredients : [""]);
        setInstructions(recipe.instructions && recipe.instructions.length ? recipe.instructions : [""]);
        setServings(recipe.servingSize || "");
        setTags(recipe.tags && recipe.tags.length ? recipe.tags : [""]);
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
  const handleRemoveIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleAddInstruction = () => setInstructions([...instructions, ""]);
  const handleRemoveInstruction = (index) => setInstructions(instructions.filter((_, i) => i !== index));
  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleAddTag = () => setTags([...tags, ""]);
  const handleRemoveTag = (index) => setTags(tags.filter((_, i) => i !== index));
  const handleTagChange = (index, value) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
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
    if (!title || !image || !description || ingredients.length === 0 || instructions.length === 0 || tags.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!window.confirm("Are you sure you want to update this recipe?")) {
      toast({
        title: "Update cancelled",
        description: "No changes were saved.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
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
      await axios.put(`http://localhost:5000/api/recipes/${recipeId}`, updatedRecipe);
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
    <Box bg="gray.100" minH="100vh" color="black" pb={{ base: "60px", md: "0" }}>
      <Box maxW="800px" mx="auto" p={6}>
        <Box bg="white" border="1px solid #E2E8F0" borderRadius="md" p={6} boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Edit Recipe
          </Text>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="medium" mb={2}>Recipe Title:</Text>
              <Input placeholder="What's the name of your recipe?" value={title} onChange={(e) => setTitle(e.target.value)} border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Recipe Image URL:</Text>
              <Input placeholder="Enter the URL of your recipe image" value={image} onChange={(e) => setImage(e.target.value)} border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Description:</Text>
              <Textarea placeholder="What's your recipe about?" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={120} border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Ingredients:</Text>
              {ingredients.map((ingredient, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input placeholder="What are the ingredients?" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} border="1px solid" borderColor="gray.300" />
                  <IconButton icon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => handleRemoveIngredient(index)} />
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} size="sm" bg="white" color="orange.500" border="1px solid" borderColor="orange.300" _hover={{ bg: "orange.300", color: "white" }} onClick={handleAddIngredient}>
                Add Ingredients
              </Button>
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Instructions:</Text>
              {instructions.map((instruction, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input placeholder={`Step ${index + 1}`} value={instruction} onChange={(e) => handleInstructionChange(index, e.target.value)} border="1px solid" borderColor="gray.300" />
                  <IconButton icon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => handleRemoveInstruction(index)} />
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} size="sm" bg="white" color="orange.500" border="1px solid" borderColor="orange.300" _hover={{ bg: "orange.300", color: "white" }} onClick={handleAddInstruction}>
                Add Steps
              </Button>
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Servings:</Text>
              <Input placeholder="How many servings does this recipe make?" value={servings} onChange={(e) => setServings(e.target.value)} border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Tags:</Text>
              {tags.map((tag, index) => (
                <HStack key={index} spacing={4} mb={2}>
                  <Input placeholder="Keywords" value={tag} onChange={(e) => handleTagChange(index, e.target.value)} border="1px solid" borderColor="gray.300" />
                  <IconButton icon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => handleRemoveTag(index)} />
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} size="sm" bg="white" color="orange.500" border="1px solid" borderColor="orange.300" _hover={{ bg: "orange.300", color: "white" }} onClick={handleAddTag}>
                Add Tags
              </Button>
            </Box>
            <Flex justify="flex-end" gap={2}>
              <Button variant="outline" colorScheme="gray" onClick={handleCancel}>
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
