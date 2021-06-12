import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";

import ValidDeviceRoute from "./components/ProtectedRoutes/ValidDevice";
import Nav from "./components/Nav";
import Room from "./components/Room";
import Home from "./components/Home";
import InvalidRoomErrorPage from "./components//Errors/InvalidRoom";
import MobileErrorPage from "./components/Errors/Mobile";

const THEME = {
  colors: {
    paper: "#191c1f",
    white: "#ffffff",
    lightGrey: "#2C2F33",
    green: { main: "#52c45e", light: "#99ffb3" },
    blue: {
      main: "#7289DA",
      light: "#8699df",
    },
    pink: { main: "#FFC0CB", light: "#ffe6ea" },
    red: { main: "#c43b3b", light: "#d95050" },
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
      <Main style={{ backgroundColor: "#191c1f" }} className="App">
        <GlobalStyle />

        <Router>
          <Nav />
          <Switch>
            <Route path="/room/:id">
              <ValidDeviceRoute component={<Room />} />
            </Route>
            <Route path="/404/invalid-room">
              <InvalidRoomErrorPage />
            </Route>
            <Route path="/404/mobile">
              <MobileErrorPage />
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
