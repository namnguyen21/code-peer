import Room from "./components/Room";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Global.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/room/:id">
            <Room />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
