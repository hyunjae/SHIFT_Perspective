import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-async";

const loadQuestions = async () => {
  //get questions here
  const { data } = await axios.get("/api/questions");
  return data;
};

const QuestionPage = props => {
  const handleSubmit = async () => {
    const email = "test@yopmail.com";
    const answers = [
      { question_id: 1, value: 4 },
      { question_id: 2, value: 3 },
      { question_id: 3, value: 1 },
      { question_id: 4, value: 6 },
      { question_id: 5, value: 7 },
      { question_id: 6, value: 3 },
      { question_id: 7, value: 5 },
      { question_id: 8, value: 3 },
      { question_id: 9, value: 6 },
      { question_id: 10, value: 6 }
    ];
    try {
      await axios.post("/api/questions", {
        email,
        answers
      });


      props.history.push(`/result?email=${email}`)
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
    const list = data.map(question => {
      return (
        <div>
          <div class="form-group">
            <label class="col-sm-4 control-label">{question}</label>
            <div class="col-sm-8">
              <input type="radio" name="rank" value="1" />
              <input type="radio" name="rank" value="2" />
              <input type="radio" name="rank" value="3" />
              <input type="radio" name="rank" value="4" />
              <input type="radio" name="rank" value="5" />
              <input type="radio" name="rank" value="6" />
              <input type="radio" name="rank" value="7" />
            </div>
          </div>
        </div>
      );
    });

    return (
      <form>
        <h1>Discover your Perspective</h1>
        <label>
          Complete the 7 min test and get a detailed report of your lenses on
          the world
        </label>
        <div>{list}</div>
        <div onClick={handleSubmit}>Save and continue</div>
      </form>
    );
  }
  return null;
};

export default QuestionPage;
