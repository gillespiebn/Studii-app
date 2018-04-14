import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login';
import "./Login.css";


class Login extends React.Component {
  state = {
    default: "",
    facebook_id: '',
  }

  default = () => {
    console.log("default")
  }

  responseFacebook = (response) => {
    console.log(response.id);
    this.props.setFacebookState(response.id);
    this.setState({facebook_id: response.id});
  }

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <FacebookLogin
          appId="432818630486037"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={this.responseFacebook} 
        />,
        document.getElementById('demo')
      </div>
    )
  }
  
}
export default Login


// const responseFacebook = (response) => {
//   console.log(response);
// }
 
// ReactDOM.render(
//   <FacebookLogin
//     appId="1088597931155576"
//     autoLoad={true}
//     fields="name,email,picture"
//     onClick={componentClicked}
//     callback={responseFacebook} />,
//   document.getElementById('demo')
// );