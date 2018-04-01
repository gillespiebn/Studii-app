import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login';


class Login extends React.Component {
  state = {
    default: ""
  }

  default = () => {
    console.log("default")
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <FacebookLogin
          appId="1914479871898377"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          // callback={responseFacebook} 
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