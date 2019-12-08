import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import { Box, Button, Card, Flex, Text } from "rebass";
import { Input } from "@rebass/forms";
import { RadioComponent } from "./helper/QuestionHelper";

const loadQuestions = async () => {
  //get questions here
  const { data } = await axios.get("/api/questions");
  return data;
};

const QuestionPage = props => {

  //creates 10 zeros. they represent the answer for each question
  //e.g. [1,2,0,0,0...] at index 0, value is 1. So for questions 1, the user selected leftmost radio button
  const[selectedAnswers, setSelectedAnswers] = useState( _.range(0, 10, 0)); 
  
  const [email, setEmail] = useState(""); //to store email input

  const handleRadio = (index, value) => {
    selectedAnswers[index] = value; //set the value for the answered question
    setSelectedAnswers(selectedAnswers); //set it
  };

  const handleEmailInput = ({ target: { value } }) => {
    setEmail(value); //save email
  };

  const handleSubmit = async () => {
    //check if all the questions has been answered first
    const isAllAnswered = _.isNumber(selectedAnswers.find(value => value === 0));

    //Lazy Solution. Would prompt the computer that a requirement is missing
    if(isAllAnswered) return alert("Please answer all the questions");
    if(email.length === 0) return alert("Please enter your email");

    //Convert it to a format that the server would understand.
    //Server sees it as {question_id: number, value: number} format
    const answers = selectedAnswers.map((value, index) => {
      return {question_id: index+1, value: value};
    });

    //send it to the server
    try {
      await axios.post("/api/questions", {
        email,
        answers
      });

      //we redirect to the results page
      props.history.push(`/result?email=${email}`);
    } catch (err) {
      console.error(err);
    }
  };

  const { data, error, isPending } = useAsync({
    promiseFn: loadQuestions
  });

  if (isPending) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    const questionList = data.map((question, index) => {
      return (
        <Card>
          <Flex my={4}>
            <Box width={1}>
              <Text textAlign="center">{question}</Text>
            </Box>
          </Flex>
          <RadioComponent index={index} handleRadio={handleRadio} />
        </Card>
      );
    });

    return (
      <>
        <Flex my={2} ml={4}>
          <Text fontSize={3} fontWeight="bold" color="primary">
            Discover your Perspective
          </Text>
        </Flex>
        <Flex my={2} ml={4}>
          <Text fontSize={2} fontWeight="normal" color="black">
            Complete the 7 min test and get a detailed report of your lenses on
            the world
          </Text>
        </Flex>
        <Flex my={4} justifyContent="center">
          <Box width={[1, 2 / 3]} as="form" onSubmit={e => e.preventDefault()}>
            {questionList}
            <Card color="black">
              <Box>
                <Text textAlign="center">Your Email</Text>
              </Box>
              <Flex mx={4}>
                <Input id="email" name="email" type="email" onChange={handleEmailInput}/>
              </Flex>
            </Card>
            <Box textAlign="center" my={2}>
              <Button onClick={handleSubmit} bg="blue"> Save & Continue</Button>
            </Box>
          </Box>
        </Flex>
      </>
    );
  }
  return null;
};

export default QuestionPage;
