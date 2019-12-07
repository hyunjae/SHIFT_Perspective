import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/result" component={ResultPage} />
          <Route path="/" component={QuestionPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
