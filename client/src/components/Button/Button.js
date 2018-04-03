import React from "react";
import { Button } from 'semantic-ui-react';
import "./Button.css";


const Button = (props) => (
    <button className="profile-button">
        {...props}
    </button>
);

export default Button;
