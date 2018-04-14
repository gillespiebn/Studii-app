import React from 'react'
import SettingsCard from "../../components/SettingsCard";
import API from "../../utils/API";


class Login extends React.Component {
  state = {
    facebook_id: this.props.facebook_id,
    user: this.props.user,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    API.getUser(this.props.facebook_id)
      .then(data => {
          this.setState({user: data.data})
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
    if (this.state.user) {
      return(
      <div>
        <SettingsCard user={this.state.user} facebook_id={this.props.facebook_id}/>
      </div>
      )
    } else {
      return(<div/>)
    }
  }
}

export default Login;
