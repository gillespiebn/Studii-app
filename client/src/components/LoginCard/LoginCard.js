import React from "react";
import "./LoginCard.css";
import { Segment, Container, Image } from 'semantic-ui-react';

const src1 = "./images/homepage2.png";

const LoginCard = () => {
  return(
    <Container className="logincard-container">
        <Segment className="login-image">
            <Image src={src1}  size='medium' centered />
            <p className="loginCardTxt">
                Need help after a confusing lecture? 
            <br />
                Or maybe you just need to talk out a concept? 
            <br />   
                Studii will help you reach your goals 
            <br />    
                while meeting new people on campus.
            </p>
        </Segment>
        <Segment className="segmentJoinNow">
            <h2 className="joinNow">
                Join Now
            </h2>
        </Segment>
    </Container>
  )
}

export default LoginCard;
