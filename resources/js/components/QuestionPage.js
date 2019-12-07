import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-async";

const loadQuestions = async () => {
  //get questions here
  const { data } = await axios.get("/api/questions");
  return data;
};

const QuestionPage = () => {
  const { data, error, isPending } = useAsync({
    promiseFn: loadQuestions
  });
  console.log(error);
  if (isPending) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    console.log(data);
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
      </form>
    );
  }
  return null;
};

export default QuestionPage;
