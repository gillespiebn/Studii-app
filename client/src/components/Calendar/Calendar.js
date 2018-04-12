import React, { Component } from "react";
import "./Calendar.css";

class Calendar extends Component {

    state = {
        src: ""
    };
    
    getInitialState = () => {
      return {
        src: "/images/pinkMor.png"
      }
    };
    
    morningAvail = () => {
        event.preventDefault();
        if(this.state.src === "/images/pinkMor.png") {
            this.setState({src:"/images/blueMor.png"})
        } else {
            this.setState({src:"/images/pinkMor.png"})
        }
        
    };
    afternoonAvail = () => {
        event.preventDefault();
        if(this.state.src === "/images/pinkAft.png") {
            this.setState({src:"/images/blueAft.png"})
        } else {
            this.setState({src:"/images/pinkAft.png"})
        }
    };
    eveningAvail = () => {
        event.preventDefault();
        if(this.state.src === "/images/pinkEve.png") {
            this.setState({src:"/images/blueEve.png"})
        } else {
            this.setState({src:"/images/pinkEve.png"})
        }
    };
    nightAvail = () => {
        event.preventDefault();
        if(this.state.src === "/images/pinkNi.png") {
            this.setState({src:"/images/blueNi.png"})
        } else {
            this.setState({src:"/images/pinkNi.png"})
        }
    };

    render() {
      return (
            <div>
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Monday Morning" className="Monday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Monday Afternoon" className="Monday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Monday Evening" className="Monday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Monday Night" className="Monday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Tuesday Morning" className="Tuesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Tuesday Afternoon" className="Tuesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Tuesday Evening" className="Tuesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Tuesday Night" className="Tuesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Wednesday Morning" className="Wednesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Wednesday Afternoon" className="Wednesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Wednesday Evening" className="Wednesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Wednesday Night" className="Wednesday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Thursday Morning" className="Thursday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Thursday Afternoon" className="Thursday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Thursday Evening" className="Thursday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Thursday Night" className="Thursday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Friday Morning" className="Friday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Friday Afternoon" className="Friday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Friday Evening" className="Friday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Friday Night" className="Friday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Saturday Morning" className="Saturday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Saturday Afternoon" className="Saturday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Saturday Evening" className="Saturday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Saturday Night" className="Saturday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Sunday Morning" className="Sunday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Sunday Afternoon" className="Sunday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Sunday Evening" className="Sunday" />
              <img src={this.state.src} onClick={this.updateAvailability} data-times="Sunday Night" className="Sunday" />
            </div>
      )
    }
  }
  
  export default Calendar;