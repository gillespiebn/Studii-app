import React from "react";
import { Button } from 'semantic-ui-react';
import "./Button.css";


class Button extends Component {
    state = {}
  
    handleClick = () => this.setState({ active: !this.state.active })
  
    render() {
      const { active } = this.state
  
      return (
        <Button toggle active={active} onClick={this.handleClick}>
        </Button>
      )
    }
  }

export default Button;
