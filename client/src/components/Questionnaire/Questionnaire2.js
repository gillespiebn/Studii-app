import React, { Component } from "react";
import "./Questionnaire.css";
// import TeacherInput from "../Teachers";
// import ClassInput from "../Classes";
import API from '../../utils/API.js';
import { Segment, Container, Header, Icon, Input, Label, Form, Button, Search, Grid, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
// import allSchools from '../../utils/allSchools.js'
// import twoSchools from '../../utils/twoSchools.js'
import vaSchools from '../../utils/vaSchools.js'
import SearchForm from "../SearchForm";

// import SearchFormRenderer from "../SearchFormRenderer";


// const source = allSchools;

const classStandingOptions = [
  { key: 'f', text: 'Freshman', value: 'freshman' },
  { key: 'so', text: 'Sophomore', value: 'sophomore' },
  { key: 'j', text: 'Junior', value: 'junior' },
  { key: 'se', text: 'Senior', value: 'senior' }
];

class Questionnaire extends Component {
    state = {
        facebook_id: this.props.facebook_id,
        name: "",
        email: "",
        school: "",
        classStanding: "",
        classID: "",
        classes: [],
        // locations: [],
        // times: [],
        schoolsForAutocomplete: vaSchools,
        results: [],
        //change major and minor when they are created
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

      //jordan wrote this and it is good for now but needs to be updated. I can work on this part if you want.
      checkFunctions = (obj) => {
        this.setState({ 
          nameEmpty: false, nameProblem: false, 
          emailProblem: false, emailEmpty: false, emailFormatProblem: false, 
          majorEmpty: false, majorProblem: false 
        });

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


        if (bad) {
          return;
        }
        this.setState({ continue: true })
        console.log("we got here");
        API.createUser(obj).then(data => console.log(data.data)).catch(err => console.log(err));
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

      render() { 

        console.log(this.filterMethods());
        return(
          <Container>
            <Segment style={{ marginTop: 20}} raised>
              <Container textAlign="center">
                <Header as="h2">Find a Studii Buddy</Header>
              </Container>
              <Container>
                <Form>
                  <Form.Group>
                    <Form.Field control={Input} label='First and Last Name' className={`${this.state.nameProblem}`} width={16}>
                    <input type="text" placeholder="Enter First and Last Name Here" required name="name" onChange={this.handleInputChange} />
                    {this.state.nameEmpty ?
                        <Label basic color="red" pointing>{`${this.state.nameEmpty}`}</Label>
                      : ""}

                      {/* <Label>
                        {<Icon name="user" size="large"/>}
                      </Label> */}
                      
                    </ Form.Field>
                  </Form.Group>
                  <Form.Group>  
                    <Form.Field control={Input} label="Email Address" placeholder="Enter School (.edu) Email Address" className={`${this.state.emailProblem}`} width={16}>
                      <input type="email" required name="email" onChange={this.handleInputChange} />
                      {this.state.emailEmpty ?
                        <Label basic color="red" pointing>{`${this.state.emailEmpty}`}</Label>
                      : ""}
                      {this.state.emailFormatProblem ?
                        <Label basic color="red" pointing>{`${this.state.emailFormatProblem}`}</Label>
                      : ""}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>  
                    <Form.Field>
                      <Label>
                        {<Icon name="university" size="large" />}
                      </Label>
                      <div>     
                      {/* <Search
                        loading={this.stateisLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={this.state.results}
                        value={this.state.value}
                        {...this.props}
                      /> */}
                      </div>
                    </Form.Field>  
                  </Form.Group>
                  <Form.Group widths='equal'>  
                    <Form.Field control={Input} label="Major" className={`${this.state.majorProblem}`}>
                      <input type="text" placeholder="Enter Your Major" required name="major" onChange={this.handleInputChange} />
                      {this.state.majorEmpty ?
                        <Label basic color="red" pointing>{`${this.state.majorEmpty}`}</Label>
                      : ""}
                    </ Form.Field>
                    <Form.Field control={Input} label="Minor" className="minor">
                      <input type="text" placeholder="Enter Your Minor (if applicable)" required name="minor" onChange={this.handleInputChange} />
                    </ Form.Field>  
                  </Form.Group>
                  <Form.Group>
                    <Form.Select label='Class Standing' name="classStanding" options={ classStandingOptions } placeholder='Select Your Class Standing' width={16} onChange={this.handleInputChange}/>
                  </Form.Group>
                  <p className="label">Preferred Study Methods</p>
                  <Form.Group widths="equal">
                  <p>Preferred Method of Study</p>
                    <Button toggle active={this.state.methods.flashcards} name="flashcards" onClick={this.handleMethodToggle} data-methods="Flashcards" width={5}> Flashcards </Button>
                    <Button toggle active={this.state.methods.quizzes} onClick={this.handleMethodToggle} name="quizzes" data-methods="Quizzes" width={5}> Quizzes </Button>
                    <Button toggle active={this.state.methods.rereading} name="rereading" onClick={this.handleMethodToggle} data-methods="Rereading" width={5}> Rereading </Button>
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
                    <Button toggle active={this.state.times.SundayMorning} name="SundayMorning" onClick={this.handleTimeToggle} data-times="SundayMorning" className="Sunday" > Sunday Morning </Button>
                    <Button toggle active={this.state.times.MondayMorning} name="MondayMorning" onClick={this.handleTimeToggle} data-times="MondayMorning" className="Monday"> Monday Morning </Button>
                    <Button toggle active={this.state.times.TuesdayMorning} name="TuesdayMorning" onClick={this.handleTimeToggle} data-times="TuesdayMorning" className="Tuesday" > Tuesday Morning </Button>
                    <Button toggle active={this.state.times.WednesdayMorning} name="WednesdayMorning" onClick={this.handleTimeToggle} data-times="WednesdayMorning" className="Wednesday" > Wednesday Morning </Button> 
                    <Button toggle active={this.state.times.ThursdayMorning} name="ThursdayMorning" onClick={this.handleTimeToggle} data-times="ThursdayMorning" className="Thursday" > Thursday Morning </Button>
                    <Button toggle active={this.state.times.FridayMorning} name="FridayMorning" onClick={this.handleTimeToggle} data-times="FridayMorning" className="Friday" > Friday Morning </Button>
                    <Button toggle active={this.state.times.SaturdayMorning} name="SaturdayMorning" onClick={this.handleTimeToggle} data-times="SaturdayMorning" className="Saturday" > Saturday Morning </Button>
                  </Form.Group>
                  <Form.Group widths="equal"> 
                    <Button toggle active={this.state.times.SundayAfternoon} name="SundayAfternoon" onClick={this.handleTimeToggle} data-times="SundayAfternoon" className="Sunday" > Sunday Afternoon </Button>
                    <Button toggle active={this.state.times.MondayAfternoon} name="MondayAfternoon" onClick={this.handleTimeToggle} data-times="MondayAfternoon" className="Monday" > Monday Afternoon </Button>
                    <Button toggle active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" onClick={this.handleTimeToggle} data-times="TuesdayAfternoon" className="Tuesday" > Tuesday Afternoon </Button> 
                    <Button toggle active={this.state.times.WednesdayAfternoon} name="WednesdaAfternoon" onClick={this.handleTimeToggle} data-times="WednesdayAfternoon" className="Wednesday" > Wednesday Afternoon </Button>
                    <Button toggle active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" onClick={this.handleTimeToggle} data-times="ThursdayAfternoon" className="Thursday" > Thursday Afternoon </Button>
                    <Button toggle active={this.state.times.FridayAfternoon} name="FridayAfternoon" onClick={this.handleTimeToggle} data-times="FridayAfternoon" className="Friday" > Friday Afternoon </Button>
                    <Button toggle active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" onClick={this.handleTimeToggle} data-times="SaturdayAfternoon" className="Saturday" > Saturday Afternoon </Button>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Button toggle active={this.state.times.SundayEvening} name="SundayEvening" onClick={this.handleTimeToggle} data-times="SundayEvening" className="Sunday" > Sunday Evening </Button> 
                    <Button toggle active={this.state.times.MondayEvening} name="MondayEvening" onClick={this.handleTimeToggle} data-times="MondayEvening" className="Monday" > Monday Evening </Button>   
                    <Button toggle active={this.state.times.TuesdayEvening} name="TuesdayEvening" onClick={this.handleTimeToggle} data-times="TuesdayEvening" className="Tuesday" > Tuesday Evening </Button>
                    <Button toggle active={this.state.times.WednesdayEvening} name="WednesdayEvening" onClick={this.handleTimeToggle} data-times="WednesdayEvening" className="Wednesday" > Wednesday Evening </Button>
                    <Button toggle active={this.state.times.ThursdayEvening} name="ThursdayEvening" onClick={this.handleTimeToggle} data-times="ThursdayEvening" className="Thursday" > Thursday Evening </Button>
                    <Button toggle active={this.state.times.FridayEvening} name="FridayEvening" onClick={this.handleTimeToggle} data-times="FridayEvening" className="Friday" > Friday Evening </Button>
                    <Button toggle active={this.state.times.SaturdayEvening} name="SaturdayEvening" onClick={this.handleTimeToggle} data-times="SaturdayEvening" className="Saturday" > Saturday Evening </Button>
                  </Form.Group>
                  <Form.Group widths="equal">   
                    <Button toggle active={this.state.times.SundayNight}name="SundayNight" onClick={this.handleTimeToggle}  data-times="SundayNight" className="Sunday" > Sunday Night </Button>
                    <Button toggle active={this.state.times.MondayNight} name="MondayNight" onClick={this.handleTimeToggle} data-times="MondayNight" className="Monday" > Monday Night </Button>
                    <Button toggle active={this.state.times.TuesdayNight} name="TuesdayNight" onClick={this.handleTimeToggle} data-times="TuesdayNight" className="Tuesday" > Tuesday Night </Button>
                    <Button toggle active={this.state.times.WednesdayNight} name="WednesdayNight" onClick={this.handleTimeToggle} data-times="WednesdayNight" className="Wednesday" > Wednesday Night </Button>
                    <Button toggle active={this.state.times.ThursdayNight} name="ThursdayNight" onClick={this.handleTimeToggle} data-times="ThursdayNight" className="Thursday" > Thursday Night </Button>
                    <Button toggle active={this.state.times.FridayNight} name="FridaNight" onClick={this.handleTimeToggle} data-times="FridayNight" className="Friday" > Friday Night </Button>
                    <Button toggle active={this.state.times.SaturdayNight} name="SaturdayNight" onClick={this.handleTimeToggle} data-times="SaturdayNight" className="Saturday" > Saturday Night </Button>
                  </Form.Group>  
                </Form>
              </Container>

              <SearchForm
                placeholder="Enter School Name"
                loading={this.stateisLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={this.state.results}
                value={this.state.value}
                {...this.props}  
              />

              {/* this button is just kind of a placeholder. it works, but probably needs styling */}
              <Button onClick={this.handleFormSubmit} className="submit">Submit</Button>
            </Segment>
          </Container>
        )
      }
     }

export default Questionnaire;
