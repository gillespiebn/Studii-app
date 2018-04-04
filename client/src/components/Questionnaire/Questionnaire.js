import React, { Component } from "react";
import "./Questionnaire.css";

class Questionnaire extends Component {
    state = {
        schoolName: "",
        classStanding: "",
        classID: [],
        professorName: [],
        studyMethod: [],
        studyPlace: [],
        availability: {Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []}
       };

       handleInputChange = event => {
      const { name, value } = event.target;
      console.log(value);

      this.setState({
        [name]: value
        });
      };

      handleFormSubmit = event => {
        event.preventDefault();
        alert("Thanks, now let's find your Studdii Buddies.");
        this.setState({ schoolName: "", classStanding: "", classID: [], professorName: [], studyMethod: [], studyPlace: [], availability:[]});
       };

       updateStudyMethods = event => {
       event.preventDefault();
        console.log(event.target.dataset.studymethod)
        var studymethods = this.state.studyMethod
        studymethods.push(event.target.dataset.studymethod)
        this.setState({studyMethod: studymethods 
        })
          console.log("State " ,this.state.studyMethod);
       };

       render() {
        return (
            <form>
                <p>School Name: {this.state.schoolName}</p>
                <p>Class Standing: {this.state.classStanding}</p>
                <p>Preferred study methods (select all that apply)</p>
                <p>Preferred places to study (select all that apply)</p>
                <p>Availability</p>
               <input 
                type="text"
                placeholder="School Name"
                name="School Name"
                value={this.state.schoolName}
                onChange={this.handleInputChange}
               />
              <label>
                Class Standing
                <select value={this.state.classStanding} onChange={this.handleInputChange}>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                 </select>
               </label>
              <button onClick={this.updateStudyMethods} data-studymethod="Bananas" > Bananas </button>
            </form>
         ) 

       }

     }


     export default Questionnaire;



                    
                    
