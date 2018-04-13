import React, { Component } from "react";
import "./LoginCard.css";
import { Segment, Container, Header, Icon, Input, Image, Label, Form, Button, Search, Grid, Dropdown } from 'semantic-ui-react';

const src1 = "../../public/images/homepage2";

const LoginCard = () => {
    <Container className="logincard-container">
        <Segment className="login-image">
            <Image src={src1} size='medium' center />
            <p>
                Need help after a confusing lecture? Or maybe you just need to talk out a concept? Studii will help you reach your goals while meeting new people on campus.
            </p>
        </Segment>
        <Segment>
            <h2>
                Join Now
            </h2>
        </Segment>
    </Container>
}