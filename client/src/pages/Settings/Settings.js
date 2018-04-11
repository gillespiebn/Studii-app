import React from 'react'
import SettingsCard from "../../components/SettingsCard";


class Login extends React.Component {
  state = {
    facebook_id: this.props.facebook_id,
    user: this.props.user,
  };

  componentDidMount() {
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
      <SettingsCard user={this.props.user} facebook_id={this.props.facebook_id}/>
    </div>
    )
  }
}

export default Login;
