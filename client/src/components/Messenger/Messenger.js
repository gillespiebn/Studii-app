import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./Messenger.css";
import API from '../../utils/API.js';
import { Segment, Container, Header, Icon, Input, Label, Form, Button, Search, Grid, Dropdown } from 'semantic-ui-react';
import Home from "../../pages/Home";
import ReactDOM from "react-dom";

import Message from "./Message.js";

class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [{
                facebook_id: this.props.facebook_id,
                username: this.props.name,
                content: this.props.content,
                img: this.props.photo,
            }]
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                username: this.props.name,
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: this.props.photo,
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    render() {
        const username = this.props.name;
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Chat with {this.props.name}</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Messenger;