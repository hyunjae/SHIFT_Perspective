import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";

const additionalTheme = {
  colors: {
    black: "#495057",
    purple: "#A920CB",
    darkgrey: "#878787",
    grey: "#E9ECEF",
    red: "#FA4344",
    green: "#00A079",
    blue: "#3D59FA",
    primary: '#113264',
  }
};
const CustomTheme = { ...additionalTheme, ...theme };

const App = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
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
