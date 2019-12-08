import React from "react";
import axios from "axios";
import { useAsync } from "react-async";
import { Box, Button, Card, Flex, Text } from "rebass";
import {DimensionComponent } from "./helper/ResultHelper"

const loadResult = async ({ email }) => {
  //get result here
  const { data } = await axios.get(`/api/results/${email}`);
  return data;
};

const ResultPage = props => {
  const params = new URLSearchParams(props.location.search);
  const email = params.get("email") || "";

  const { data, error, isPending } = useAsync({
    promiseFn: loadResult,
    email
  });

  if (isPending) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    const { results, breakdown } = data;
    return (
      <Card m={3}>
        <Flex my={2}>
          <Box width={[1, 1 / 2]}>
            <Flex my={2} ml={4}>
              <Text fontSize={3} fontWeight="bold" color="primary">
                Your Perspective
              </Text>
            </Flex>
            <Flex my={2} ml={4}>
              <Text fontSize={2} fontWeight="normal" color="black">
                Your Perspective Type is {results}
              </Text>
            </Flex>
          </Box>
          <Box width={[1, 1 / 2]}>
            <DimensionComponent breakdown={breakdown} />
          </Box>
        </Flex>
      </Card>
    );
  }

  return null;
};

export default ResultPage;
