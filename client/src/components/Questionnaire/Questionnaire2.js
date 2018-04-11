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
        locations: [],
        times: [],
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
      }

      updateClassStanding = event => {
        event.preventDefault();
        let standing = this.state.classStanding
        standing.push(EventTarget.dataset.classStanding)
        this.setState({ classStanding: standing })
      };

      updateStudyMethods = event => {
        console.log(event);
        event.preventDefault();
        let studymethods = this.state.methods
        studymethods.push(event.target.dataset.methods)
        this.setState({methods: studymethods })
      };

      updateStudyPlaces = event => {
        event.preventDefault();
        let studyplaces = this.state.locations 
        studyplaces.push(event.target.dataset.locations)
        this.setState({ locations: studyplaces})
      };

      updateAvailability = event => {
        event.preventDefault();
        let availability = this.state.times
        availability.push(event.target.dataset.times)
        this.setState({ times: availability })
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

      filterOptions = () => {
        return Object.keys(this.state.methods).filter((option, index) => this.state.methods[option]);
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

        console.log(this.filterOptions());
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
                    <Form.Select label='Class Standing' name="classStanding" options={ classStandingOptions } placeholder='Select Your Class Standing' width={16} onChange={this.handleInputChange} onClick={this.handleInputChange}/>
                  </Form.Group>
                  <p className="label">Preferred Study Methods</p>
                  <Form.Group widths="equal">
                  <p>Preferred Method of Study</p>
                    <Button toggle active={this.state.methods.flashcards} name="flashcards" onClick={this.handleMethodToggle} data-methods="Flashcards" width={5}> Flashcards </Button>
                    <Button toggle active={this.state.methods.quizzes} onClick={this.handleMethodToggle} name="quizzes" data-methods="Quizzes" width={5}> Quizzes </Button>
                    <Button toggle active={this.state.methods.rereading} name="rereading" onClick={this.handleMethodToggle} data-methods="Rereading" width={5}> Rereading </Button>
                  </Form.Group>
                  <Form.Group widths="equal">  
                    <Button onClick={this.updateStudyMethods} data-methods="Revision Notes" > Revision Notes </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Mnemonics" > Mnemonics </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Other" > Other </Button>
                  </Form.Group>
                  <p className="label">Preferred Study Location</p>
                  <Form.Group widths="equal">
                    <Button onClick={this.updateStudyPlaces} data-locations="Library">Library</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Coffee Shop">Coffee Shop</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Commons">Commons</Button>
                  </Form.Group>
                  <Form.Group widths="equal">  
                    <Button onClick={this.updateStudyPlaces} data-locations="Cafe">Cafe</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Home">Home</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Other">Other</Button>
                  </Form.Group>
                  <p className="label">Preferred Study Time</p>
                  <Form.Group widths="equal">
                    <Button onClick={this.updateAvailability} data-times="Sunday Morning" className="Sunday" > Sunday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Monday Morning" className="Monday"> Monday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Morning" className="Tuesday" > Tuesday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Morning" className="Wednesday" > Wednesday Morning </Button> 
                    <Button onClick={this.updateAvailability} data-times="Thursday Morning" className="Thursday" > Thursday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Morning" className="Friday" > Friday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Morning" className="Saturday" > Saturday Morning </Button>
                  </Form.Group>
                  <Form.Group widths="equal"> 
                    <Button onClick={this.updateAvailability} data-times="Sunday Afternoon" className="Sunday" > Sunday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Monday Afternoon" className="Monday" > Monday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Afternoon" className="Tuesday" > Tuesday Afternoon </Button> 
                    <Button onClick={this.updateAvailability} data-times="Wednesday Afternoon" className="Wednesday" > Wednesday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Afternoon" className="Thursday" > Thursday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Afternoon" className="Friday" > Friday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Afternoon" className="Saturday" > Saturday Afternoon </Button>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Button onClick={this.updateAvailability} data-times="Sunday Evening" className="Sunday" > Sunday Evening </Button> 
                    <Button onClick={this.updateAvailability} data-times="Monday Evening" className="Monday" > Monday Evening </Button>   
                    <Button onClick={this.updateAvailability} data-times="Tuesday Evening" className="Tuesday" > Tuesday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Evening" className="Wednesday" > Wednesday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Evening" className="Thursday" > Thursday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Evening" className="Friday" > Friday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Evening" className="Saturday" > Saturday Evening </Button>
                  </Form.Group>
                  <Form.Group widths="equal">   
                    <Button onClick={this.updateAvailability} data-times="Sunday Night" className="Sunday" > Sunday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Monday Night" className="Monday" > Monday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Night" className="Tuesday" > Tuesday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Night" className="Wednesday" > Wednesday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Night" className="Thursday" > Thursday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Night" className="Friday" > Friday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Night" className="Saturday" > Saturday Night </Button>
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
