import React from "react";
import Container from "./components/Container/Container";
import Header from "./components/Header/";
import API from "./utils/API";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import Page404 from "./pages/404";
import FacebookLogin from 'react-facebook-login';


class App extends React.Component {
  state = {
    //user will be the user's facebook or user id. don't know exactly yet
    facebook_id: '',
    //code = school code in the model. its an identifier and each one is hopefully unique
    code: '',
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

  responseFacebook = (response) => {
    console.log(response.id);
    this.setState({facebook_id: response.id});
  }

  componentDidMount () {
  }


  render() {
    if (!this.state.facebook_id) {
      return (
        <div>
          <Header />
          <div>
            <h1>Login page</h1>
            <FacebookLogin
              appId="432818630486037"
              autoLoad={true}
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={this.responseFacebook} 
            />
          </div>
        </div>
      )
    } else {
      return (
        <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" setFacebookState = {this.setFacebookState}  message="You are already logged in!" component={Home} />
            <Route component={Page404} />
          </Switch>
        </div>
        </ Router>
      )
    }
  }
}

export default App;
