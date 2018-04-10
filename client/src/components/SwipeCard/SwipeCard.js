import React from "react";
import "./SwipeCard.css";
import ProfileHeader from "./ProfileHeader/ProfileHeader.js"
import { Card, Icon, Image } from 'semantic-ui-react'

const CardExampleCard = (props) => {
  console.log(props);
  return(
    <Container>
    {props.profiles.data.map(profile => (
      <Card fluid>
        ProfileHeader
        <Card.Content>
          <Card.Header>

          </Card.Header>
          <Card.Description>
            
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          
        </Card.Content>
      </Card>
    ))}
    </Container>
  );
}

export default SwipeCard
