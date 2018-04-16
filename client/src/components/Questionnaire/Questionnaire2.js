import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./Questionnaire.css";
// import TeacherInput from "../Teachers";
// import ClassInput from "../Classes";
import API from '../../utils/API.js';
import { Segment, Container, Header, Icon, Input, Label, Form, Button, Search, Grid, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
// import allSchools from '../../utils/allSchools.js'
// import twoSchools from '../../utils/twoSchools.js'
import vaSchools from '../../utils/vaSchools.js'
import classNamesSeed from '../../utils/classNames.js'
import SearchFormSchools from "../SearchFormSchools";
import SearchFormClasses from "../SearchFormClasses";
import Home from "../../pages/Home";

// import SearchFormSchoolsRenderer from "../SearchFormSchoolsRenderer";

// const source = allSchools;

class Questionnaire extends Component {
    state = {
        facebook_id: this.props.facebook_id,
        schoolsForAutocomplete: vaSchools,
        classNamesForAutocomplete: classNamesSeed,
        name: "",
        email: "",
        school: "",
        classStanding: "",
        classID: "",
        classIDNumber: '',
        classes: [],
        results: [],
        resultsClasses: [],
        major: '',
        minor: '',
        photo: '',
        state: '',
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
          online: false,
          commons: false,
          cafe: false,
          home: false,
          other: false
        },
        times: {
          SundayMorning: false,
          MondayMorning: false,
          TuesdayMorning: false,
          WednesdayMorning: false,
          ThursdayMorning: false,
          FridayMorning: false,
          SaturdayMorning: false,
          SundayAfternoon: false,
          MondayAfternoon: false,
          TuesdayAfternoon: false,
          WednesdayAfternoon: false,
          ThursdayAfternoon: false,
          FridayAfternoon: false,
          SaturdayAfternoon: false,
          SundayAfternoon: false,
          SundayEvening: false,
          MondayEvening: false,
          TuesdayEvening: false,
          WednesdayEvening: false,
          ThursdayEvening: false,
          FridayEvening: false,
          SaturdayEvening: false,
          SundayEvening: false,
          SundayNight: false,
          MondayNight: false,
          TuesdayNight: false,
          WednesdayNight: false,
          ThursdayNight: false,
          FridayNight: false,
          SaturdayNight: false,
          SundayNight: false
        } 
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

      createClass = event => {
        event.preventDefault();
        this.setState({prefixEmpty: null, prefixProblem: null, numberEmpty: null, numberProblem: null, numberWrong: null})
        let bad = false;
        if (!this.state.classID) {
          bad = true
          this.setState({prefixEmpty: "Please Enter Your Class Prefix", prefixProblem: "error"});
          bad = true;
        }
        if (!this.state.classIDNumber) {
          bad = true
          this.setState({numberEmpty: "Please Enter Your Class Number", numberProblem: "error"});
          bad = true;
        } else if (this.state.classIDNumber.length !== 3) {
          bad = true;
          this.setState({numberWrong: "Please Enter a 3 Digit Number", numberProblem: "error"})
        }
        if (bad) {
          return;
        }
        let nameArray = this.state.classID.split(" ");
        let stringToPush = nameArray.join("*") + ":" + this.state.classIDNumber;
        let newClasses = this.state.classes;
        newClasses.push(stringToPush);
        this.setState({classes: newClasses, classID: null, classIDNumber: null})
      }

      handleFormSubmit = event => {
        event.preventDefault();
        let schoolCode;
        for (var i = 0; i < this.state.schoolsForAutocomplete.length; i++) {
          if (this.state.school === this.state.schoolsForAutocomplete[i].name){
            schoolCode = this.state.schoolsForAutocomplete[i].code
          }
        }
        const objToSave = {
          name: this.state.name,
          email: this.state.email,
          school: this.state.school,
          schoolCode: schoolCode,
          facebook_id: this.state.facebook_id,
          classStanding: this.state.classStanding,
          classes: this.state.classes,
          methods: this.filterMethods(),
          times: this.filterTime(),
          locations: this.filterLocations(),
          photo: "https://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.pnghttps://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.png",
          major: this.state.major,
          minor: this.state.minor,
        }
        // need to make check functions here. they will set states and if those states exist, they will highlight where something needs to change
        this.checkFunctions(objToSave);
      };

      //jordan wrote this and it is good for now but needs to be updated. I can work on this part if you want.
      checkFunctions = (obj) => {
        this.setState({ 
          nameEmpty: false, nameProblem: false, 
          emailProblem: false, emailEmpty: false, emailFormatProblem: false, 
          majorEmpty: false, majorProblem: false,
          schoolEmpty: false, schoolProblem: false, schoolWrong: false,
          classStandingEmpty: false, classStandingProblem: false, classStandingWrong: false,
        });
        console.log("should be lower case: " + this.state.classStanding.toLowerCase());
        let bad = false;
        if (!this.state.name) {
          this.setState({nameEmpty: "Please Enter Your Name", nameProblem: "error"});
          bad = true;
        }
        if (!this.state.email) {
          this.setState({emailEmpty: "Please Enter Email Address", emailProblem: "error"})
          bad = true
        }
        if (this.state.email) {
          if(this.state.email.split('@')[1].split('.')[1] !== "edu") {
            console.log("this ran");
            this.setState({ emailFormatProblem: "Please Enter a .edu Email Address", emailProblem: "error"})
            bad = true;
          }
        }
        if (!this.state.major) {
          this.setState({majorEmpty: "Please Enter Your Major", majorProblem: "error"});
          bad = true;
        }
        if (!this.state.school) {
          this.setState({schoolEmpty: "Please Enter School Name", schoolProblem: "error"});
          bad = true;
        } else {
          let good = false;
          for (let i = 0; i < this.state.schoolsForAutocomplete.length; i++) {
            if (this.state.schoolsForAutocomplete[i].name === this.state.school) {
              good = true;
            }
          }
          if (!good) {
            this.setState({schoolWrong: "Please Select From the List", schoolProblem: "error"})
            bad = true;
          }
        }
        if (!this.state.classStanding) {
          this.setState({classStandingEmpty: "Please Choose Your Class Standing", classStandingProblem: "error"});
          bad = true;
        } else if (this.state.classStanding.toLowerCase() !== "senior" && this.state.classStanding.toLowerCase() !== "junior" && this.state.classStanding.toLowerCase() !== "sophomore" && this.state.classStanding.toLowerCase() !== "freshman" && this.state.classStanding.toLowerCase() !== "Postgraduate") {
          this.setState({classStandingWrong: "Please use either Freshman, Sophomore, Junior, Senior, or Postgraduate" , classStandingProblem: "error" });
          bad = true;
        }

        if (bad) {
          return;
        }
        this.setState({ continue: true })
        console.log("we got here");
        API.createUser(obj).then(data =>{
          this.setState({user: data.data, userCreatedGoToHome: true});
        }).catch(err => console.log(err));
      };
    

      updateClassStanding = event => {
        event.preventDefault();
        let standing = this.state.classStanding
        standing.push(EventTarget.dataset.classStanding)
        this.setState({ classStanding: standing })
      };

      //this is currently grabbing all the schools for the auto-complete and for grabbing the school code
      componentDidMount() {
        // API.getAllSchools().then(data => this.setState({schoolsForAutocomplete: data.data})).catch(err => console.log(err));
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

      filterMethods = () => {
        return Object.keys(this.state.methods).filter((option, index) => this.state.methods[option]);
      }

      filterLocations = () => {
        return Object.keys(this.state.locations).filter((option, index) => this.state.locations[option]);
      }

      filterTime = () => {
        return Object.keys(this.state.times).filter((option, index) => this.state.times[option]);
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
          // const tempResults = this.state.results.filter(result => result.state = this.state.state.toUpperCase())
          // this.setState({results: tempResults});
    
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
          // const tempResults = this.state.results.filter(result => result.state = this.state.state.toUpperCase())
          // this.setState({results: tempResults});
    
          this.setState({
            isLoading: false,
            results: _.filter(this.state.classNamesForAutocomplete, isMatch),
          })
        }, 300)
      }
      //this ends the autocomplete shit//////////////////////////////////////////////////////////////////////////////////////////////////


      render() { 

        <Route exact path="/" 
        render={(routeProps) => (
          <Home  
            user={this.state.user}
            facebook_id={this.state.facebook_id}
          />
        )} 
      />
        if (this.state.userCreatedGoToHome) {
          return (
            <Router>
              <Redirect 
                exact to='/home'
                // render={(routeProps) => (
                //   <Home  
                //     user={this.state.user}
                //     profiles={this.state.matches}
                //     facebook_id={this.state.facebook_id}
                //   />
                // )} 
              />
            </Router>
          )
        }
        return(
          <Container>
            <Segment style={{ marginTop: 20}} raised>
              <Container textAlign="center">
                <Header as="h2">Find a Studii Buddy</Header>
              </Container>
              <Container>
                <Form>
                  <Form.Group>
                    <Form.Field control={Input} label='Your First and Last Name'  width={16} className={`${this.state.nameProblem}`}>
                    <input type="text" placeholder="Enter First and Last Name Here" required name="name" onChange={this.handleInputChange} />
                    {this.state.nameEmpty ?
                      <Label basic color="red" pointing="left">{`${this.state.nameEmpty}`}</Label>
                    : ""}                      
                    </ Form.Field>
                  </Form.Group>
                  <Form.Group>  
                    <Form.Field control={Input} label="Your University Email Address (must be include .edu)" placeholder="Enter School (.edu) Email Address" className={`${this.state.emailProblem}`} width={16}>
                      <input type="email" required name="email" onChange={this.handleInputChange} />
                      {this.state.emailEmpty ?
                        <Label basic color="red" pointing="left">{`${this.state.emailEmpty}`}</Label>
                      : ""}
                      {this.state.emailFormatProblem ?
                        <Label basic color="red" pointing="left">{`${this.state.emailFormatProblem}`}</Label>
                      : ""}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>  
                    <Form.Field>
                      <Label>
                        {<Icon name="university" size="large" />}
                      </Label>
                    </Form.Field>  
                  </Form.Group>
                  <Form.Group widths='equal'>  
                    <Form.Field control={Input} label="Your Major" className={`${this.state.majorProblem}`}>
                      <input type="text" placeholder="Enter Your Major" required name="major" onChange={this.handleInputChange} />
                      {this.state.majorEmpty ?
                        <Label basic color="red" pointing="left">{`${this.state.majorEmpty}`}</Label>
                      : ""}
                    </ Form.Field>
                    <Form.Field control={Input} label="Your Minor, if applicable" className="minor">
                      <input type="text" placeholder="Enter Your Minor (if applicable)" name="minor" onChange={this.handleInputChange} />
                    </ Form.Field>  
                  </Form.Group>
                  <Form.Group>
                    <Form.Field control={Input} label="Your Class Standing" className="classStanding" className={`${this.state.classStandingProblem}`}>
                      <input type="text" placeholder="i.e. Senior" required name="classStanding" onChange={this.handleInputChange} />
                      {this.state.classStandingEmpty ?
                        <Label basic color="red" pointing="left">{`${this.state.classStandingEmpty}`}</Label>
                      : ""}
                      {this.state.classStandingWrong ?
                        <Label basic color="red" pointing="left">{`${this.state.classStandingWrong}`}</Label>
                      : ""}
                    </ Form.Field>  
                  </Form.Group>
                  <p className="label">Add the Class You Need to Study</p>
                  <Grid>
                    <Grid.Column width={8}>
                      <div>
                        <h5>Class Prefix</h5>
                        {this.state.prefixEmpty ?
                          <Label basic color="red" pointing="below">{`${this.state.prefixEmpty}`}</Label>
                        : ""}
                        <SearchFormClasses
                          fluid
                          className={`${this.state.prefixProblem}`}
                          style={{overflow: "auto", height: 100, minWidth: "30%"}}
                          placeholder="Enter Class Prefix"
                          loading={this.stateisLoadingClass}
                          onResultSelect={this.handleResultSelectClass}
                          onSearchChange={_.debounce(this.handleSearchChangeClass, 500, { leading: true })}
                          results={this.state.results}
                          value={this.state.valueClass}
                          {...this.props}  
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column width={8}>  
                      <Form.Group>
                        <Form.Field className={`${this.state.numberProblem}`} control={Input} label="Class Number" className="classNumber">
                          <input type="text" placeholder="Enter Class Number" required name="classIDNumber" onChange={this.handleInputChange} />
                          {this.state.numberEmpty ?
                            <Label basic color="red" pointing="left">{`${this.state.numberEmpty}`}</Label>
                          : ""}
                          {this.state.numberWrong ?
                            <Label basic color="red" pointing="left">{`${this.state.numberWrong}`}</Label>
                          : ""}
                        </Form.Field>   
                        <Button toggle name="createClass" id="smallerButton"  onClick={this.createClass}> Add + </Button>
                      </Form.Group>
                    </Grid.Column>
                  </Grid> 
                  <p className="label">Your Preferred Study Methods</p>
                  <Form.Group widths="equal">
                    <Button toggle active={this.state.methods.flashcards} name="flashcards" onClick={this.handleMethodToggle} data-methods="Flashcards" > Flashcards </Button>
                    <Button toggle active={this.state.methods.quizzes} onClick={this.handleMethodToggle} name="quizzes" data-methods="Quizzes" > Quizzes </Button>
                    <Button toggle active={this.state.methods.rereading} name="rereading" onClick={this.handleMethodToggle} data-methods="Rereading" > Rereading </Button>
                  </Form.Group>
                  <Form.Group widths="equal">  
                    <Button toggle active={this.state.methods.revisionNotes} name="revisionNotes" onClick={this.handleMethodToggle}data-methods="Revision Notes" > Revision Notes </Button>
                    <Button toggle active={this.state.methods.mnemonics} name="mnemonics" onClick={this.handleMethodToggle}data-methods="Mnemonics" > Mnemonics </Button>
                    <Button toggle active={this.state.methods.other} name="other" onClick={this.handleMethodToggle}data-methods="Other" > Other </Button>
                  </Form.Group>
                  <p className="label">Preferred Study Location</p>
                  <Form.Group widths="equal">
                    <Button toggle active={this.state.locations.library}name="library"  onClick={this.handleLocationToggle}data-locations="Library">Library</Button>
                    <Button toggle active={this.state.locations.online} name="online" onClick={this.handleLocationToggle}data-locations="Online">Online</Button>
                    <Button toggle active={this.state.locations.commons}name="commons"  onClick={this.handleLocationToggle}data-locations="Commons">Commons</Button>
                  </Form.Group>
                  <Form.Group widths="equal">  
                    <Button toggle active={this.state.locations.cafe} name="cafe" onClick={this.handleLocationToggle}data-locations="Cafe">Cafe</Button>
                    <Button toggle active={this.state.locations.home} name="home" onClick={this.handleLocationToggle}data-locations="Home">Home</Button>
                    <Button toggle active={this.state.locations.other} name="other" onClick={this.handleLocationToggle}data-locations="Other">Other</Button>
                  </Form.Group>
                  <p className="label">Preferred Study Time</p>
                  <Form.Group widths="equal">
                  <div className="timeFrameLabels">Morning</div>
                    {/* <Button toggle active={this.state.times.SundayMorning} name="SundayMorning" onClick={this.handleTimeToggle} data-times="SundayMorning" className="Sunday" > Sunday Morning </Button>
                    <Button toggle active={this.state.times.MondayMorning} name="MondayMorning" onClick={this.handleTimeToggle} data-times="MondayMorning" className="Monday"> Monday Morning </Button>
                    <Button toggle active={this.state.times.TuesdayMorning} name="TuesdayMorning" onClick={this.handleTimeToggle} data-times="TuesdayMorning" className="Tuesday" > Tuesday Morning </Button>
                    <Button toggle active={this.state.times.WednesdayMorning} name="WednesdayMorning" onClick={this.handleTimeToggle} data-times="WednesdayMorning" className="Wednesday" > Wednesday Morning </Button> 
                    <Button toggle active={this.state.times.ThursdayMorning} name="ThursdayMorning" onClick={this.handleTimeToggle} data-times="ThursdayMorning" className="Thursday" > Thursday Morning </Button>
                    <Button toggle active={this.state.times.FridayMorning} name="FridayMorning" onClick={this.handleTimeToggle} data-times="FridayMorning" className="Friday" > Friday Morning </Button>
                    <Button toggle active={this.state.times.SaturdayMorning} name="SaturdayMorning" onClick={this.handleTimeToggle} data-times="SaturdayMorning" className="Saturday" > Saturday Morning </Button> */}
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
                  <Form.Group widths="equal"> 
                  <div className="timeFrameLabels">Afternoon</div>

                    {/* <Button toggle active={this.state.times.SundayAfternoon} name="SundayAfternoon" onClick={this.handleTimeToggle} data-times="SundayAfternoon" className="Sunday" > Sunday Afternoon </Button>
                    <Button toggle active={this.state.times.MondayAfternoon} name="MondayAfternoon" onClick={this.handleTimeToggle} data-times="MondayAfternoon" className="Monday" > Monday Afternoon </Button>
                    <Button toggle active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" onClick={this.handleTimeToggle} data-times="TuesdayAfternoon" className="Tuesday" > Tuesday Afternoon </Button> 
                    <Button toggle active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" onClick={this.handleTimeToggle} data-times="WednesdayAfternoon" className="Wednesday" > Wednesday Afternoon </Button>
                    <Button toggle active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" onClick={this.handleTimeToggle} data-times="ThursdayAfternoon" className="Thursday" > Thursday Afternoon </Button>
                    <Button toggle active={this.state.times.FridayAfternoon} name="FridayAfternoon" onClick={this.handleTimeToggle} data-times="FridayAfternoon" className="Friday" > Friday Afternoon </Button>
                    <Button toggle active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" onClick={this.handleTimeToggle} data-times="SaturdayAfternoon" className="Saturday" > Saturday Afternoon </Button> */}
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
                  <Form.Group widths="equal">
                  <div className="timeFrameLabels">Evening</div>

                    {/* <Button toggle active={this.state.times.SundayEvening} name="SundayEvening" onClick={this.handleTimeToggle} data-times="SundayEvening" className="Sunday" > Sunday Evening </Button> 
                    <Button toggle active={this.state.times.MondayEvening} name="MondayEvening" onClick={this.handleTimeToggle} data-times="MondayEvening" className="Monday" > Monday Evening </Button>   
                    <Button toggle active={this.state.times.TuesdayEvening} name="TuesdayEvening" onClick={this.handleTimeToggle} data-times="TuesdayEvening" className="Tuesday" > Tuesday Evening </Button>
                    <Button toggle active={this.state.times.WednesdayEvening} name="WednesdayEvening" onClick={this.handleTimeToggle} data-times="WednesdayEvening" className="Wednesday" > Wednesday Evening </Button>
                    <Button toggle active={this.state.times.ThursdayEvening} name="ThursdayEvening" onClick={this.handleTimeToggle} data-times="ThursdayEvening" className="Thursday" > Thursday Evening </Button>
                    <Button toggle active={this.state.times.FridayEvening} name="FridayEvening" onClick={this.handleTimeToggle} data-times="FridayEvening" className="Friday" > Friday Evening </Button>
                    <Button toggle active={this.state.times.SaturdayEvening} name="SaturdayEvening" onClick={this.handleTimeToggle} data-times="SaturdayEvening" className="Saturday" > Saturday Evening </Button> */}
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
                  <Form.Group widths="equal">  
                  <div className="timeFrameLabels">Night</div>
 
                    {/* <Button toggle active={this.state.times.SundayNight}name="SundayNight" onClick={this.handleTimeToggle}  data-times="SundayNight" className="Sunday" > Sunday Night </Button>
                    <Button toggle active={this.state.times.MondayNight} name="MondayNight" onClick={this.handleTimeToggle} data-times="MondayNight" className="Monday" > Monday Night </Button>
                    <Button toggle active={this.state.times.TuesdayNight} name="TuesdayNight" onClick={this.handleTimeToggle} data-times="TuesdayNight" className="Tuesday" > Tuesday Night </Button>
                    <Button toggle active={this.state.times.WednesdayNight} name="WednesdayNight" onClick={this.handleTimeToggle} data-times="WednesdayNight" className="Wednesday" > Wednesday Night </Button>
                    <Button toggle active={this.state.times.ThursdayNight} name="ThursdayNight" onClick={this.handleTimeToggle} data-times="ThursdayNight" className="Thursday" > Thursday Night </Button>
                    <Button toggle active={this.state.times.FridayNight} name="FridayNight" onClick={this.handleTimeToggle} data-times="FridayNight" className="Friday" > Friday Night </Button>
                    <Button toggle active={this.state.times.SaturdayNight} name="SaturdayNight" onClick={this.handleTimeToggle} data-times="SaturdayNight" className="Saturday" > Saturday Night </Button> */}
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
                </Form>
              </Container>
              <div> 
                {this.state.schoolEmpty ?
                  <Label basic color="red" pointing="below">{`${this.state.schoolEmpty}`}</Label>
                : ""}
                {this.state.schoolWrong ?
                  <Label basic color="red" pointing="below">{`${this.state.schoolWrong}`}</Label>
                : ""}
                <SearchFormSchools
                  style={{overflow: "auto", height: 100}}
                  placeholder="Enter School Name"
                  loading={this.stateisLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                  results={this.state.results}
                  value={this.state.value}
                  {...this.props}  
                />
              </div>

              <Button onClick={this.handleFormSubmit} className="submit">Submit</Button>
            </Segment>
          </Container>
        )
      }
     }

export default Questionnaire;
