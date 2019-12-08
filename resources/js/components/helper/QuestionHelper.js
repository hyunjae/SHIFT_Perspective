import React from "react";
import { Box, Button, Card, Flex, Text } from "rebass";
import { Label, Input, Radio } from "@rebass/forms";

//renders 7 radio button with labels 'disagree' left side and 'agree' right side
const RadioComponent = ({index, handleRadio}) => {
  const radioOptions = _.range(1, 8); //returns a list of numbers from 1 to 7
  const item = radioOptions.map(value => {
    const id = `Q${index}R${value}`;
    return (
      <Box width={[1, 1, 1 / 9]}>
        <Label>
          <Radio
            name={`Q${index}`}
            id={id}
            value={value}
            onChange={() => handleRadio(index, value)}
          />
        </Label>
      </Box>
    );
  });

  return (
    <Flex mx={4} mb={4} flexWrap="wrap">
      <Box width={[1, 1, 1 / 9]}>
        <Label color="red">Disagree</Label>
      </Box>
      {item}
      <Box width={[1, 1, 1 / 9]}>
        <Label color="green">Agree</Label>
      </Box>
    </Flex>
  );
};

export { RadioComponent };
