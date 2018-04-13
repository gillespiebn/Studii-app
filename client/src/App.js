import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
// import NavMenu from "./components/NavMenu";
import Header from "./components/Header/";
import Questionnaire from "./components/Questionnaire/";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Messenger from "./pages/Messenger";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Page404 from "./pages/404";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Container } from 'semantic-ui-react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkFB = this.checkFB.bind(this);
  }

  state = {
    facebook_id: '',
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
      if (!window.fbToken.authResponse) {
        this.setState({checked: true})
      } else {
        // For production, the two commented out lines below will be the ones used. currently using the other ones for production
        //this.setState({checked: true, facebook_id: window.fbToken.authResponse.userID})
        console.log(window.fbToken.authResponse.userID);
        this.getUser(window.fbToken.authResponse.userID);
         this.setState({checked: true, facebook_id: 10})
        // this.getUser(10);
      }
		}
  };
  
  getUser = (fbID) => {
    API.getUser(fbID)
      .then(data => {
        console.log("Squirrel");
        console.log(data);
        if (data.data.length === 0) {
          this.setState({newUser: true})
        } else {
          this.setState({user: data.data[0]})
          this.getMatches()
        }
      }
    )
  };

  getMatches = () => {
    API.getMatches(this.state.user)
      .then(data => {
        console.log("the line under this is matches")
        console.log(data)
      } 
    )
  }

  responseFacebook = (response) => {
    console.log(response.id);
    this.setState({facebook_id: response.id});
  };

  componentDidMount () {
    let interval = setInterval(this.checkFB, 100);
    this.setState({intervalId: interval})
  };

  fadeout = () => {
    console.log("we will be fading")
  }

  ///////////////////////////////////////////////////////////////////////////////////

  facebookButton = () => {
    return (
      <Container textAlign="center">
        <h1 style={{color: "white"}}>Login page</h1>

        <FacebookLogin
          appId="432818630486037"
          autoLoad
          callback={this.responseFacebook}
          render={renderProps => (
            <button onClick={renderProps.onClick}>This is my custom FB button</button>
          )}
        />
      </Container>
    );
  }

  router = () => {
    return(
      <Router>
        <div>
          {/* <NavMenu /> */}
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" 
               render={(routeProps) => (
                <Home  
                    facebook_id={this.state.facebook_id}
                    />
                   )} 
                />
            {/* <Route exact path="/login" setFacebookState = {this.setFacebookState}  message="You are already logged in!" component={Home} /> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/messenger" component={Messenger} />
            <Route 
              exact path="/settings" 
              render={(routeProps) => (
                <Settings facebook_id={this.state.facebook_id} 
                user={this.state.user} />   
              )}
            />
            <Route 
              exact path="/register" 
              render={(routeProps) => (
                <Register facebook_id={this.state.facebook_id} 
                test="this should appears somewhere"/>
              )}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </ Router>
    )
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
        if (!this.state.newUser) {
          return(
          <div>
            <Header />
            <Register 
              facebook_id={this.state.facebook_id} 
              test="this should appears somewhere"
            />
          </div>
          )
        } else {
          return (
            <div>
              {this.router()}
            </div>
          )
        }
      } 
    }
  } 

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //Matching Algorithm
    //School "wraps" the algorithm
    //At least one class together
    //At least 1 time
    //At least two study preferences

    //map{schools.map((schools) => (
        //if (schools.users.classes[i] === schools.users.classes[i]) {
        //   let i=0
         //  for (; i < users.length; i++) {
         //   if (users.availability[i] === users.availability[i]) {
          //   let i=0 
          //   for (; i < users.length; i++) {
          //    if (users.studyMethod[i] === users.studyMethod[i]) || users.studyPlace[i] === users.studyPlace[i] {
          //        //match them }
          //}
         //  }
         //} 
         //}
     //   ))}
}

export default App;
