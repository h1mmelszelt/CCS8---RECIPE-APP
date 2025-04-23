import React, { useState } from "react";
import { Box, Input, Button, Tag, TagLabel, TagCloseButton, VStack, Flex, Text } from "@chakra-ui/react";

function Filters({ onApplyFilters }) {
  const [filterInput, setFilterInput] = useState("");
  const [filters, setFilters] = useState([]);

  const handleAddFilter = () => {
    if (filterInput.trim() && !filters.includes(filterInput.trim())) {
      setFilters([...filters, filterInput.trim()]);
      setFilterInput("");
    }
  };

  const handleRemoveFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleClearFilters = () => {
    setFilters([]);
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