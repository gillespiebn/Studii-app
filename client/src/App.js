import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from "./utils/API";
// import NavMenu from "./components/NavMenu";
import Header from "./components/Header/";
import Questionnaire from "./components/Questionnaire/";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import LoginCard from "./components/LoginCard";
import HomeComponent from "./components/HomeComponent";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
// import Messenger from "./pages/Messenger";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Page404 from "./pages/404";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Container } from 'semantic-ui-react';
import Axios from "axios";


class App extends React.Component {

  state = {
    facebook_id: '',
    user: null,
    // school: {},
    checked: false,
    // intervalId: null,
    // newUser: null,
    

  };

  // handleInputChange = event => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // };
    
  // handleFormSubmit = event => {
  //   event.preventDefault();
  // };

  // checkFB = () => {
	// 	if (window.fbToken) {
  //     window.clearInterval(this.state.intervalId);
  //     console.log(window.fbToken);
  //     if (!window.fbToken.authResponse) {
  //       this.setState({checked: true})
  //     } else {
  //       // For production, the two commented out lines below will be the ones used. currently using the other ones for production

  //       //this.setState({checked: true, facebook_id: window.fbToken.authResponse.userID})
  //        this.setState({checked: true, facebook_id: 10})

  //       // this.getUser(window.fbToken.authResponse.userID);
 
  //       this.getUser(10);
  //     }
	// 	}
  // };
  
  // getUser = (fbID) => {
  //   Axios.get("https://graph.facebook.com/v2.12/" + fbID + "/picture?type=large&width=200&height=200&redirect=false").then(data => {
  //   console.log("=========================pictue===============");  
  //   // data.data.data.url gets facebook profile picture! 
  //   console.log(data.data.data.url);
  //   console.log(data);})
  //   API.getUser(fbID)
  //     .then(data => {
  //       if (!data.data) {
  //         this.setState({newUser: true})
  //       } else {
  //         this.setState({user: data.data[0]})
  //       }
  //     }
  //   )
  // };

  // responseFacebook = (response) => {
  //   this.setState({facebook_id: response.id});
  // };

  // componentDidMount () {
  //   let interval = setInterval(this.checkFB, 100);
  //   this.setState({intervalId: interval})
  // };

  // fadeout = () => {
  // }

  ///////////////////////////////////////////////////////////////////////////////////

  // facebookButton = () => {
  //   return (
  //     <Container textAlign="center">
  //       <FacebookLogin
  //         appId="432818630486037"
  //         autoLoad
  //         callback={this.responseFacebook}
  //         render={renderProps => (
  //           <button 
  //             style={{
  //               height: 60, 
  //               width:300, 
  //               borderRadius: 10, 
  //               borderColor: "white",
  //               borderStyle: "solid",
  //               borderWidth: 3,
  //               background: "#22223B", 
  //               color: "white",
  //               fontFamily: "Nunito",
  //               fontSize: 24,
  //               transform: 'translate(0%, -375%)'
  //             }} 
  //             onClick={renderProps.onClick}>Continue with Facebook</button>
  //         )}
  //       />
  //     </Container>
  //   );
  // }

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
          <Route exact path="/" 
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


  // render() {
  //   if (!this.state.checked) {
  //     return (
  //       <div>
  //         <Header />
  //         <Loading />
  //         <div 
  //           style={{display: "none"}}
  //         >
  //           {this.facebookButton()}
  //         </div>
  //       </div>
  //     )
  //   } else {
  //     if (!this.state.facebook_id) {
  //       return (
  //         <div>
  //           <Header />
  //           <LoginCard />
  //           <div>
  //             {this.facebookButton()}
  //           </div>
  //           <Footer/>
  //         </div>
  //       )
  //     } else {
  //       if (this.state.newUser) {
  //         return(
  //         <div>
  //           <Header />
  //           <Register
  //             facebook_id={this.state.facebook_id}
  //           />
  //           {/* {this.redirectToQuestionnaire()} */}
  //         </div>
  //         )
  //       } else {
  //         return (
  //           <div>
  //             {this.router()}
  //           </div>
  //         )
  //       }
  //     } 
  //   }
  // } 

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
