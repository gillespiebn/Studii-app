import React from "react";
import "./ProfileHeader.css"

const ProfileHeader = (props) => (
    <div>
        <div className="profileHeadPink"></div>
        <div className="profileHeadBlue">
            <img className="profileImage" src="{...props}" />
            <div className="headerInfo">
                <div className="name">{...props}</div>
                <div className="schoolName">{...props}</div>
                <div className="classStanding">{...props}</div>
                <div className="major">Major - {...props}</div>
                <div className="minor">Minor - {...props}</div>
            </div>
        </div>
    </div>
)

export default ProfileHeader;