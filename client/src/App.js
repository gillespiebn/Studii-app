import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import Auth from "./components/Auth";

class App extends React.Component {

  state = {
    facebook_id: '',
    user: null,
    checked: false,
  };

  setChecked = whatItShouldBe => this.setState({checked: whatItShouldBe})

  setUser = whatItShouldBe => this.setState({user: whatItShouldBe})

  setFacebookID = whatItShouldBe => this.setState({facebook_id: whatItShouldBe})

  setNewState = state => this.setState(state)
  
  
  render() {

    let loggedInFlag = (this.state.checked && this.state.facebook_id && this.state.user) ? true : false;
    
    return(
      <Router>
        <Switch>
          <Route exact path="/auth" 
            render={(routeProps) => {
              return (
                <Auth
                facebook_id={this.state.facebook_id}
                user={this.state.user}
                checked={this.state.checked}
                setChecked={this.setChecked}
                setUser={this.setUser}
                setFacebookID={this.setFacebookID}
                setNewState={this.setNewState}
                />
              )
            }} 
          />
          <Route path="/" 
            render={(routeProps) => (
              <HomeComponent  
                user={this.state.user}
                facebook_id={this.state.facebook_id}
                authenticated={loggedInFlag}
              />
            )} 
          />
        </Switch>
      </Router>
    )
  }

}

export default App;
