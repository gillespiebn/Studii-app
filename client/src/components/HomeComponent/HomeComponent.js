import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../../components/Header/";
import Home from "../../pages/Home";
import Settings from "../../pages/Settings";
import Page404 from "../../pages/404";

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