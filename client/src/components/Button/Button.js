import React from "react";
import "./Button.css";


const Button = (props) => (
    <button className="profile-button">
        {...props}
    </button>
);

export default Button;