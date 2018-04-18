import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from "../../utils/API";
// import NavMenu from "./components/NavMenu";
import Header from "../../components/Header/";
import Questionnaire from "../../components/Questionnaire/";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import LoginCard from "../../components/LoginCard";
import Auth from "../../components/Auth";
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



const HomeComponent = (props) => {
  if (!props.authenticated) {
    return(
      <Redirect to="/auth" />
    )
  }
  console.log("path/strings");
  console.log(props)
  return(
      <div>
        <Header />
        <Switch>
          <Route exact path="/" 
            render={(routeProps) => (
              <Home  
                user={props.user}
                facebook_id={props.facebook_id}
              />
            )} 
          />
          {/* <Route exact path="/home" 
            render={(routeProps) => (
              <Home  
                user={props.user}
                facebook_id={props.facebook_id}
              />
            )} 
          /> */}
          <Route 
            path="/settings" 
            render={(routeProps) => { return(
              <Settings 
                facebook_id={props.facebook_id} 
              />   
            )}}
          />
          <Route component={Page404} />
        </Switch>
      </div>
  )
}

export default HomeComponent