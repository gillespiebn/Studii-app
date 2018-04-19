import React from "react";
import "./PracticeProfileLayout.css";
import API from "../../utils/API";
import NavMenu from "../NavMenu";
import { Form, Card, Image, Button, Transition, Divider, Icon, Grid } from 'semantic-ui-react'

const transition = ['fade']

class Profiles extends React.Component {  

  state = {
    user: this.props.user,
    matches: this.props.matches,
    facebook_id: this.props.facebook_id,
    index: 0,
    animation: transition[0],
    duration: 1000,
    visible: true
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  getUser = () => {
    API.getUser(this.props.facebook_id)
      .then(data => {
        this.setState({user: data.data[0]})
      }
    )
  };

  handleNext = () => {
    if (this.state.index + 1 === this.state.matches.length){
      this.setState({noMoreMatches: true});
    }
    this.setState({index: this.state.index + 1})
    this.setState({visible: !this.state.visible})
    if (!this.state.visble) {
       window.setTimeout(() => {
          this.setState({visble: true})
          console.log("There is a fairy");
          }, 1000)
     }
  
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

    const { animation, duration, visible } = this.state

    return(
   
      <div>
           
       <Transition.Group animation={animation} duration={duration} visible={visible}>
        
        <Card className="cardContainer" fluid align="center" key={profile._id} >  
        <NavMenu />
        <div className="imgDiv"></div>
          <div className="profileDiv">
          <Image className="cardImage" src={profile.photo} size='small' />
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
              <h2>Classes</h2>
              {profile.classes ?
                profile.classes.map((clas, i) => (
                  <h4 key={i}>{clas.split(":")[0].split("*").join(" ")}: {clas.split(":")[1]}</h4>
                ))
              :
                <p>if this shown...something has gone terribly wrong and the server is probably on fire</p>
              }
            <Divider />
            </div>
            <h2>Study Methods</h2>
            <Grid id="methods">
              {profile.methods.map((method, i) => (
                <div key={i}>
                  <Grid.Column width={2}>
                    <Button> {method} </Button>
                  </Grid.Column>
                </div>
              ))}
            </Grid>
            <h2>Preferred Locations</h2>
            <Grid id="locations">
              {profile.locations.map((location, i) => (
                <div key={i}>
                  <Grid.Column width={2}>
                    <Button> {location} </Button>
                  </Grid.Column>
                </div>
              ))}
            </Grid>
            <h2>Availability</h2>

            <Form className="calendar"> 
            <Form.Group className="timebtnMo" widths="equal">
                  <div className="dayTitles blank">  </div>
                  <div className="dayTitles su">Su</div>
                  <div className="dayTitles m">M</div>
                  <div className="dayTitles tu">Tu</div>
                  <div className="dayTitles w">W</div>
                  <div className="dayTitles th">Th</div>
                  <div className="dayTitles f">F</div>
                  <div className="dayTitles sa">Sa</div> 
                    </Form.Group>
              <Form.Group className="timebtnMo" widths="equal">
                <div className="timeFrameLabels morLabel">Morning</div>
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
                <div className="timeFrameLabels aftLabel">Afternoon</div>
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
                <div className="timeFrameLabels eveLabel">Evening</div>
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
                <div className="timeFrameLabels niLabel">Night</div>
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
              
            <Button name="" onClick={this.handleNext}> {<Icon name="triangle right" size="large" />} </Button>
          </div> 
        </ Card>
       </Transition.Group>
        
      </div>
    )
  }

  render() {
    return(
      <div>
      {this.state.matches ? 
        <div>
          {this.state.noMoreMatches ?
            ""
          :
            <div>
              {this.renderCard()}
            </div>
          }
        </div>
      :  
        <div>mathces didn't happen</div>
      }
      </div>
    )
  }
}

 export default Profiles;                 