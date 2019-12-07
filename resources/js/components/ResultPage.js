import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-async";

const loadResult = async ({ email }) => {
  //get result here
  console.log(email);
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
    console.log(data);
  }

  return null;
};

export default ResultPage;
