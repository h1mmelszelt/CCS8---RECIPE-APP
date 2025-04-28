import React, { useState } from "react";
import { Box, Input, Button, Tag, TagLabel, TagCloseButton, VStack, Flex, Text } from "@chakra-ui/react";

function Filters({ onApplyFilters }) {
  const [filterInput, setFilterInput] = useState("");
  const [filters, setFilters] = useState([]);

  // Add a new filter to the list (but don't apply it yet)
  const handleAddFilter = () => {
    if (filterInput.trim() && !filters.includes(filterInput.trim())) {
      const updatedFilters = [...filters, filterInput.trim()];
      setFilters(updatedFilters);
      setFilterInput(""); // Clear the input
    }
  };

  // Remove a specific filter
  const handleRemoveFilter = (filter) => {
    const updatedFilters = filters.filter((f) => f !== filter);
    setFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    console.log("Filters to apply:", filters); // Debug log
    if (onApplyFilters) {
      onApplyFilters(filters); // Pass the current filters to the parent
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters([]);
    if (onApplyFilters) {
      onApplyFilters([]); // Reset filters in the parent component
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" maxW="300px" bg="white">
      <VStack align="start" spacing={4}>
        {/* Title */}
        <Text fontSize="lg" fontWeight="bold">
          Filters
        </Text>
        {/* Input and Add Button in a Row */}
        <Flex gap={2} width="100%">
          <Input
            placeholder="e.g., chicken, onion"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            size="sm"
          />
          <Button size="sm" onClick={handleAddFilter} colorScheme="gray">
            ADD
          </Button>
        </Flex>
        {/* Display Added Filters */}
        <Box>
          {filters.map((filter, index) => (
            <Tag
              key={index}
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="orange"
              mr={1}
              mb={1}
            >
              <TagLabel>{filter}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveFilter(filter)} />
            </Tag>
          ))}
        </Box>
        {/* Apply and Clear Buttons */}
        <Button
          size="sm"
          colorScheme="orange"
          onClick={handleApplyFilters}
          isDisabled={filters.length === 0}
          mx="auto"
          width="100%"
        >
          Apply Filters
        </Button>
        <Button
          size="sm"
          colorScheme="gray.500"
          variant="outline"
          onClick={handleClearFilters}
          isDisabled={filters.length === 0}
          mx="auto"
          width="100%"
        >
          Clear Filters
        </Button>
      </VStack>
    </Box>
  );
}

export default Filters;