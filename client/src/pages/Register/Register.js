import React from 'react'
import {  } from 'semantic-ui-react'
import Questionnaire from "../../components/Questionnaire"


class Login extends React.Component {
  state = {
    facebook_id: this.props.facebook_id
  };

  componentDidMount() {
    // API.retrieveProiles().then(data => {
    //   // console.log(data.data[0]);
    //   this.setState({profiles: data})
    // })
    console.log(this.props)
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
      <Questionnaire facebook_id={this.props.facebook_id}/>
    </div>
    )
  }
}

export default Login;
