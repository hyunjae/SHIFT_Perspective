import React from "react";
import axios from "axios";
import { Box, Button, Card, Flex, Text } from "rebass";

const Dimensions = [
  ["Extraversion (E)", "Introversion (I)"],
  ["Sensing (S)", "Intuition (N)"],
  ["Thinking (T)", "Feeling (F)"],
  ["Judging (J)", "Perceiving (P)"]
];

const shortDimen = ["EI", "JP", "SN", "TF"];

const calculateWhichDimensions = (breakdown, index) => {
  return breakdown[shortDimen[index]] <= 50;
};

const DimensionComponent = ({ breakdown }) => {
  const DimensionUI = Dimensions.map((types, index) => {
    const isFirstDimension = calculateWhichDimensions(breakdown, index);
    return (
      <Flex mx={4}>
        <Box width={[1, 1 / 4]}>
          <Text fontSize={2} fontWeight="normal" color="darkGrey">
            {types[0]}
          </Text>
        </Box>
        <Box width={[1, 2 / 4]}>
          <Flex>
            <Box
              width={[1, 1 / 2]}
              mb={3}
              bg={isFirstDimension ? "purple" : "grey"}
              color={isFirstDimension ? "purple" : "grey"}
            >_</Box>
            <Box
              width={[1, 1 / 2]}
              mb={3}
              bg={isFirstDimension ? "grey" : "purple"}
              color={isFirstDimension ? "grey" : "purple"}
            ></Box>
          </Flex>
        </Box>
        <Box width={[1, 1 / 4]}>
          <Text
            fontSize={2}
            fontWeight="normal"
            color="darkGrey"
            textAlign="right"
          >
            {types[1]}
          </Text>
        </Box>
      </Flex>
    );
  });
  return DimensionUI;
};

export { DimensionComponent };
