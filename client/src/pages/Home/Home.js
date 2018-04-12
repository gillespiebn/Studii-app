import React from 'react'
// import {  } from 'semantic-ui-react'
import { Form, Grid, Image, Transition } from 'semantic-ui-react'
import PracticeProfileLayout from "../../components/PracticeProfileLayout";
import API from "../../utils/API";


class Login extends React.Component {
  state = {
    default: "",
    profiles: null
  };

  componentDidMount() {
    API.retrieveProiles().then(data => {
      // console.log(data.data[0]);
      this.setState({profiles: data})
    })
  }

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
        <PracticeProfileLayout profiles={this.state.profiles} />
        : <h1>This is the home page</h1> 
      }
    </div>
    )
  }
}

export default Login;
