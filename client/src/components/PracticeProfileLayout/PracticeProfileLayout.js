import React from "react";
import _ from 'lodash';
import "./PracticeProfileLayout.css";
import Footer from "../Footer";
import API from "../../utils/API";

import { Card, Image, Container, Button, List, Transition, Divider } from 'semantic-ui-react'

class Profiles extends React.Component {  

  state = {
    user: this.props.user,
    matches: this.props.matches,
    facebook_id: this.props.facebook_id,
    index: 0,
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.state.user) {
      this.getMatches();
    }

    if (prevProps.index !== this.state.index){
      if (this.state.index === this.state.matches.length){
        this.setState({noMoreMatches: true});
      }
    }
  }

  getUser = () => {
    API.getUser(this.props.facebook_id)
      .then(data => {
        this.setState({user: data.data[0]})
      }
    )
  };

  getMatches = () => {
    API.getMatches(this.state.user)
    .then(data => {
      console.log("the line under this is matches")
      console.log(data)      
    })
  };
  
  renderCard = () => {
    const profile = this.state.matches[this.state.index];
    const user = this.props.user;
    console.log('inside the render card now');
    console.log(profile)
    console.log(user);
    if (profile.facebook_id === user.facebook_id){
      this.setState({index: this.state.index + 1});
      return;
    }
    if (user.blockedUsers) {
      for(var i = 0; i < user.blockedUsers.length; i++){
        if (user.blockedUsers[i] === profile._id){
          this.setState({index: this.state.index + 1});
          return;
        }
      }
    }

    return(
      <div>
        <Card className="cardContainer" fluid align="center" key={profile._id} >
          <div className="imgDiv">
              <Image className="cardImage" src={profile.photo} size='small' />
          </div>
          <div className="profileDiv">
              <h2 className="profileName">{profile.name}</h2>
              <h3 className="profileElmt">{profile.classStanding}</h3>
              <h3 className="profileElmt">Major -  {profile.major}</h3>
              <h3 className="profileElmt">Email - {profile.email}</h3>
              {profile.minor ? 
                <h3 className="profileElmt">Minor -  {profile.minor}</h3>
              : 
                "" 
              }
          </div> 
          <div className="prfDiv">
            <div>
              <h3>Classes</h3>
              {profile.classes ?
                profile.classes.map(clas => (
                  <h4>{clas.split(":")[0].split("*").join(" ")}: {clas.split(":")[1]}</h4>
                ))
              :
                <p>if this show...something has gone terribly wrong and the server is probably on fire</p>
              }
            <Divider />
            </div>
            <h3>Study Methods</h3>
            <h3>Preferred Locations</h3>
            <h3>Availability</h3>
          </div> 
        </ Card>
        <div>
            <Button.Group>
                <Button icon='plus' onClick={this.handleNext} />
            </Button.Group>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
      {this.state.matches ? 
        <div>
          {this.renderCard()}
        </div>
      :  
        <div>mathces didn't happen</div>
      }
      </div>
    )
    // if (this.state.matches) {
    //   return(
    //     <div>
    //       <Container>
    //       </Container>
    //       <Footer />
    //     </div>  
    //   )
    // } else {
    //   return(
    //    <div></div>
    //   )
    // }
  }
}

 export default Profiles;

//  CAN THIS BE DELETED BELOW????????? /////////////////////////////////////////////////////////////////////////////////////////////////////////

                //   <Transition.Group
                //       as={List}
                //       duration={200}
                //       divided
                //       size='huge'
                //       verticalAlign='middle'
                //     />
                //     {profiles.map(item => (
                //       <List.Item key={item} />
                //         <Card fluid style={{marginTop: 20}} align="center" key={profile._id}>
                //         <Segment align="center"> 
                //         <Image src={profile.photo} size='small' />
                //         <h2>Name: {profile.name}</h2>
                //         <h2>Class: {profile.classStanding}</h2>
                //         <h3>Major: {profile.major}</h3>
                //           {profile.minor ? 
                //           <h3>Minor: {profile.minor}</h3>
                //               : "" 
                //         }
                //        <Segment> 
                //       ))}
                //       < /Card >
        //   ))}

          /* <Card
            image='/assets/images/avatar/large/elliot.jpg'
            header='Elliot Baker'
            meta='Friend'
            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
          /> */




          // Save this...dunno on the other Stuff.

          // {this.state.matches.map(profile => (
          //   <div>
          //     <Card className="cardContainer" fluid align="center" key={profile._id} style={{display: (firstUserId===profile.facebook_id ? 'block' : 'none') }}>
          //       <div className="imgDiv">
          //           <Image className="cardImage" src={profile.photo} size='small' />
          //       </div>
          //       <div className="profileDiv">
          //           <h2 className="profileName">{profile.name}</h2>
          //           <h3 className="profileElmt">{profile.classStanding}</h3>
          //           <h3 className="profileElmt">Major -  {profile.major}</h3>
          //           {profile.minor ? 
          //             <h3 className="profileElmt">Minor -  {profile.minor}</h3>
          //           : 
          //             "" 
          //           }
          //       </div> 
          //       <div class="prfDiv">
          //         <h3>Classes</h3>
          //         <h3>Study Methods</h3>
          //         <h3>Preferred Locations</h3>
          //         <h3>Availability</h3>
          //       </div> 
          //     </ Card>
          //     <div>
          //         <Button.Group>
          //             <Button icon='plus' onClick={this.handleNext} />
          //         </Button.Group>
          //     </div>
          //   </div>
          // ))}                    