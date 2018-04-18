
import  React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from "../../utils/API";
// import NavMenu from "./components/NavMenu";
import Header from "../../components/Header/";
import Questionnaire from "../../components/Questionnaire/";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import LoginCard from "../../components/LoginCard";
import HomeComponent from "../../components/HomeComponent";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Groups from "../../pages/Groups";
// import Messenger from "./pages/Messenger";
import Settings from "../../pages/Settings";
import Register from "../../pages/Register";
import Page404 from "../../pages/404";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Container } from 'semantic-ui-react';
import Axios from "axios";


class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.checkFB = this.checkFB.bind(this);
    console.log(props);
  }
  
  state = {

  }

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
      if (!window.fbToken.authResponse) {
        this.props.setChecked(true);
      } else {
        // this.props.setChecked(true);
        //production(window.fbToken.authResponse.userID) dev(10)
        //  this.props.setFacebookID(10);
        //  this.props.setFacebookID(window.fbToken.authResponse.userID);
        // this.getUser(window.fbToken.authResponse.userID);
        this.getUser(10);
      }
		}
  };

  getUser = (fbID) => {
    Axios.get("https://graph.facebook.com/v2.12/" + fbID + "/picture?type=large&width=200&height=200&redirect=false").then(data => {
    console.log("=========================pictue===============");  })
    // data.data.data.url gets facebook profile picture! 
    // console.log(data.data.data.url);
    // console.log(data);})
    API.getUser(fbID)
      .then(data => {
        if (!data.data) {
          this.setState({newUser: true})
        } else {
          // this.props.setUser(data.data[0])
          // this.props.setUser(data.data)
          this.props.setNewState({checked: true, facebook_id: fbID, user: data.data})
        }
      }
    )
  };

  responseFacebook = (response) => {
    this.props.setFacebookID(response.id);
  };

  componentDidMount () {
    let interval = setInterval(this.checkFB, 100);
    this.setState({intervalId: interval})
  };

  facebookButton = () => {
    return (
      <Container textAlign="center">
        <FacebookLogin
          appId="432818630486037"
          autoLoad
          callback={this.responseFacebook}
          render={renderProps => (
            <button 
              style={{
                height: 60, 
                width:300, 
                borderRadius: 10, 
                borderColor: "white",
                borderStyle: "solid",
                borderWidth: 3,
                background: "#22223B", 
                color: "white",
                fontFamily: "Nunito",
                fontSize: 24,
                transform: 'translate(0%, -375%)'
              }} 
              onClick={renderProps.onClick}>Continue with Facebook</button>
          )}
        />
      </Container>
    );
  }


  render() {
    console.log("akunamatata");
    console.log(this.props);
    if (!this.props.checked) {
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
      if (!this.props.facebook_id) {
        return (
          <div>
            <Header />
            <LoginCard />
            <div>
              {this.facebookButton()}
            </div>
            <Footer/>
          </div>
        )
      } else {
        if (!this.props.user) {
          return(
          <div>
            <Header />
            <Register
              facebook_id={this.props.facebook_id}
            />
            {/* {this.redirectToQuestionnaire()} */}
          </div>
          )
        } else {
          return (
            <div>
              <Redirect to="/" />
            </div>
          )
        }
      } 
    } 
  }
} 


export default AuthComponent