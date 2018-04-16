import React from "react";
import "./SwipeCard.css";
import ProfileHeader from "../../components/ProfileHeader";
import _ from 'lodash';
import Footer from "../Footer";
import API from "../../utils/API";

import { Card, Image, Container, Button, List, Transition } from 'semantic-ui-react';

class Profiles extends React.Component {  

    state = {
       user: this.props.user,
       matches: this.props.matches,
       facebook_id: this.props.facebook_id,
     
     }

     componentDidMount() {
        this.getUser();
        this.getMatches();
        console.log("there is a fairy");

    }
 

       getUser = () => {
         API.getUser(this.props.facebook_id)
            .then(data => {
                this.setState({user: data.data[0]})
                console.log(data)
                this.getMatches()

        }
        )
    };

    getMatches = () => {
     API.getMatches(this.state.user)
     .then(data => {
       console.log("the line under this is matches")
       console.log(data)
      
     }
   )}



    render() {
      console.log("at render " + this.state.matches.length);
       var firstUserId=this.props.matches[0].facebook_id;
      if (this.state.matches) {
      return(
             {idk: this.state.matches.map(profile => (
              <Container>
                <Card className="cardContainer" fluid align="center" key={profile._id} style={{display: (firstUserId===profile.facebook_id ? 'block' : 'none') }}>
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
              ))};
              </Card>
              </Container>
  ))}
        )}}
    };
  export default SwipeCard;
