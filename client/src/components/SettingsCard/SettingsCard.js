import React, { Component, Redirect } from "react";
import API from '../../utils/API.js';
import { Segment, Container, Header, Icon, Input, Label, Form, Button, Grid } from 'semantic-ui-react';
import "./SettingsCard.css"
import _ from 'lodash';
import vaSchools from '../../utils/vaSchools.js'
import classNamesSeed from '../../utils/classNames.js'
import SearchFormClasses from "../SearchFormClasses";
import Footer from "../Footer";
import NavMenu from "../NavMenu";



class SettingsCard extends Component {
  state = {
    facebook_id: this.props.facebook_id,
    schoolsForAutocomplete: vaSchools,
    classNamesForAutocomplete: classNamesSeed,
    user: this.props.user,
    name: '',
    email: '',
    school: '',
    classStanding: '',
    classID: '',
    classes: [],
    results: [],
    major: '',
    minor: 'None Selected',
    photo: '',
    methods: {
      flashcards: false,
      quizzes: false,
      rereading: false,
      notes: false,
      mnemonics: false,
      other: false
    },
    locations: {
      library: false,
      cafe: false,
      commons: false,
      home: false,
      online: false,
      other: false
    },
    times: {
      SundayMorning: false,
      SundayAfternoon: false,
      SundayEvening: false,
      SundayNight: false,
      MondayMorning: false,
      MondayAfternoon: false,
      MondayEvening: false,
      MondayNight: false,
      TuesdayMorning: false,
      TuesdayAfternoon: false,
      TuesdayEvening: false,
      TuesdayNight: false,
      WednesdayMorning: false,
      WednesdayAfternoon: false,
      WednesdayEvening: false,
      WednesdayNight: false,
      ThursdayMorning: false,
      ThursdayAfternoon: false,
      ThursdayEvening: false,
      ThursdayNight: false,
      FridayMorning: false,
      FridayAfternoon: false,
      FridayEvening: false,
      FridayNight: false,
      SaturdayMorning: false,
      SaturdayAfternoon: false,
      SaturdayEvening: false,
      SaturdayNight: false
    },
    edit: {
      editName: false,
      editEmail: false,
      editMajor: false,
      editMinor: false,
      editClassStanding: false,
  
    },
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
      });
  };

  handleAddClass = event => {
    event.preventDefault();
    let classArray=this.state.classes;
    classArray.push(this.state.classID);
    this.setState({
      classes: classArray,
      classID: ""
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let schoolCode;
    for (var i = 0; i < this.state.schoolsForAutocomplete.length; i++) {
      if (this.state.school === this.state.schoolsForAutocomplete[i].name){
        schoolCode = this.state.schoolsForAutocomplete[i].code
      }
    }


    const methodsObj = this.state.methods;
    const methodsArray = Object.keys(methodsObj)
      .filter(function(k){return methodsObj[k]})
      .map(String);


    const locationsObj = this.state.locations;
    const locationsArray = Object.keys(locationsObj)
      .filter(function(k){return locationsObj[k]})
      .map(String);


    const timesObj = this.state.times;
    const timesArray = Object.keys(timesObj)
      .filter(function(k){return timesObj[k]})
      .map(String);

    const objToSave = {
      isLoading: '',
      results: [],
      value: '',

      _id: this.props.user._id,
      name: this.state.name,
      email: this.state.email,
      school: this.state.school,
      schoolCode: schoolCode,
      facebook_id: this.state.facebook_id,
      classStanding: this.state.classStanding,
      classes: this.state.classes,
      methods: methodsArray,
      times: timesArray,
      locations: locationsArray,
      photo: "https://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.pnghttps://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.png",
      major: this.state.major,
      minor: this.state.minor,

      flashcardActive: false,
    }
    API.updateUser(objToSave).then(data =>{
      <Redirect to="/" />
      this.setState({changesMade: false})
      console.log(data);
    }).catch(err => console.log(err));
  };

  updateClassStanding = event => {
    event.preventDefault();
    let standing = this.state.classStanding
    standing.push(EventTarget.dataset.classStanding)
    this.setState({ classStanding: standing })
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.objLocations !== this.state.objLocations) {
      var locations = { };
      
      for (var i = 0; i < this.state.objLocations.length; i++) {
        var location = this.state.objLocations[i];
        locations[location] = !this.state.locations[location];
      }

      this.setState({ locations });
    }
    
    if (prevState.objMethods !== this.state.objMethods) {
      var methods = this.state.methods;
      
      for (var i = 0; i < this.state.objMethods.length; i++) {
        var method = this.state.objMethods[i];
        methods[method] = !this.state.methods[method];
      }

      this.setState({ methods });
    }

    if (prevState.objTimes !== this.state.objTimes) {
      var times = this.state.times;
      
      for (var i = 0; i < this.state.objTimes.length; i++) {
        var time = this.state.objTimes[i];
        times[time] = !this.state.times[time];
      }

      this.setState({ times });
    }
    if (prevState.minor !== this.state.minor) {
      if (!this.state.minor || this.state.minor === "null" || this.state.minor.trim() === "") {
        this.setState({minor: "None Currently Selected"})
      }
    }
  }

  componentDidMount() {
    this.setState({name: this.state.user.name, email: this.state.user.email, school: this.state.user.school, classStanding: this.state.user.classStanding, classes: this.state.user.classes, objMethods: this.props.user.methods, objLocations: this.props.user.locations, objTimes: this.props.user.times, major: this.state.user.major, minor: this.state.user.minor, photo: this.state.user.photo});
  }

  componentWillMount() {
    this.resetComponent()
  }

  handleMethodToggle = event => {
    event.preventDefault();
    const { name } = event.target;
    const methods = {...this.state.methods, [name]: !this.state.methods[name]};
    this.setState({
      methods
    });
  }

  handleLocationToggle = event => {
    event.preventDefault();
    const { name } = event.target;
    const locations = {...this.state.locations, [name]: !this.state.locations[name]};
    this.setState({
      locations
    });
  }
  
  handleTimeToggle = event => {
    event.preventDefault();
    const { name } = event.target;
    const times = {...this.state.times, [name]: !this.state.times[name]};
    this.setState({
      times
    });
  }

  handleEditToggle = event => {
    event.preventDefault();
    const { name } = event.target;
    const edit = {...this.state.edit, [name]: !this.state.edit[name]};
    this.setState({
      edit
    });
  }

  filterMethods = () => {
    return Object.keys(this.state.methods).filter((option, index) => this.state.methods[option]);
  }
  
  filterLocations = () => {
    return Object.keys(this.state.locations).filter((option, index) => this.state.locations[option]);
  }
  
  filterTimes = () => {
    return Object.keys(this.state.times).filter((option, index) => this.state.times[option]);
  }

  checkFunction = (state) => {
    this.setState({
      nameEmpty: false,
      emailEmpty: false,
      emailProblem: false,
      emailFormatProblem: false,
      majorProblem: false,
      majorEmpty: false,
      classStandingEmpty: false,
      classStandingWrong: false,
      classStandingProblem: false,
      classNumberEmpty: false,
      classNumberProblem: false,
      classPrefixEmpty: false,
      classPrefixProblem: false,
      
    })
    if (state === "nameUpdate") {
      if (!this.state.nameUpdate){
        this.setState({nameEmpty: "Please Enter Your Name", nameProblem: "error"})
        return true;
      }
    }
    if (state === "emailUpdate") {
      if (!this.state.emailUpdate){
        this.setState({emailEmpty: "Please Enter Your Email Address", emailProblem: "error"})
        return true;
      }
    }
    if (state === "emailUpdate") {          
      if(!this.state.emailUpdate.split("@")[1] || this.state.emailUpdate.split('@')[1].split('.')[1] !== "edu") {
        this.setState({ emailFormatProblem: "Please Enter a .edu Email Address", emailProblem: "error"})
        return true;
      }
    }
    if (state === "majorUpdate") {
      if (!this.state.majorUpdate){
        this.setState({majorEmpty: "Please Enter Your Major", majorProblem: "error"})
        return true;
      }
    }
    if (state === "classStandingUpdate") {
      if (!this.state.classStandingUpdate) {
        this.setState({classStandingEmpty: "Please Enter Your Class Standing", classStandingProblem: "error"});
        return true;
      }
      if (this.state.classStandingUpdate.toLowerCase() !== "senior" && this.state.classStandingUpdate.toLowerCase() !== "junior" && this.state.classStandingUpdate.toLowerCase() !== "sophomore" && this.state.classStandingUpdate.toLowerCase() !== "freshman" && this.state.classStandingUpdate.toLowerCase() !== "postgraduate") {
        this.setState({classStandingWrong: "Please use either Freshman, Sophomore, Junior, Senior, or Postgraduate" , classStandingProblem: "error" });
        return true;
      }
    }
    if (state === "newClass") {
      if(!this.state.value){
        this.setState({ classPrefixEmpty: "Please Enter a Prefix", classPrefixProblem: "error"})
        return true;
      }
      if (!this.state.classNumberUpdate){
        this.setState({classNumberEmpty: "Please Enter a Number", classNumberProblem: "error"});
        return true;
      }
    }
  }

  handleUpdateOne = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let update = value.split("*")[0]
    if (!update) {
      update = ' '
    }
    const stateOne = value.split("*")[1]
    const wrong = this.checkFunction(stateOne);
    if (wrong) {
      return;
    }
    const stateTwo = value.split("*")[2]
    this.setState({ [name]: update, [stateOne]: null, changesMade: true})
    const edit = {...this.state.edit, [stateTwo]: !this.state.edit[stateTwo]};
    this.setState({
      edit
    })
  }

  handleDeleteClass = event => {
    console.log(event.target.name);
    const { name } = event.target;
    let classArray = this.state.classes;
    const index = classArray.indexOf(name);
    if (index !== -1) {
      classArray.splice(index, 1);
    }
    this.setState({classes: classArray});
  } 

  handleAddClass = event => {
    const check = this.checkFunction("newClass");
    if (check){
      return;
    }
    let classArray = this.state.classes;
    classArray.push(this.state.classID.split(" ").join("*") + ":" + this.state.classNumberUpdate);
    this.setState({ classes: classArray, value: null, classNumberUpdate: null, changesMade: true});
    const edit = {...this.state.edit, editClasses: !this.state.edit.editClasses};
    this.setState({
      edit
    })
  }
  
  renderClasses = () => {
    return(
      <div>
        {this.state.classes.map((clas, i ) => (
          <Grid key={i}>
            <Grid.Column width={12}>
              <span>{clas.split(":")[0].split("*").join(" ")}: {clas.split(":")[1]}</span>
            </Grid.Column>
          </Grid>
        ))}
      </div>
    )
  }

  renderClassesToEdit = () => {
    return(
      <div>
        {this.state.classes.map(clas => (
          <Grid>
            <Grid.Column width={12}>
              <span>{clas.split(":")[0].split("*").join(" ")}: {clas.split(":")[1]}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button size="tiny" onClick={this.handleDeleteClass} name={clas} content="x" />
            </Grid.Column>
          </Grid>
        ))}
      </div>
    )
  }

  renderMethods = () => {
    return(
      <div>
      {this.state.objMethodsToSave ? 
        <Grid>
          {this.state.objMethodsToSave.map(method => (
            <div>
              <Grid.Column width={2}>
                <Button> {method} </Button>
              </Grid.Column>
            </div>
          ))}
        </Grid>
      :
        <div>
          {this.state.objMethods ? 
            <Grid>
              {this.state.objMethods.map(method => (
                <div>
                  <Grid.Column width={2}>
                    <Button> {method} </Button>
                  </Grid.Column>
                </div>
              ))}
            </Grid>
          :
            "" 
          }
        </div>
      }
      </div>
    )
  }

  handleUpdateMethods = event => {
    console.log(this.state.methods);
    const methodsObj = this.state.methods;
    const methodsArray = Object.keys(methodsObj)
      .filter(function(k){return methodsObj[k]})
      .map(String);
      
    this.setState({objMethodsToSave: methodsArray, changesMade: true});
    const edit = {...this.state.edit, editStudyMethods: !this.state.edit.editStudyMethods};
    this.setState ({
      edit
    });
    this.setState({methodsToSave: this.state.methods})
  }

  renderLocations = () => {
    return(
      <div>
      {this.state.objLocationsToSave ? 
        <Grid>
          {this.state.objLocationsToSave.map(method => (
            <div>
              <Grid.Column width={2}>
                <Button> {method} </Button>
              </Grid.Column>
            </div>
          ))}
        </Grid>
      :
        <div>
          {this.state.objLocations ? 
            <Grid>
              {this.state.objLocations.map(method => (
                <div>
                  <Grid.Column width={2}>
                    <Button> {method} </Button>
                  </Grid.Column>
                </div>
              ))}
            </Grid>
          :
            "" 
          }
        </div>
      }
      </div>
    )
  }

  renderTimes = () => {
    return(
      <Form className="calendar settingsCalendar" styles={{marginLeft: "auto"}}> 
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
          {this.state.times.SundayMorning ?
            <img alt="." src="/images/pinkMor.png" active={this.state.times.SundayMorning} name="SundayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SundayMorning" className="Sunday Morning" />
          : 
            <img alt="." src="/images/blueMor.png" active={this.state.times.SundayMorning} name="SundayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SundayMorning" className="Sunday Morning" />
          }
          
          {this.state.times.MondayMorning ?
          <img alt="." src="/images/pinkMor.png" active={this.state.times.MondayMorning} name="MondayMorning" /*onClick={this.handleTimeToggle}*/ data-times="MondayMorning" className="Monday Morning" />
          : <img alt="." src="/images/blueMor.png" active={this.state.times.MondayMorning} name="MondayMorning" /*onClick={this.handleTimeToggle}*/ data-times="MondayMorning" className="Monday Morning" />}
          
          {this.state.times.TuesdayMorning ?
          <img alt="." src="/images/pinkMor.png" active={this.state.times.TuesdayMorning} name="TuesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayMorning" className="Tuesday Morning" />
          : <img alt="." src="/images/blueMor.png" active={this.state.times.TuesdayMorning} name="TuesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayMorning" className="Tuesday Morning" />}
          
          {this.state.times.WednesdayMorning ?
          <img alt="." src="/images/pinkMor.png" active={this.state.times.WednesdayMorning} name="WednesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayMorning" className="Wednesday Morning" />
          : <img alt="." src="/images/blueMor.png" active={this.state.times.WednesdayMorning} name="WednesdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayMorning" className="Wednesday Morning" />}
          
          {this.state.times.ThursdayMorning ?
          <img alt="." src="/images/pinkMor.png" active={this.state.times.ThursdayMorning} name="ThursdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayMorning" className="Thursday Morning" />
          : <img alt="." src="/images/blueMor.png" active={this.state.times.ThursdayMorning} name="ThursdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayMorning" className="Thursday Morning" />}
          
          {this.state.times.FridayMorning ?
          <img alt="." src="/images/pinkMor.png" active={this.state.times.FridayMorning} name="FridayMorning" /*onClick={this.handleTimeToggle}*/ data-times="FridayMorning" className="Friday Morning" />
          : <img alt="." src="/images/blueMor.png" active={this.state.times.FridayMorning} name="FridayMorning" /*onClick={this.handleTimeToggle}*/ data-times="FridayMorning" className="Friday Morning" />}
          
          {this.state.times.SaturdayMorning ?
          <img alt="." src="/images/pinkMor.png" active={this.state.times.SaturdayMorning} name="SaturdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayMorning" className="Saturday Morning" />
          : <img alt="." src="/images/blueMor.png" active={this.state.times.SaturdayMorning} name="SaturdayMorning" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayMorning" className="Saturday Morning" />}
          
          </Form.Group>
          <Form.Group className="timebtnAf" widths="equal"> 
          <div className="timeFrameLabels aftLabel">Afternoon</div>
            {this.state.times.SundayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.SundayAfternoon} name="SundayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SundayAfternoon" className="Sunday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.SundayAfternoon} name="SundayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SundayAfternoon" className="Sunday Afternoon" />}
          
          {this.state.times.MondayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.MondayAfternoon} name="MondayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="MondayAfternoon" className="Monday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.MondayAfternoon} name="MondayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="MondayAfternoon" className="Monday Afternoon" />}
          
          {this.state.times.TuesdayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayAfternoon" className="Tuesday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayAfternoon" className="Tuesday Afternoon" />}
          
          {this.state.times.WednesdayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayAfternoon" className="Wednesday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayAfternoon" className="Wednesday Afternoon" />}
          
          {this.state.times.ThursdayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayAfternoon" className="Thursday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayAfternoon" className="Thursday Afternoon" />}
          
          {this.state.times.FridayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.FridayAfternoon} name="FridayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="FridayAfternoon" className="Friday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.FridayAfternoon} name="FridayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="FridayAfternoon" className="Friday Afternoon" />}
          
          {this.state.times.SaturdayAfternoon ?
          <img alt="." src="/images/pinkAft.png" active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayAfternoon" className="Saturday Afternoon" />
          : <img alt="." src="/images/blueAft.png" active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayAfternoon" className="Saturday Afternoon" />}
          </Form.Group>
          <Form.Group className="timebtnEv" widths="equal">
          <div className="timeFrameLabels eveLabel">Evening</div>
            {this.state.times.SundayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.SundayEvening} name="SundayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SundayEvening" className="Sunday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.SundayEvening} name="SundayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SundayEvening" className="Sunday Evening" />}
          
          {this.state.times.MondayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.MondayEvening} name="MondayEvening" /*onClick={this.handleTimeToggle}*/ data-times="MondayEvening" className="Monday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.MondayEvening} name="MondayEvening" /*onClick={this.handleTimeToggle}*/ data-times="MondayEvening" className="Monday Evening" />}
          
          {this.state.times.TuesdayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.TuesdayEvening} name="TuesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayEvening" className="Tuesday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.TuesdayEvening} name="TuesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayEvening" className="Tuesday Evening" />}
          
          {this.state.times.WednesdayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.WednesdayEvening} name="WednesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayEvening" className="Wednesday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.WednesdayEvening} name="WednesdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayEvening" className="Wednesday Evening" />}
          
          {this.state.times.ThursdayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.ThursdayEvening} name="ThursdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayEvening" className="Thursday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.ThursdayEvening} name="ThursdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayEvening" className="Thursday Evening" />}
          
          {this.state.times.FridayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.FridayEvening} name="FridayEvening" /*onClick={this.handleTimeToggle}*/ data-times="FridayEvening" className="Friday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.FridayEvening} name="FridayEvening" /*onClick={this.handleTimeToggle}*/ data-times="FridayEvening" className="Friday Evening" />}
          
          {this.state.times.SaturdayEvening ?
          <img alt="." src="/images/pinkEve.png" active={this.state.times.SaturdayEvening} name="SaturdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayEvening" className="Saturday Evening" />
          : <img alt="." src="/images/blueEve.png" active={this.state.times.SaturdayEvening} name="SaturdayEvening" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayEvening" className="Saturday Evening" />}
          </Form.Group>
          <Form.Group className="timebtnNi" widths="equal">   
          <div className="timeFrameLabels niLabel">Night</div>
            {this.state.times.SundayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.SundayNight} name="SundayNight" /*onClick={this.handleTimeToggle}*/ data-times="SundayNight" className="Sunday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.SundayNight} name="SundayNight" /*onClick={this.handleTimeToggle}*/ data-times="SundayNight" className="Sunday Night" />}
          
          {this.state.times.MondayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.MondayNight} name="MondayNight" /*onClick={this.handleTimeToggle}*/ data-times="MondayNight" className="Monday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.MondayNight} name="MondayNight" /*onClick={this.handleTimeToggle}*/ data-times="MondayNight" className="Monday Night" />}
          
          {this.state.times.TuesdayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.TuesdayNight} name="TuesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayNight" className="Tuesday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.TuesdayNight} name="TuesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="TuesdayNight" className="Tuesday Night" />}
          
          {this.state.times.WednesdayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.WednesdayNight} name="WednesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayNight" className="Wednesday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.WednesdayNight} name="WednesdayNight" /*onClick={this.handleTimeToggle}*/ data-times="WednesdayNight" className="Wednesday Night" />}
          
          {this.state.times.ThursdayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.ThursdayNight} name="ThursdayNight" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayNight" className="Thursday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.ThursdayNight} name="ThursdayNight" /*onClick={this.handleTimeToggle}*/ data-times="ThursdayNight" className="Thursday Night" />}
          
          {this.state.times.FridayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.FridayNight} name="FridayNight" /*onClick={this.handleTimeToggle}*/ data-times="FridayNight" className="Friday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.FridayNight} name="FridayNight" /*onClick={this.handleTimeToggle}*/ data-times="FridayNight" className="Friday Night" />}
          
          {this.state.times.SaturdayNight ?
          <img alt="." src="/images/pinkNi.png" active={this.state.times.SaturdayNight} name="SaturdayNight" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayNight" className="Saturday Night" />
          : <img alt="." src="/images/blueNi.png" active={this.state.times.SaturdayNight} name="SaturdayNight" /*onClick={this.handleTimeToggle}*/ data-times="SaturdayNight" className="Saturday Night" />}
        </Form.Group>  
      </Form>
        
    )
  }

  handleUpdateLocations = event => {
    console.log(this.state.locations);
    const locationsObj = this.state.locations;
    const locationsArray = Object.keys(locationsObj)
      .filter(function(k){return locationsObj[k]})
      .map(String);

    this.setState({objLocationsToSave: locationsArray, changesMade: true});
    const edit = {...this.state.edit, editLocations: !this.state.edit.editLocations};
    this.setState ({
      edit
    });
    this.setState({locationsToSave: this.state.locations})
  }

  handleUpdateTimes = event => {
    // console.log(this.state.times);
    const timesObj = this.state.times;
    const timesArray = Object.keys(timesObj)
      .filter(function(k){return timesObj[k]})
      .map(String);

    this.setState({objTimesToSave: timesArray, changesMade: true});
    const edit = {...this.state.edit, editTimes: !this.state.edit.editTimes};
    this.setState ({
      edit
    });
    this.setState({timesToSave: this.state.times})
  }



      //AUTOCOMPLETE for University Search
      resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

      handleResultSelect = (e, { result }) => this.setState({ school: result.name })
    
      handleSearchChange = (e, { value }) => {

        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.name)

          this.setState({
            isLoading: false,
            results: _.filter(this.state.schoolsForAutocomplete, isMatch),
          })
        }, 300)
      }

      //END AUTOCOMPLETE for Universities

      //AUTCOMPLETE for classes
      resetComponentClass = () => this.setState({ isLoading: false, results: [], valueClass: '' })

      handleResultSelectClass = (e, { result }) => this.setState({ classID: result.fullName })
    
      handleSearchChangeClass = (e, { value }) => {

        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.fullName)
    
          this.setState({
            isLoading: false,
            results: _.filter(this.state.classNamesForAutocomplete, isMatch),
          })
        }, 300)
      }
      //this ends the autocomplete shit//////////////////////////////////////////////////////////////////////////////////////////////////

  render() { 
    return(
      <Container fluid>
        <Segment>
        <NavMenu />
          <Container textAlign="center">
            <h3 style={{ marginTop: 20}} className="registerTitle">Update Settings</h3>
            {this.state.changesMade ?
              <Header as="h3" style={{color: "red"}}>Press "Update" to Save Changes</Header>
            : 
              ""
            }
          </Container>
          <Container>
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editName" onClick={this.handleEditToggle} data-methods="Edit Name" content={<Icon name="edit" medium />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editName ?
                  <Form>
                    <Form.Field control={Input} className={`${this.state.nameProblem}`}>
                        <input type="text" placeholder="Change Your First Name and Last Name" required name="nameUpdate" onChange={this.handleInputChange} />
                        {this.state.nameEmpty ?
                          <Label basic color="red" pointing="left">{`${this.state.nameEmpty}`}</Label>
                        : ""}
                    </Form.Field>
                    <Button className="updateBtn" onClick={this.handleUpdateOne} name="name" value={`${this.state.nameUpdate}*nameUpdate*editName`} size="small" content="Update" />
                  </Form>
                : 
                  <span>Name: {this.state.name}</span>
                }
                </ Grid.Column>
              </Grid>
          </Container>
          <Container>
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editEmail" onClick={this.handleEditToggle} data-methods="Edit Email" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editEmail ?
                  <Form>
                    <Form.Field control={Input} className={`${this.state.emailProblem}`}>
                      <input type="text" placeholder="Change Your Email" required name="emailUpdate" onChange={this.handleInputChange} />
                        {this.state.emailEmpty ?
                              <Label basic color="red" pointing="left">{`${this.state.emailEmpty}`}</Label>
                            : ""}
                        {this.state.emailFormatProblem ?
                          <Label basic color="red" pointing="left">{`${this.state.emailFormatProblem}`}</Label>
                        : ""}
                    </Form.Field>
                    <Button className="updateBtn" onClick={this.handleUpdateOne} name="email" value={`${this.state.emailUpdate}*emailUpdate*editEmail`} size="small" content="Update" />
                  </Form>
                : 
                  <span>Email: {this.state.email}</span>
                }
              </Grid.Column>
            </Grid>    
          </Container>
          <Container>
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editMajor" onClick={this.handleEditToggle} data-methods="Edit Major" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editMajor ?
                  <Form>
                      <Form.Field control={Input} className={`${this.state.majorProblem}`}>
                        <input type="text" placeholder="Change Your Major" required name="majorUpdate" onChange={this.handleInputChange} />
                          {this.state.majorEmpty ?
                                <Label basic color="red" pointing="left">{`${this.state.majorEmpty}`}</Label>
                              : ""}
                      </Form.Field>
                      <Button className="updateBtn" onClick={this.handleUpdateOne} name="major" value={`${this.state.majorUpdate}*majorUpdate*editMajor`} size="small" content="Update" />
                  </Form>
                  : 
                    <span>Major: {this.state.major}</span>
                  }
              </Grid.Column>
            </Grid>  
          </Container>
          <Container>
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editMinor" onClick={this.handleEditToggle} data-methods="Edit Minor" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editMinor ?
                  <Form>
                    <Form.Field control={Input} className={`${this.state.majorProblem}`}>
                      <input type="text" placeholder="Change Your Minor" name="minorUpdate" onChange={this.handleInputChange} />
                    </Form.Field>
                    <Button className="updateBtn" onClick={this.handleUpdateOne} name="minor" value={`${this.state.minorUpdate}*minorUpdate*editMinor`} size="small" content="Update" />
                  </Form>
                : 
                  <span>Minor: {this.state.minor}</span>
                }
              </Grid.Column>
            </Grid>    
          </Container>
          <Container>
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editClassStanding" onClick={this.handleEditToggle} data-methods="Edit Class Standing" content={<Icon name="edit" large />} /> 
              </Grid.Column>
            <Grid.Column width={12}>
            {this.state.edit.editClassStanding ?
              <Form>
                  <Form.Field control={Input} className={`${this.state.classStandingProblem}`}>
                    <input type="text" placeholder="Update Your Classing Standing, i.e. Senior, Junior, etc." required name="classStandingUpdate" onChange={this.handleInputChange} />
                      {this.state.classStandingEmpty ?
                            <Label basic color="red" pointing="left">{`${this.state.classStandingEmpty}`}</Label>
                          : ""}
                      {this.state.classStandingWrong ?
                        <Label basic color="red" pointing="left">{`${this.state.classStandingWrong}`}</Label>
                      : ""}
                  </Form.Field>
                  <Button className="updateBtn" onClick={this.handleUpdateOne} name="classStanding" value={`${this.state.classStandingUpdate}*classStandingUpdate*editClassStanding`} size="small" content="Update" />
              </Form>
            : 
              <span>Class Standing: {this.state.classStanding}</span>
            }
            </Grid.Column>
            </Grid>
          </Container>
          <Container>
          <h4 className="h4Title" style={{textAlign: "center"}}>Add/Remove Your Classes</h4>            
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editClasses" onClick={this.handleEditToggle} data-methods="Edit Classes" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editClasses ?
                  <div> 
                    {this.renderClassesToEdit()}
                    <Grid>
                        {this.state.classPrefixEmpty ?
                          <Label basic color="red" pointing="below">{`${this.state.classPrefixEmpty}`}</Label>
                        : ""}
                        <SearchFormClasses
                          width={6}
                          style={{minWidth: 150}}
                          fluid
                          className={`${this.state.classPrefixProblem}`}
                          loading={this.stateisLoadingClass}
                          onResultSelect={this.handleResultSelectClass}
                          onSearchChange={_.debounce(this.handleSearchChangeClass, 500, { leading: true })}
                          results={this.state.results}
                          value={this.state.valueClass}
                          {...this.props}  
                        />
                      <Grid.Column>
                        <Form.Field control={Input} className={`${this.state.classNumberProblem}`}>
                          <input type="text" placeholder="Enter New Class Number, ie: 101" required name="classNumberUpdate" onChange={this.handleInputChange} />
                          {this.state.classNumberEmpty ?
                            <Label basic color="red" pointing="left">{`${this.state.classNumberEmpty}`}</Label>
                          : ""}
                        </Form.Field>
                      </Grid.Column>
                      <Button className="updateClassBtn" width={2} onClick={this.handleAddClass} name="class" value={`${this.state.classNumberUpdate}*${this.state.value}*classNumberUpdate*value*editClasses`} size="small" content="Update" />
                  </Grid> 
                  </div> 
                : 
                <div>
                  {this.renderClasses()}
                </div>
              }
              </Grid.Column>
            </Grid>
          </Container>
          <h4 className="h4Title" style={{textAlign: "center"}}>Change Your Preferred Study Methods</h4>            
          <Container>
            <Grid>
              <Grid.Column width={2}>
                <Button toggle className="editBtn" name="editStudyMethods" onClick={this.handleEditToggle} data-methods="Edit Preferred Study Methods" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editStudyMethods ?
                  <Form>
                    <Form.Group widths="equal">
                      <Button className="preferbtn" toggle={this.state.methods.flashcards} name="flashcards" onClick={this.handleMethodToggle} active={this.state.methods} data-methods="Flashcards" >Flashcards </Button>
                      <Button className="preferbtn" toggle={this.state.methods.quizzes} onClick={this.handleMethodToggle} active={this.state.methods} name="quizzes" data-methods="Quizzes" > Quizzes </Button>
                      <Button className="preferbtn" toggle={this.state.methods.rereading} name="rereading" onClick={this.handleMethodToggle} active={this.state.methods}  data-methods="Rereading" > Rereading </Button>
                    </Form.Group>
                    <Form.Group widths="equal">  
                      <Button className="preferBtn" toggle={this.state.methods.notes} name="notes" onClick={this.handleMethodToggle} active={this.state.methods} data-methods="notes" > notes </Button>
                      <Button className="preferBtn" toggle={this.state.methods.mnemonics} name="mnemonics" onClick={this.handleMethodToggle} active={this.state.methods} data-methods="Mnemonics" > Mnemonics </Button>
                      <Button className="preferBtn" toggle={this.state.methods.other} name="other" onClick={this.handleMethodToggle} active={this.state.methods} data-methods="Other" > Other </Button>
                    </Form.Group>
                    <Form.Group>
                      <Button className="updateBtn" onClick={this.handleUpdateMethods} name="methods" /*value={`${this.state.methodsUpdate}*${this.state.value}*classNumberUpdate*value*editClasses`}*/ size="small" content="Update" />
                    </Form.Group>
                  </Form>
                : 
                  <div>
                    {this.renderMethods()}
                  </div>
                }
              </Grid.Column>
            </Grid>    
          </Container>
          <h4 className="h4Title" style={{textAlign: "center"}}>Change Your Preferred Study Locations</h4>            
          <Container>
            <Grid>
              <Grid.Column width={2} style={{height: "250px"}}>
                <Button toggle className="editBtn" name="editLocations" onClick={this.handleEditToggle} data-methods="Edit Preferred Study Locations" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editLocations ?
                  <Form>
                    <Form.Group widths="equal">
                      <Button active={this.state.locations} className="preferbtn" toggle={this.state.locations.library} name="library"  onClick={this.handleLocationToggle}data-locations="Library">Library</Button>
                      <Button active={this.state.locations} className="preferbtn" toggle={this.state.locations.online} name="online" onClick={this.handleLocationToggle}data-locations="Online">Online</Button>
                      <Button active={this.state.locations} className="preferbtn" toggle={this.state.locations.commons} name="commons"  onClick={this.handleLocationToggle}data-locations="Commons">Commons</Button>
                    </Form.Group>
                    <Form.Group widths="equal">  
                      <Button active={this.state.locations} className="preferbtn" toggle={this.state.locations.cafe} name="cafe" onClick={this.handleLocationToggle}data-locations="Cafe">Cafe</Button>
                      <Button active={this.state.locations} className="preferbtn" toggle={this.state.locations.home} name="home" onClick={this.handleLocationToggle}data-locations="Home">Home</Button>
                      <Button active={this.state.locations} className="preferbtn" toggle={this.state.locations.other} name="other" onClick={this.handleLocationToggle}data-locations="Other">Other</Button>
                    </Form.Group>
                    <Form.Group>
                      <Button className="updateBtn" onClick={this.handleUpdateLocations} name="locations" /*value={`${this.state.methodsUpdate}*${this.state.value}*classNumberUpdate*value*editClasses`}*/ size="small" content="Update" />
                    </Form.Group>
                  </Form>
                : 
                  <div>
                    {this.renderLocations()}
                  </div>
                }
              </Grid.Column>
            </Grid>    
          </Container>


          <h4 className="h4Title" style={{textAlign: "center"}}>Change Your Preferred Study Times</h4>            
          <Container className="calendar settingsCalendar" id="settingsCalendar" style={{marginLeft: "auto"}}>
            <Grid>
              <Grid.Column width={2} style={{height: "250px"}}>
                <Button toggle className="editBtn"/*active={this.state.edit.editName}*/ name="editTimes" onClick={this.handleEditToggle} data-methods="Edit Preferred Study Times" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.edit.editTimes ?
                  <Form>
                    <h4 className="registerTitle">Preferred Study Time</h4>
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
                        {this.state.times.SundayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.SundayMorning} name="SundayMorning" onClick={this.handleTimeToggle} data-times="SundayMorning" className="Sunday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.SundayMorning} name="SundayMorning" onClick={this.handleTimeToggle} data-times="SundayMorning" className="Sunday Morning" />}
                      
                      {this.state.times.MondayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.MondayMorning} name="MondayMorning" onClick={this.handleTimeToggle} data-times="MondayMorning" className="Monday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.MondayMorning} name="MondayMorning" onClick={this.handleTimeToggle} data-times="MondayMorning" className="Monday Morning" />}
                      
                      {this.state.times.TuesdayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.TuesdayMorning} name="TuesdayMorning" onClick={this.handleTimeToggle} data-times="TuesdayMorning" className="Tuesday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.TuesdayMorning} name="TuesdayMorning" onClick={this.handleTimeToggle} data-times="TuesdayMorning" className="Tuesday Morning" />}
                      
                      {this.state.times.WednesdayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.WednesdayMorning} name="WednesdayMorning" onClick={this.handleTimeToggle} data-times="WednesdayMorning" className="Wednesday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.WednesdayMorning} name="WednesdayMorning" onClick={this.handleTimeToggle} data-times="WednesdayMorning" className="Wednesday Morning" />}
                      
                      {this.state.times.ThursdayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.ThursdayMorning} name="ThursdayMorning" onClick={this.handleTimeToggle} data-times="ThursdayMorning" className="Thursday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.ThursdayMorning} name="ThursdayMorning" onClick={this.handleTimeToggle} data-times="ThursdayMorning" className="Thursday Morning" />}
                      
                      {this.state.times.FridayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.FridayMorning} name="FridayMorning" onClick={this.handleTimeToggle} data-times="FridayMorning" className="Friday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.FridayMorning} name="FridayMorning" onClick={this.handleTimeToggle} data-times="FridayMorning" className="Friday Morning" />}
                    
                      {this.state.times.SaturdayMorning ?
                      <img alt="." src="/images/pinkMor.png" active={this.state.times.SaturdayMorning} name="SaturdayMorning" onClick={this.handleTimeToggle} data-times="SaturdayMorning" className="Saturday Morning" />
                      : <img alt="." src="/images/blueMor.png" active={this.state.times.SaturdayMorning} name="SaturdayMorning" onClick={this.handleTimeToggle} data-times="SaturdayMorning" className="Saturday Morning" />}
                  
                    </Form.Group>
                    <Form.Group className="timebtnAf" widths="equal"> 
                      <div className="timeFrameLabels aftLabel">Afternoon</div>
                        {this.state.times.SundayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.SundayAfternoon} name="SundayAfternoon" onClick={this.handleTimeToggle} data-times="SundayAfternoon" className="Sunday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.SundayAfternoon} name="SundayAfternoon" onClick={this.handleTimeToggle} data-times="SundayAfternoon" className="Sunday Afternoon" />}
                      
                      {this.state.times.MondayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.MondayAfternoon} name="MondayAfternoon" onClick={this.handleTimeToggle} data-times="MondayAfternoon" className="Monday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.MondayAfternoon} name="MondayAfternoon" onClick={this.handleTimeToggle} data-times="MondayAfternoon" className="Monday Afternoon" />}
                      
                      {this.state.times.TuesdayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" onClick={this.handleTimeToggle} data-times="TuesdayAfternoon" className="Tuesday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" onClick={this.handleTimeToggle} data-times="TuesdayAfternoon" className="Tuesday Afternoon" />}
                      
                      {this.state.times.WednesdayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" onClick={this.handleTimeToggle} data-times="WednesdayAfternoon" className="Wednesday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" onClick={this.handleTimeToggle} data-times="WednesdayAfternoon" className="Wednesday Afternoon" />}
                      
                      {this.state.times.ThursdayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" onClick={this.handleTimeToggle} data-times="ThursdayAfternoon" className="Thursday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" onClick={this.handleTimeToggle} data-times="ThursdayAfternoon" className="Thursday Afternoon" />}
                      
                      {this.state.times.FridayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.FridayAfternoon} name="FridayAfternoon" onClick={this.handleTimeToggle} data-times="FridayAfternoon" className="Friday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.FridayAfternoon} name="FridayAfternoon" onClick={this.handleTimeToggle} data-times="FridayAfternoon" className="Friday Afternoon" />}
                    
                      {this.state.times.SaturdayAfternoon ?
                      <img alt="." src="/images/pinkAft.png" active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" onClick={this.handleTimeToggle} data-times="SaturdayAfternoon" className="Saturday Afternoon" />
                      : <img alt="." src="/images/blueAft.png" active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" onClick={this.handleTimeToggle} data-times="SaturdayAfternoon" className="Saturday Afternoon" />}
                    </Form.Group>
                    <Form.Group className="timebtnEv" widths="equal">
                      <div className="timeFrameLabels eveLabel">Evening</div>
                        {this.state.times.SundayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.SundayEvening} name="SundayEvening" onClick={this.handleTimeToggle} data-times="SundayEvening" className="Sunday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.SundayEvening} name="SundayEvening" onClick={this.handleTimeToggle} data-times="SundayEvening" className="Sunday Evening" />}
                      
                      {this.state.times.MondayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.MondayEvening} name="MondayEvening" onClick={this.handleTimeToggle} data-times="MondayEvening" className="Monday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.MondayEvening} name="MondayEvening" onClick={this.handleTimeToggle} data-times="MondayEvening" className="Monday Evening" />}
                      
                      {this.state.times.TuesdayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.TuesdayEvening} name="TuesdayEvening" onClick={this.handleTimeToggle} data-times="TuesdayEvening" className="Tuesday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.TuesdayEvening} name="TuesdayEvening" onClick={this.handleTimeToggle} data-times="TuesdayEvening" className="Tuesday Evening" />}
                      
                      {this.state.times.WednesdayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.WednesdayEvening} name="WednesdayEvening" onClick={this.handleTimeToggle} data-times="WednesdayEvening" className="Wednesday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.WednesdayEvening} name="WednesdayEvening" onClick={this.handleTimeToggle} data-times="WednesdayEvening" className="Wednesday Evening" />}
                      
                      {this.state.times.ThursdayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.ThursdayEvening} name="ThursdayEvening" onClick={this.handleTimeToggle} data-times="ThursdayEvening" className="Thursday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.ThursdayEvening} name="ThursdayEvening" onClick={this.handleTimeToggle} data-times="ThursdayEvening" className="Thursday Evening" />}
                      
                      {this.state.times.FridayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.FridayEvening} name="FridayEvening" onClick={this.handleTimeToggle} data-times="FridayEvening" className="Friday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.FridayEvening} name="FridayEvening" onClick={this.handleTimeToggle} data-times="FridayEvening" className="Friday Evening" />}
                    
                      {this.state.times.SaturdayEvening ?
                      <img alt="." src="/images/pinkEve.png" active={this.state.times.SaturdayEvening} name="SaturdayEvening" onClick={this.handleTimeToggle} data-times="SaturdayEvening" className="Saturday Evening" />
                      : <img alt="." src="/images/blueEve.png" active={this.state.times.SaturdayEvening} name="SaturdayEvening" onClick={this.handleTimeToggle} data-times="SaturdayEvening" className="Saturday Evening" />}
                    </Form.Group>

                    <Form.Group className="timebtnNi" widths="equal">   
                      <div className="timeFrameLabels niLabel">Night</div>
                        {this.state.times.SundayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.SundayNight} name="SundayNight" onClick={this.handleTimeToggle} data-times="SundayNight" className="Sunday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.SundayNight} name="SundayNight" onClick={this.handleTimeToggle} data-times="SundayNight" className="Sunday Night" />}
                      
                      {this.state.times.MondayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.MondayNight} name="MondayNight" onClick={this.handleTimeToggle} data-times="MondayNight" className="Monday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.MondayNight} name="MondayNight" onClick={this.handleTimeToggle} data-times="MondayNight" className="Monday Night" />}
                      
                      {this.state.times.TuesdayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.TuesdayNight} name="TuesdayNight" onClick={this.handleTimeToggle} data-times="TuesdayNight" className="Tuesday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.TuesdayNight} name="TuesdayNight" onClick={this.handleTimeToggle} data-times="TuesdayNight" className="Tuesday Night" />}
                      
                      {this.state.times.WednesdayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.WednesdayNight} name="WednesdayNight" onClick={this.handleTimeToggle} data-times="WednesdayNight" className="Wednesday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.WednesdayNight} name="WednesdayNight" onClick={this.handleTimeToggle} data-times="WednesdayNight" className="Wednesday Night" />}
                      
                      {this.state.times.ThursdayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.ThursdayNight} name="ThursdayNight" onClick={this.handleTimeToggle} data-times="ThursdayNight" className="Thursday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.ThursdayNight} name="ThursdayNight" onClick={this.handleTimeToggle} data-times="ThursdayNight" className="Thursday Night" />}
                      
                      {this.state.times.FridayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.FridayNight} name="FridayNight" onClick={this.handleTimeToggle} data-times="FridayNight" className="Friday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.FridayNight} name="FridayNight" onClick={this.handleTimeToggle} data-times="FridayNight" className="Friday Night" />}
                    
                      {this.state.times.SaturdayNight ?
                      <img alt="." src="/images/pinkNi.png" active={this.state.times.SaturdayNight} name="SaturdayNight" onClick={this.handleTimeToggle} data-times="SaturdayNight" className="Saturday Night" />
                      : <img alt="." src="/images/blueNi.png" active={this.state.times.SaturdayNight} name="SaturdayNight" onClick={this.handleTimeToggle} data-times="SaturdayNight" className="Saturday Night" />}
                    </Form.Group>
                    <Form.Group>
                      <Button className="updateBtn" onClick={this.handleUpdateTimes} name="times" /*value={`${this.state.methodsUpdate}*${this.state.value}*classNumberUpdate*value*editClasses`}*/ size="small" content="Update" />
                    </Form.Group>
                  </Form>
                : 
                  <div>
                    {this.renderTimes()}
                  </div>
                }
              </Grid.Column>
            </Grid>    
          </Container>
          {this.state.changesMade ? 
            <div>
              <Button content="Save Changes" onClick={this.handleFormSubmit} />
              <Button red content="Cancel Changes" onClick={this.handleFormSubmit} />
            </div>
          :
            ""
          }
        </Segment>
      <Footer />  
      </Container>
    )
  }
}

export default SettingsCard;
