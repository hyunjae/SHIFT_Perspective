import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/result" component={ResultPage} />
      <Route path="/" component={QuestionPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
