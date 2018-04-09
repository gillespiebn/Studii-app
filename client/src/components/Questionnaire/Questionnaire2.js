import React, { Component } from "react";
import "./Questionnaire.css";
import TeacherInput from "../Teachers";
import ClassInput from "../Classes";
import API from '../../utils/API.js';
import { Segment, Container, Header, Icon, Label, Form, Button, Search } from 'semantic-ui-react';
import _ from 'lodash';
import allSchools from '../../utils/allSchools.js'
import twoSchools from '../../utils/twoSchools.js'
import SearchForm from "../SearchForm";
// import SearchFormRenderer from "../SearchFormRenderer";


// const source = allSchools;

const classStandingOptions = [
  { key: 'f', text: 'Freshman', value: 'freshman' },
  { key: 'so', text: 'Sophomore', value: 'sophomore' },
  { key: 'j', text: 'Junior', value: 'junior' },
  { key: 'se', text: 'Senior', value: 'senior' }
]

class Questionnaire extends Component {
    state = {
        facebook_id: this.props.facebook_id,
        name: "",
        email: "",
        school: "",
        classStanding: "",
        classID: "",
        classes: [],
        methods: [],
        locations: [],
        times: [],
        schoolsForAutocomplete: allSchools,
        //change major and minor when they are created
        major: '',
        minor: '',
        photo: '',

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
          major: /*this.state.major*/'math',
          minor: /*this.state.minor*/'science'
        }
        // need to make check functions here. they will set states and if those states exist, they will highlight where something needs to change
        this.checkFunctions(objToSave);
      };

      //jordan wrote this and it is good for now but needs to be updated. I can work on this part if you want.
      checkFunctions = (obj) => {
        this.setState({ 
          nameEmpty: false, 
          nameProblem: false, 
          emailProblem: false, emailEmpty: false, 
          emailFormatProblem: false, 
          majorEmpty: false, 
          majorProblem: false 
        })
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
        this.setState({  continue: true })
        console.log("we got here");
        API.createUser(obj).then(data => console.log(data.data)).catch(err => console.log(err));
      }

      updateStudyMethods = event => {
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
        API.getAllSchools().then(data => this.setState({schoolsForAutocomplete: data.data})).catch(err => console.log(err));
      }

      componentWillMount() {
        this.resetComponent()
      }

      //this starts all the search form autocomplete shit /////////////////////////////////////////////////////////////////////////////////////////
      resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

      handleResultSelect = (e, { result }) => this.setState({ value: result.name })
    
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
      //this ends the autocomplete shit//////////////////////////////////////////////////////////////////////////////////////////////////

      render() { 
        return(
          <Container>
            <Segment style={{ marginTop: 20}} raised>
              <Container textAlign="center">
                <Header as="h2">Create User</Header>
              </Container>
              <Container>
                <Form>
                  <Form.Field className={`${this.state.nameProblem}`}>
                    <Label>
                      {<Icon name="user" size="large"/>}
                    </Label>
                    <input type="text" placeholder="Enter First and Last Name Here" required name="name" onChange={this.handleInputChange} />
                    {this.state.nameEmpty ?
                      <Label basic color="red" pointing>{`${this.state.nameEmpty}`}</Label>
                    : ""}
                  </ Form.Field>
                  <Form.Field className={`${this.state.emailProblem}`} >
                    <Label>
                      {<Icon name="mail" size="large"/>}
                    </Label>
                    <input type="email" placeholder="Enter School (.edu) Email Address Here" required name="email" onChange={this.handleInputChange} />
                    {this.state.emailEmpty ?
                      <Label basic color="red" pointing>{`${this.state.emailEmpty}`}</Label>
                    : ""}
                    {this.state.emailFormatProblem ?
                      <Label basic color="red" pointing>{`${this.state.emailFormatProblem}`}</Label>
                    : ""}
                  </Form.Field>
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
                  <Form.Field className={`${this.state.majorProblem}`}>
                    <Label>
                      {<Icon name="book" size="large"/>}
                    </Label>
                    <input type="text" placeholder="Enter Your Major" required name="major" onChange={this.handleInputChange} />
                    {this.state.majorEmpty ?
                      <Label basic color="red" pointing>{`${this.state.majorEmpty}`}</Label>
                    : ""}
                  </ Form.Field>
                  <Form.Field className="minor">
                    <Label>
                      {<Icon name="book" size="large"/>}
                    </Label>
                    <input type="text" placeholder="Enter Your Minor (if applicable)" required name="minor" onChange={this.handleInputChange} />
                  </ Form.Field>  
                  <Form.Field className="class-standing" >
                    <Form.Field control=/*{Select}*/"select" label='Class-Standing' options={classStandingOptions} placeholder='Select Your Class Standing' />                    
                  </Form.Field>
                  <Button.Group>
                    <Button onClick={this.updateStudyMethods} data-methods="Flashcards" > Flashcards </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Quizzes" > Quizzes </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Rereading" > Rereading </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Revision Notes" > Revision Notes </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Mnemonics" > Mnemonics </Button>
                    <Button onClick={this.updateStudyMethods} data-methods="Other" > Other </Button>
                  </Button.Group>
                  <Button.Group>
                    <Button onClick={this.updateStudyPlaces} data-locations="Library">Library</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Coffee Shop">Coffee Shop</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Commons">Commons</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Cafe">Cafe</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Home">Cafe</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Online">Online</Button>
                    <Button onClick={this.updateStudyPlaces} data-locations="Other">Other</Button>
                  </Button.Group>
                  <Button.Group>
                    <Button onClick={this.updateAvailability} data-times="Monday Morning" className="Monday"> Monday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Monday Afternoon" className="Monday" > Monday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Monday Evening" className="Monday" > Monday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Monday Night" className="Monday" > Monday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Morning" className="Tuesday" > Tuesday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Afternoon" className="Tuesday" > Tuesday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Evening" className="Tuesday" > Tuesday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Tuesday Night" className="Tuesday" > Tuesday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Morning" className="Wednesday" > Wednesday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Afternoon" className="Wednesday" > Wednesday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Evening" className="Wednesday" > Wednesday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Wednesday Night" className="Wednesday" > Wednesday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Morning" className="Thursday" > Thursday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Afternoon" className="Thursday" > Thursday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Evening" className="Thursday" > Thursday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Thursday Night" className="Thursday" > Thursday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Morning" className="Friday" > Friday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Afternoon" className="Friday" > Friday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Evening" className="Friday" > Friday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Friday Night" className="Friday" > Friday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Morning" className="Saturday" > Saturday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Afternoon" className="Saturday" > Saturday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Evening" className="Saturday" > Saturday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Saturday Night" className="Saturday" > Saturday Night </Button>
                    <Button onClick={this.updateAvailability} data-times="Sunday Morning" className="Sunday" > Sunday Morning </Button>
                    <Button onClick={this.updateAvailability} data-times="Sunday Afternoon" className="Sunday" > Sunday Afternoon </Button>
                    <Button onClick={this.updateAvailability} data-times="Sunday Evening" className="Sunday" > Sunday Evening </Button>
                    <Button onClick={this.updateAvailability} data-times="Sunday Night" className="Sunday" > Sunday Night </Button>
                  </Button.Group>  
                </Form>
              </Container>
              <SearchForm
                loading={this.stateisLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={this.state.results}
                value={this.state.value}
                {...this.props}  
              />

              {/* this button is just kind of a placeholder. it works, but probably needs styling */}
              <p>Submit</p>
              <button onClick={this.handleFormSubmit} className="submit">Submit</button>
            </Segment>
          </Container>
        )
      }
     }

export default Questionnaire;
