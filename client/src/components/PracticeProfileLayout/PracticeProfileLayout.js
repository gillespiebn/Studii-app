import React from "react";
import _ from 'lodash';
import "./PracticeProfileLayout.css";
import Footer from "../Footer";
import API from "../../utils/API";

import { Form, Card, Image, Container, Button, List, Transition, Divider, Icon, Grid } from 'semantic-ui-react'

class Profiles extends React.Component {  

  state = {
    user: this.props.user,
    matches: this.props.matches,
    facebook_id: this.props.facebook_id,
    index: 0,
  }

  componentDidMount() {
    // this.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.index !== this.state.index || this.state.index === 0) {
    //   // this.setState({times: this.state.matches[this.state.index].times});
    // }
  }

  getUser = () => {
    API.getUser(this.props.facebook_id)
      .then(data => {
        this.setState({user: data.data[0]})
      }
    )
  };

  // getMatches = () => {
  //   API.getMatches(this.state.user)
  //   .then(data => {
  //     console.log("the line under this is matches")
  //     console.log(data)      
  //   })
  // };

  handleNext = () => {
    if (this.state.index + 1 === this.state.matches.length){
      this.setState({noMoreMatches: true});
    }
    this.setState({index: this.state.index + 1})
  }

  
  renderCard = () => {
    let profile;
    if (this.state.matches[this.state.index]){
      profile = this.state.matches[this.state.index]
    } else {
      return;
    }
    console.log("Hee Haw");
    console.log(profile);
    // const profile = this.state.matches[this.state.index];
    const user = this.props.user;
    if (profile.facebook_id === user.facebook_id){
      if (this.state.index + 1 === this.state.matches.length){
        this.setState({noMoreMatches: true});
      }
      this.setState({index: this.state.index + 1});
      return;
    }

    const timesObject = {};
    for (var i = 0; i < profile.times.length; i++){
      timesObject[profile.times[i]] = true;
    }
    console.log("Plithy THe Spoonman");
    console.log(timesObject);
    // if (user.blockedUsers) {
    //   for(var i = 0; i < user.blockedUsers.length; i++){
    //     console.log(user.blockedUsers[i] + " " + profile._id)
    //     if (user.blockedUsers[i] === profile._id){
    //       this.setState({index: this.state.index + 1});
    //       return;
    //     }
    //   }
    // }

    return(
      <div>
        {this.state.noMoreMatches ?
          <p>no more matches dummy</p>
        :
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
            <Grid id="methods">
              {profile.methods.map(method => (
                <div>
                  <Grid.Column width={2}>
                    <Button> {method} </Button>
                  </Grid.Column>
                </div>
              ))}
            </Grid>
            <h3>Preferred Locations</h3>
            <Grid id="locations">
              {profile.locations.map(location => (
                <div>
                  <Grid.Column width={2}>
                    <Button> {location} </Button>
                  </Grid.Column>
                </div>
              ))}
            </Grid>
            <h3>Availability</h3>

            <Form>
              <Form.Group className="timebtnMo" widths="equal">
                <div className="timeFrameLabels">Morning</div>
                {timesObject.SundayMorning ?
                  <img alt="." src="/images/pinkMor.png" active={timesObject.SundayMorning} name="SundayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SundayMorning" className="Sunday Morning" />
                : 
                  <img alt="." src="/images/blueMor.png" active={timesObject.SundayMorning} name="SundayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SundayMorning" className="Sunday Morning" />
                }
                
                {timesObject.MondayMorning ?
                <img alt="." src="/images/pinkMor.png" active={timesObject.MondayMorning} name="MondayMorning" /*onClick={this.handleTimeToggle}*/ data-times="MondayMorning" className="Monday Morning" />
                : <img alt="." src="/images/blueMor.png" active={timesObject.MondayMorning} name="MondayMorning" /*onClick={this.handleTimeToggle}*/ data-times="MondayMorning" className="Monday Morning" />}
                
                {timesObject.TuesdayMorning ?
                <img alt="." src="/images/pinkMor.png" active={timesObject.TuesdayMorning} name="TuesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayMorning" className="Tuesday Morning" />
                : <img alt="." src="/images/blueMor.png" active={timesObject.TuesdayMorning} name="TuesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayMorning" className="Tuesday Morning" />}
                
                {timesObject.WednesdayMorning ?
                <img alt="." src="/images/pinkMor.png" active={timesObject.WednesdayMorning} name="WednesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayMorning" className="Wednesday Morning" />
                : <img alt="." src="/images/blueMor.png" active={timesObject.WednesdayMorning} name="WednesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayMorning" className="Wednesday Morning" />}
                
                {timesObject.ThursdayMorning ?
                <img alt="." src="/images/pinkMor.png" active={timesObject.ThursdayMorning} name="ThursdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayMorning" className="Thursday Morning" />
                : <img alt="." src="/images/blueMor.png" active={timesObject.ThursdayMorning} name="ThursdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayMorning" className="Thursday Morning" />}
                
                {timesObject.FridayMorning ?
                <img alt="." src="/images/pinkMor.png" active={timesObject.FridayMorning} name="FridayMorning" /*onClick={this.handleTimeToggle}*/ data-times="FridayMorning" className="Friday Morning" />
                : <img alt="." src="/images/blueMor.png" active={timesObject.FridayMorning} name="FridayMorning" /*onClick={this.handleTimeToggle}*/ data-times="FridayMorning" className="Friday Morning" />}
                
                {timesObject.SaturdayMorning ?
                <img alt="." src="/images/pinkMor.png" active={timesObject.SaturdayMorning} name="SaturdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayMorning" className="Saturday Morning" />
                : <img alt="." src="/images/blueMor.png" active={timesObject.SaturdayMorning} name="SaturdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayMorning" className="Saturday Morning" />}
                
                </Form.Group>
                <Form.Group className="timebtnAf" widths="equal"> 
                <div className="timeFrameLabels">Afternoon</div>
                  {timesObject.SundayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.SundayAfternoon} name="SundayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SundayAfternoon" className="Sunday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.SundayAfternoon} name="SundayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SundayAfternoon" className="Sunday Afternoon" />}
                
                {timesObject.MondayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.MondayAfternoon} name="MondayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="MondayAfternoon" className="Monday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.MondayAfternoon} name="MondayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="MondayAfternoon" className="Monday Afternoon" />}
                
                {timesObject.TuesdayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.TuesdayAfternoon} name="TuesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayAfternoon" className="Tuesday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.TuesdayAfternoon} name="TuesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayAfternoon" className="Tuesday Afternoon" />}
                
                {timesObject.WednesdayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.WednesdayAfternoon} name="WednesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayAfternoon" className="Wednesday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.WednesdayAfternoon} name="WednesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayAfternoon" className="Wednesday Afternoon" />}
                
                {timesObject.ThursdayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.ThursdayAfternoon} name="ThursdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayAfternoon" className="Thursday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.ThursdayAfternoon} name="ThursdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayAfternoon" className="Thursday Afternoon" />}
                
                {timesObject.FridayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.FridayAfternoon} name="FridayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="FridayAfternoon" className="Friday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.FridayAfternoon} name="FridayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="FridayAfternoon" className="Friday Afternoon" />}
                
                {timesObject.SaturdayAfternoon ?
                <img alt="." src="/images/pinkAft.png" active={timesObject.SaturdayAfternoon} name="SaturdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayAfternoon" className="Saturday Afternoon" />
                : <img alt="." src="/images/blueAft.png" active={timesObject.SaturdayAfternoon} name="SaturdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayAfternoon" className="Saturday Afternoon" />}
                </Form.Group>
                <Form.Group className="timebtnEv" widths="equal">
                <div className="timeFrameLabels">Evening</div>
                  {timesObject.SundayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.SundayEvening} name="SundayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SundayEvening" className="Sunday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.SundayEvening} name="SundayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SundayEvening" className="Sunday Evening" />}
                
                {timesObject.MondayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.MondayEvening} name="MondayEvening" /*onClick={this.handleTimeToggle}*/ data-times="MondayEvening" className="Monday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.MondayEvening} name="MondayEvening" /*onClick={this.handleTimeToggle}*/ data-times="MondayEvening" className="Monday Evening" />}
                
                {timesObject.TuesdayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.TuesdayEvening} name="TuesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayEvening" className="Tuesday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.TuesdayEvening} name="TuesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayEvening" className="Tuesday Evening" />}
                
                {timesObject.WednesdayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.WednesdayEvening} name="WednesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayEvening" className="Wednesday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.WednesdayEvening} name="WednesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayEvening" className="Wednesday Evening" />}
                
                {timesObject.ThursdayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.ThursdayEvening} name="ThursdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayEvening" className="Thursday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.ThursdayEvening} name="ThursdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayEvening" className="Thursday Evening" />}
                
                {timesObject.FridayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.FridayEvening} name="FridayEvening" /*onClick={this.handleTimeToggle}*/ data-times="FridayEvening" className="Friday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.FridayEvening} name="FridayEvening" /*onClick={this.handleTimeToggle}*/ data-times="FridayEvening" className="Friday Evening" />}
                
                {timesObject.SaturdayEvening ?
                <img alt="." src="/images/pinkEve.png" active={timesObject.SaturdayEvening} name="SaturdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayEvening" className="Saturday Evening" />
                : <img alt="." src="/images/blueEve.png" active={timesObject.SaturdayEvening} name="SaturdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayEvening" className="Saturday Evening" />}
                </Form.Group>
                <Form.Group className="timebtnNi" widths="equal">   
                <div className="timeFrameLabels">Night</div>
                  {timesObject.SundayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.SundayNight} name="SundayNight" /*onClick={this.handleTimeToggle}*/ data-times="SundayNight" className="Sunday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.SundayNight} name="SundayNight" /*onClick={this.handleTimeToggle}*/ data-times="SundayNight" className="Sunday Night" />}
                
                {timesObject.MondayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.MondayNight} name="MondayNight" /*onClick={this.handleTimeToggle}*/ data-times="MondayNight" className="Monday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.MondayNight} name="MondayNight" /*onClick={this.handleTimeToggle}*/ data-times="MondayNight" className="Monday Night" />}
                
                {timesObject.TuesdayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.TuesdayNight} name="TuesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayNight" className="Tuesday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.TuesdayNight} name="TuesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayNight" className="Tuesday Night" />}
                
                {timesObject.WednesdayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.WednesdayNight} name="WednesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayNight" className="Wednesday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.WednesdayNight} name="WednesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayNight" className="Wednesday Night" />}
                
                {timesObject.ThursdayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.ThursdayNight} name="ThursdayNight" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayNight" className="Thursday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.ThursdayNight} name="ThursdayNight" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayNight" className="Thursday Night" />}
                
                {timesObject.FridayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.FridayNight} name="FridayNight" /*onClick={this.handleTimeToggle}*/ data-times="FridayNight" className="Friday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.FridayNight} name="FridayNight" /*onClick={this.handleTimeToggle}*/ data-times="FridayNight" className="Friday Night" />}
                
                {timesObject.SaturdayNight ?
                <img alt="." src="/images/pinkNi.png" active={timesObject.SaturdayNight} name="SaturdayNight" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayNight" className="Saturday Night" />
                : <img alt="." src="/images/blueNi.png" active={timesObject.SaturdayNight} name="SaturdayNight" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayNight" className="Saturday Night" />}
              </Form.Group>  
            </Form>
              
            <Button name="" onClick={this.handleNext}> {<Icon name="plus" size="small" />} </Button>
          </div> 
        </ Card>
        }
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