
import  React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import API from "../../utils/API";
import Header from "../../components/Header/";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import LoginCard from "../../components/LoginCard";
import Register from "../../pages/Register";
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
    facebook_id: ''
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.facebook_id !== this.state.facebook_id){
      console.log("Comp did update ran!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      this.getUser(this.state.facebook_id);
    }
  }
    
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
        this.setState({facebook_id: window.fbToken.authResponse.userID})
        // this.getUser(window.fbToken.authResponse.userID);
        // this.getUser(10);
      }
		}
  };

  getUser = (fbID) => {
    Axios.get("https://graph.facebook.com/v2.12/" + fbID + "/picture?type=large&width=200&height=200&redirect=false").then(data => {
    console.log("=========================pictue===============");  })
    API.getUser(fbID)
      .then(data => {
        console.log("grimplepith maestro");
        console.log(data);
        if (!data.data) {
          this.setState({newUser: true})
          this.props.setNewState({checked: true, facebook_id: fbID, user: null})
        } else {
          this.props.setNewState({checked: true, facebook_id: fbID, user: data.data})
        }
      }
    )
  };

  responseFacebook = (response) => {
    this.setState({facebook_id: response.id})
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
          </div>
          )
        } else {
          console.log("we should redirect");
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