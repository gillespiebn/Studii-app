import React from "react";
import "./ProfileHeader.css"
import API from "../../utils/API";
import SwipeCard from "../../components/SwipeCard";

import { Card, Image, Container, Button, List, Transition } from 'semantic-ui-react'



const ProfileHeader = (props) => {
    console.log(props);
    return (
    {props: SwipeCard.data.map(profile => (
        <div>
            <div className="profileHeadPink"></div>
            <div className="profileHeadBlue">
                <img className="profileImage" src={profile.photo} />
                <div className="headerInfo">
                    <div className="name">{profile.name}</div>
                    <div className="whiteText schoolName">{profile.schoolName}</div>
                    <div className="whiteText classStanding">{profile.classStanding}</div>
                    <div className="whiteText major">Major - {profile.major}</div>
                    <div className="whiteText minor">Minor - {profile.minor}</div>
                </div>
            </div>
        </div>
    ))}
)}

export default ProfileHeader;