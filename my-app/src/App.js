import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MapWrapper } from "./components/MapWrapper";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={MapWrapper} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
