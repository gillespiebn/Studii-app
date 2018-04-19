import React, { Component } from "react";
import "./Questionnaire.css";
import TeacherInput from "../Teachers";
import ClassInput from "../Classes";
import API from '../../utils/API.js'

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
        schoolsForAutocomplete: [],
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
            console.log(this.state.schoolsForAutocomplete[i])
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


      render() {
        return (
            <form>
                <p> Name:
                    <input 
                    type="text"
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                    />
                  </p>
                <p> Email:
                    <input
                    type="text"
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    />
                  </p>
                <p>School Name: 
                  <input 
                type="text"
                name="school"
                onChange={this.handleInputChange}
                value={this.state.school}
                
                />
                </p>
              <label>
                Class Standing
                <select value={this.state.classStanding} name="classStanding" onChange={this.handleInputChange}>
                    <option value="Null">Please select your class year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </label>
                <div>
          
                {this.state.classes.map((classes,index) => (
                <ClassInput
                    key={index}
                    class={classes}
                    />
                ))}
            Class ID: 
                  <input
                  type="text"
                  name="classID"
                  onChange={this.handleInputChange}
                  value={this.state.classID}
                  />
                <button onClick={this.handleAddClass}>➕</button>
                </div>
              
                <p>Preferred study methods (select all that apply)</p>
              <button onClick={this.updateStudyMethods} data-methods="Flashcards" > Flashcards </button>
              <button onClick={this.updateStudyMethods} data-methods="Quizzes" > Quizzes </button>
              <button onClick={this.updateStudyMethods} data-methods="Rereading" > Rereading </button>
              <button onClick={this.updateStudyMethods} data-methods="notes" > notes </button>
              <button onClick={this.updateStudyMethods} data-methods="Mnemonics" > Mnemonics </button>
              <button onClick={this.updateStudyMethods} data-methods="Other" > Other </button>
              <p>Preferred places to study (select all that apply)</p>
              <button onClick={this.updateStudyPlaces} data-locations="Library" > Library </button>
              <button onClick={this.updateStudyPlaces} data-locations="Coffee Shop" > Coffee Shop </button>
              <button onClick={this.updateStudyPlaces} data-locations="Commons" > Commons </button>
              <button onClick={this.updateStudyPlaces} data-locations="Cafe" > Cafe </button>
              <button onClick={this.updateStudyPlaces} data-locations="Home" > Home </button>
              <button onClick={this.updateStudyPlaces} data-locations="Other" > Other </button>
              <p>Availability</p>
              <button onClick={this.updateAvailability} data-times="Monday Morning" className="Monday"> Monday Morning </button>
              <button onClick={this.updateAvailability} data-times="Monday Afternoon" className="Monday" > Monday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Monday Evening" className="Monday" > Monday Evening </button>
              <button onClick={this.updateAvailability} data-times="Monday Night" className="Monday" > Monday Night </button>
              <button onClick={this.updateAvailability} data-times="Tuesday Morning" className="Tuesday" > Tuesday Morning </button>
              <button onClick={this.updateAvailability} data-times="Tuesday Afternoon" className="Tuesday" > Tuesday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Tuesday Evening" className="Tuesday" > Tuesday Evening </button>
              <button onClick={this.updateAvailability} data-times="Tuesday Night" className="Tuesday" > Tuesday Night </button>
              <button onClick={this.updateAvailability} data-times="Wednesday Morning" className="Wednesday" > Wednesday Morning </button>
              <button onClick={this.updateAvailability} data-times="Wednesday Afternoon" className="Wednesday" > Wednesday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Wednesday Evening" className="Wednesday" > Wednesday Evening </button>
              <button onClick={this.updateAvailability} data-times="Wednesday Night" className="Wednesday" > Wednesday Night </button>
              <button onClick={this.updateAvailability} data-times="Thursday Morning" className="Thursday" > Thursday Morning </button>
              <button onClick={this.updateAvailability} data-times="Thursday Afternoon" className="Thursday" > Thursday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Thursday Evening" className="Thursday" > Thursday Evening </button>
              <button onClick={this.updateAvailability} data-times="Thursday Night" className="Thursday" > Thursday Night </button>
              <button onClick={this.updateAvailability} data-times="Friday Morning" className="Friday" > Friday Morning </button>
              <button onClick={this.updateAvailability} data-times="Friday Afternoon" className="Friday" > Friday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Friday Evening" className="Friday" > Friday Night </button>
              <button onClick={this.updateAvailability} data-times="Friday Night" className="Friday" > Friday Evening </button>
              <button onClick={this.updateAvailability} data-times="Saturday Morning" className="Saturday" > Saturday Morning </button>
              <button onClick={this.updateAvailability} data-times="Saturday Afternoon" className="Saturday" > Saturday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Saturday Evening" className="Saturday" > Saturday Evening </button>
              <button onClick={this.updateAvailability} data-times="Saturday Night" className="Saturday" > Saturday Night </button>
              <button onClick={this.updateAvailability} data-times="Sunday Morning" className="Sunday" > Sunday Morning </button>
              <button onClick={this.updateAvailability} data-times="Sunday Afternoon" className="Sunday" > Sunday Afternoon </button>
              <button onClick={this.updateAvailability} data-times="Sunday Evening" className="Sunday" > Sunday Evening </button>
              <button onClick={this.updateAvailability} data-times="Sunday Night" className="Sunday" > Sunday Night </button>
              <p>Submit</p>
              <button onClick={this.handleFormSubmit} className="submit">Submit</button>
            </form>
          )
      }

     }


     export default Questionnaire;


                    
                    
