import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";

import ValidDeviceRoute from "./components/ProtectedRoutes/ValidDevice";
import Nav from "./components/Nav";
import Room from "./components/Room";
import Home from "./components/Home";
import RoomCreate from "./components/RoomCreate";
import ErrorPage from "./components//Errors/404";

const THEME = {
  colors: {
    paper: "#23272a",
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
  console.log(process.env);
  return (
    <ThemeProvider theme={THEME}>
      <Main style={{ backgroundColor: "#23272A" }} className="App">
        <GlobalStyle />
        <Nav />
        <Router>
          <Switch>
            <Route path="/room/create">
              <ValidDeviceRoute component={<RoomCreate />} />
            </Route>
            <Route path="/room/:id">
              <ValidDeviceRoute component={<Room />} />
            </Route>
            <Route path="/404">
              <ErrorPage />
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
