import React from "react";
import "./SwipeCard.css";
import ProfileHeader from "./ProfileHeader/ProfileHeader.js"
import { Card, Icon, Image } from 'semantic-ui-react'

const CardExampleCard = (props) => {
  console.log(props);
  return(
    <Container>
    {props.profiles.data.map(profile => (
      <div>
      <ProfileHeader />
      <div className="sectionTitle">Classes</div>
        {profile.classes}
      <div className="sectionTitle">Preferred study methods</div>
        {profile.methods}
      <div className="sectionTitle">Preferred places to study</div>
        {profile.locations}
      <div className="sectionTitle">Availability</div>
        {profile.times}
      </div>
    ))}
    </Container>
  );
}

export default SwipeCard;
