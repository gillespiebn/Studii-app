import React, { Component } from "react";
import API from '../../utils/API.js';
import { Segment, Container, Header, Icon, Input, Label, Form, Button, Search, Grid, Dropdown } from 'semantic-ui-react';
import "./SettingsCard.css"
import _ from 'lodash';
import vaSchools from '../../utils/vaSchools.js'
// import SearchForm from "../SearchForm";

const classStandingOptions = [
  { key: 'f', text: 'Freshman', value: 'freshman' },
  { key: 'so', text: 'Sophomore', value: 'sophomore' },
  { key: 'j', text: 'Junior', value: 'junior' },
  { key: 'se', text: 'Senior', value: 'senior' }
];

class SettingsCard extends Component {
  state = {
    facebook_id: this.props.facebook_id,
    schoolsForAutocomplete: vaSchools,
    user: this.props.user,
    name: '',
    email: '',
    school: '',
    classStanding: '',
    classID: '',
    classes: [],
    results: [],
    //change major and minor when they are created
    major: '',
    minor: 'None Selected',
    photo: '',
    methods: {
      flashcards: false,
      quizzes: false,
      rereading: false,
      revisionNotes: false,
      mneumonics: false,
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

  //this function is good
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

  //jordan worked on this part...it is working. the objToSave is the data structure that I need...facebook_id will change as it's working with fake data right now
  handleFormSubmit = event => {
    event.preventDefault();
    let schoolCode;
    for (var i = 0; i < this.state.schoolsForAutocomplete.length; i++) {
      if (this.state.school === this.state.schoolsForAutocomplete[i].name){
        schoolCode = this.state.schoolsForAutocomplete[i].code
      }
    }
    const objToSave = {
      isLoading: '',
      results: [],
      value: '',

      name: this.state.name,
      email: this.state.email,
      school: this.state.school,
      schoolCode: schoolCode,
      facebook_id: this.state.facebook_id + 1,
      classStanding: this.state.classStanding,
      classes: this.state.classes,
      methods: this.state.methods,
      times: this.state.times,
      locations: this.state.locations,
      photo: "https://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.pnghttps://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.png",
      major: this.state.major,
      minor: this.state.minor,

      flashcardActive: false,
    }
    // need to make check functions here. they will set states and if those states exist, they will highlight where something needs to change
    this.checkFunctions(objToSave);
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
    const location = {...this.state.location, [name]: !this.state.location[name]};
    this.setState({
      location
    });
  }
  
  handleTimeToggle = event => {
    event.preventDefault();
    const { name } = event.target;
    const time = {...this.state.time, [name]: !this.state.time[name]};
    this.setState({
      time
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
  }

  handleUpdateOne = event => {
    event.preventDefault();
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
    })
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


  //this starts all the search form autocomplete shit /////////////////////////////////////////////////////////////////////////////////////////
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ school: result.name })

  handleSearchChange = (e, { value }) => {

    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)
      // const tempResults = this.state.results.filter(result => result.state = this.state.state.toUpperCase())
      // this.setState({results: tempResults});

      this.setState({
        isLoading: false,
        results: _.filter(this.state.schoolsForAutocomplete, isMatch),
      })
    }, 300)
  }
  //this ends the autocomplete shit//////////////////////////////////////////////////////////////////////////////////////////////////
  
  renderClasses = () => {
    this.state.classes.map(clas => {
      const prefix = clas.split(":")[0].split("*").join(" ");
      const number = clas.split(":")[1]
      console.log(prefix + "     sss    " + number)
      return (
        // <Grid>
        //   <Grid.Column width={8}>
        //     <span>{prefix}: {number} </span>
        //   </Grid.Column>
        //   <Grid.Column width={8}>
        //     <Button size="tiny" onClick={this.deleteClass} name={clas} content="x" />
        //   </Grid.Column>
        // </Grid>
        <p>"WASZZZZZZZZUP"</p>
      )
    })
  }

  render() { 
    

    return(
      <Container>
        <Segment>
          <Container textAlign="center">
            <Header as="h2">User Settings</Header>
            {this.state.changesMade ?
              <Header as="h3" style={{color: "red"}}>Press "Update" to Save Changes</Header>
            : 
              ""
            }
          </Container>
          <Container>
            <Grid>
              <Grid.Column width={7}>
                <Button toggle /*active={this.state.edit.editName}*/ name="editName" onClick={this.handleEditToggle} data-methods="Edit Name" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={9} verticalAlign="middle">
                <Header as="h4">Name</Header>
              </ Grid.Column>
            </Grid>
            {this.state.edit.editName ?
              <Form>
                <Grid>
                  <Form.Field control={Input} label='Your First and Last Name'  width={12} className={`${this.state.nameProblem}`}>
                    <input type="text" placeholder={this.state.name} required name="nameUpdate" onChange={this.handleInputChange} />
                    {this.state.nameEmpty ?
                      <Label basic color="red" pointing="left">{`${this.state.nameEmpty}`}</Label>
                    : ""}
                  </Form.Field>
                  <Button onClick={this.handleUpdateOne} name="name" value={`${this.state.nameUpdate}*nameUpdate*editName`} size="small" content="Update" />
                </Grid>
              </Form>
            : 
              <span>Name: {this.state.name}</span>
            }
          </Container>
          {/* ///////////////////////// */}
          <Container>
            <Grid>
              <Grid.Column width={7}>
                <Button toggle /*active={this.state.edit.editName}*/ name="editEmail" onClick={this.handleEditToggle} data-methods="Edit Email" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={9} verticalAlign="middle">
                <Header as="h4">Email</Header>
              </ Grid.Column>
            </Grid>
            {this.state.edit.editEmail ?
              <Form>
                <Grid>
                  <Form.Field control={Input} label='Enter your .edu Email'  width={12} className={`${this.state.emailProblem}`}>
                    <input type="text" placeholder={this.state.email} required name="emailUpdate" onChange={this.handleInputChange} />
                      {this.state.emailEmpty ?
                            <Label basic color="red" pointing="left">{`${this.state.emailEmpty}`}</Label>
                          : ""}
                      {this.state.emailFormatProblem ?
                        <Label basic color="red" pointing="left">{`${this.state.emailFormatProblem}`}</Label>
                      : ""}
                  </Form.Field>
                  <Button onClick={this.handleUpdateOne} name="email" value={`${this.state.emailUpdate}*emailUpdate*editEmail`} size="small" content="Update" />
                </Grid>
              </Form>
            : 
              <span>Email: {this.state.email}</span>
            }
          </Container>
          {/* ////////////////////////////// */}
          <Grid>
            <Grid.Column width={8}>
              <Container>
                <Grid>
                  <Grid.Column width={7}>
                    <Button toggle /*active={this.state.edit.editName}*/ name="editMajor" onClick={this.handleEditToggle} data-methods="Edit Major" content={<Icon name="edit" large />} /> 
                  </Grid.Column>
                  <Grid.Column width={9} verticalAlign="middle">
                    <Header as="h4">Major</Header>
                  </ Grid.Column>
                </Grid>
                {this.state.edit.editMajor ?
                  <Form>
                    <Grid>
                      <Form.Field control={Input} label='Enter Your Major'  width={12} className={`${this.state.majorProblem}`}>
                        <input type="text" placeholder={this.state.major} required name="majorUpdate" onChange={this.handleInputChange} />
                          {this.state.majorEmpty ?
                                <Label basic color="red" pointing="left">{`${this.state.majorEmpty}`}</Label>
                              : ""}
                      </Form.Field>
                      <Button onClick={this.handleUpdateOne} name="major" value={`${this.state.majorUpdate}*majorUpdate*editMajor`} size="small" content="Update" />
                    </Grid>
                  </Form>
                : 
                  <span>Major: {this.state.major}</span>
                }
              </Container>
            </Grid.Column>
          {/* ////////////////////////////// */}
            <Grid.Column width={8}>
              <Container>
                <Grid>
                  <Grid.Column width={7}>
                    <Button toggle /*active={this.state.edit.editName}*/ name="editMinor" onClick={this.handleEditToggle} data-methods="Edit Minor" content={<Icon name="edit" large />} /> 
                  </Grid.Column>
                  <Grid.Column width={9} verticalAlign="middle">
                    <Header as="h4">Minor</Header>
                  </ Grid.Column>
                </Grid>
                {this.state.edit.editMinor ?
                  <Form>
                    <Grid>
                      <Form.Field control={Input} label='Enter Your Minor'  width={12} className={`${this.state.majorProblem}`}>
                        <input type="text" placeholder={this.state.minor} name="minorUpdate" onChange={this.handleInputChange} />
                      </Form.Field>
                      <Button onClick={this.handleUpdateOne} name="minor" value={`${this.state.minorUpdate}*minorUpdate*editMinor`} size="small" content="Update" />
                    </Grid>
                  </Form>
                : 
                  <span>Minor: {this.state.minor}</span>
                }
              </Container>
            </Grid.Column>
          </Grid>
          {/* ///////////////////////// */}
          <Container>
            <Grid>
              <Grid.Column width={7}>
                <Button toggle /*active={this.state.edit.editName}*/ name="editClassStanding" onClick={this.handleEditToggle} data-methods="Edit Class Standing" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={9} verticalAlign="middle">
                <Header as="h4">Class Standing</Header>
              </ Grid.Column>
            </Grid>
            {this.state.edit.editClassStanding ?
              <Form>
                <Grid>
                  <Form.Field control={Input} label='Enter Class Standing'  width={12} className={`${this.state.classStandingProblem}`}>
                    <input type="text" placeholder="ie: Senior, Junior, etc." required name="classStandingUpdate" onChange={this.handleInputChange} />
                      {this.state.classStandingEmpty ?
                            <Label basic color="red" pointing="left">{`${this.state.classStandingEmpty}`}</Label>
                          : ""}
                      {this.state.classStandingWrong ?
                        <Label basic color="red" pointing="left">{`${this.state.classStandingWrong}`}</Label>
                      : ""}
                  </Form.Field>
                  <Button onClick={this.handleUpdateOne} name="classStanding" value={`${this.state.classStandingUpdate}*classStandingUpdate*editClassStanding`} size="small" content="Update" />
                </Grid>
              </Form>
            : 
              <span>Class Standing: {this.state.classStanding}</span>
            }
          </Container>
          {/* ////////////////////////////// */}
          <Container>
            <Grid>
              <Grid.Column width={7}>
                <Button toggle /*active={this.state.edit.editName}*/ name="editClasses" onClick={this.handleEditToggle} data-methods="Edit Classes" content={<Icon name="edit" large />} /> 
              </Grid.Column>
              <Grid.Column width={9} verticalAlign="middle">
                <Header as="h4">Classes</Header>
              </ Grid.Column>
            </Grid>
            {this.state.edit.editClasses ?
              <div>






              <Form>




                <Grid>
                  <Form.Field control={Input} label='Enter Class Standing'  width={12} className={`${this.state.classStandingProblem}`}>
                    <input type="text" placeholder="ie: Senior, Junior, etc." required name="classStandingUpdate" onChange={this.handleInputChange} />
                      {this.state.classStandingEmpty ?
                            <Label basic color="red" pointing="left">{`${this.state.classStandingEmpty}`}</Label>
                          : ""}
                      {this.state.classStandingWrong ?
                        <Label basic color="red" pointing="left">{`${this.state.classStandingWrong}`}</Label>
                      : ""}
                  </Form.Field>
                  <Button onClick={this.handleUpdateOne} name="classStanding" value={`${this.state.classStandingUpdate}*classStandingUpdate*editClasses`} size="small" content="Update" />
                </Grid>
              </Form>
              </div>
            : 
            <div>
              {this.renderClasses()}
            </div>
              // <span>Class Standing: {this.state.classStanding}</span>
            }
          </Container>
          {/* ////////////////////////////// */}
        </Segment>
      </Container>
    )
  }
}

export default SettingsCard;
