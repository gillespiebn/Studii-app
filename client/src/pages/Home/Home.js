import React from 'react'
// import {  } from 'semantic-ui-react'
import { Form, Grid, Image, Transition } from 'semantic-ui-react'
import PracticeProfileLayout from "../../components/PracticeProfileLayout";
import API from "../../utils/API";




class Profiles extends React.Component {
    state = {
       user: null,
       matches: null
     }

    componentDidMount() {
      this.getUser();
    }
 
    getUser = () => {
      console.log("get user id: " + this.props.facebook_id)
      API.getUser(this.props.facebook_id)
        .then(data => {
            console.log(data.data)
            this.setState({user: data.data})
            console.log(this.state.user)
            this.getMatches();
        }
      )
    };

    getMatches = () => {
      API.getMatches(this.state.user)
        .then(data => {
        console.log("the line under this is matches")
        console.log(data)
        this.setState({matches: data.data})
     }
   )
 };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return(
    <div>
      {this.state.profiles ? 
        <PracticeProfileLayout profiles={this.state.matches} user={this.state.user} facebook_id={this.props.facebook_id } />
        : <h1>This is the home page</h1> 
      }
    </div>
    )
  }
}

export default Profiles;
