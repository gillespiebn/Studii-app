import React from "react";
import Container from "./components/Container/Container";
import Header from "./components/Header/";
import API from "./utils/API";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/404";


class App extends React.Component {
  state = {
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };
    
  handleFormSubmit = event => {
    event.preventDefault();
  };


  componentDidMount () {
  }

  render() {
    return(
      <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route component={Page404} />
        </Switch>
      </div>
      </ Router>
    )
  }
}

export default App;
