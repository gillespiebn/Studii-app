import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'


class Login extends React.Component {
  state = {
    default: ""
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
      <h1>This will be the home page</h1>
    </div>
    )
  }
}

export default Login;
