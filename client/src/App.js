import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";

import Room from "./components/Room";
import Home from "./components/Home";
import RoomCreate from "./components/RoomCreate";

const THEME = {
  colors: {
    paper: "#23272A",
    white: "#ffffff",
    lightGrey: "#2C2F33",
    green: { main: "#1aff53", light: "#99ffb3" },
    blue: {
      main: "#7289DA",
      light: "#8699df",
    },
    pink: { main: "#FFC0CB", light: "#ffe6ea" },
  },
};

const Main = styled.div`
  min-height: 100vh;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
`;

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Main style={{ backgroundColor: "#23272A" }} className="App">
        <GlobalStyle />
        <Router>
          <Switch>
            <Route path="/room/create">
              <RoomCreate />
            </Route>
            <Route path="/room/:id">
              <Room />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Main>
    </ThemeProvider>
  );
}

export default App;
