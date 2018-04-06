import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
import Container from "./components/Container/Container";
// import NavMenu from "./components/NavMenu";
import Header from "./components/Header/";
import Questionnaire from "./components/Questionnaire";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Messenger from "./pages/Messenger";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
// import Login from "./pages/Login";
import Page404 from "./pages/404";
import FacebookLogin from 'react-facebook-login';
import { Link } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkFB = this.checkFB.bind(this);
  }

  state = {
    //user will be the user's facebook or user id. don't know exactly yet
    facebook_id: '',
    //code = school code in the model. its an identifier and each one is hopefully unique
    user: {},
    school: {},
    checked: false,
    intervalId: null,

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

  checkFB = () => {
		if (window.fbToken) {
      window.clearInterval(this.state.intervalId);
      console.log(window.fbToken);
      // do stuff
      // console.log("id: " + window.fbToken.authResponse.userID)
      if (!window.fbToken.authResponse) {
        this.setState({checked: true})
      } else {
        this.setState({checked: true, facebook_id: window.fbToken.authResponse.userID})
      }

		}
	};

  responseFacebook = (response) => {
    console.log(response.id);
    this.setState({facebook_id: response.id});
  };

  componentDidMount () {
    let interval = setInterval(this.checkFB, 100);
    this.setState({intervalId: interval})


  //   setTimeout( () => { 
  //     this.setState({ checked: true });
  //     this.fadeout()
  // }, 2500);
  // axios.get('/cookie', {
  //   withCredentials: true
  // }).then(data => console.log(data))
    // this.responseFacebook();
  };

  fadeout = () => {
    console.log("we will be fading")
  }

  facebookButton = () => {
    return (
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
    );
  }


  render() {
    if (!this.state.checked) {
      return (
        <div>
          <Header />
          <Loading />
          <div 
            style={{display: "none"}}
          >
            {this.facebookButton()}
          </div>
        </div>
      )
    } else {
      if (!this.state.facebook_id) {
        return (
          <div>
            <Header />
            <div>
              {this.facebookButton()}
            </div>
          </div>
        )
      } else {
        return (
          <Router>
            <div>
              {/* <NavMenu /> */}
              <Header />
              <Link
                to="/profile"
                className={
                    window.location.pathname === "/profile"
                }
               >profile</Link>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" setFacebookState = {this.setFacebookState}  message="You are already logged in!" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/groups" component={Groups} />
                <Route exact path="/messenger" component={Messenger} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/register" component={Register} />
                <Route component={Page404} />
              </Switch>
            </div>
          </ Router>
        )
      }
    }
  }
}

export default App;
