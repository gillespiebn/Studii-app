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

      <div className="sectionTitle">Preferred study methods</div>

      <div className="sectionTitle">Preferred places to study</div>

      <div className="sectionTitle">Availability</div>
      </div>
    ))}
    </Container>
  );
}

export default SwipeCard
