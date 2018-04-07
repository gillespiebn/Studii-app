import React, { Component } from "react";
import "./Questionnaire.css";
import TeacherInput from "../Teachers";
import ClassInput from "../Classes";

class Questionnaire extends Component {
    state = {
        Name: "",
        Email: "",
        schoolName: "",
        classStanding: "",
        classID: "",
        classes: [],
        professorName: "",
       // professors: [],
        teachers: [],
        studyMethod: [],
        studyPlace: [],
        availability: []
       };

       handleInputChange = event => {
      const { name, value } = event.target;
      console.log(value);

      this.setState({
        [name]: value
        });
      };

      handleAddClass = event => {
        event.preventDefault();
        var teacherArray = this.state.teachers
        teacherArray.push(this.state.professorName);
        var classArray=this.state.classes;
        classArray.push(this.state.classID);
        this.setState({
         teachers: teacherArray,
         professorName:"",
         classes: classArray,
         classID: ""
        });
    }
      handleFormSubmit = event => {
        event.preventDefault();
        alert("Thanks, now let's find your Studdii Buddies.");
        console.log(this.state.schoolName);
        console.log(this.state.classStanding);
        console.log(this.state.availability);
        console.log(this.state.studyPlace);
        console.log(this.state.studyMethod);
        console.log(this.state.teachers);
        console.log(this.state.classes);
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

       updateStudyPlaces = event => {
        event.preventDefault();
            console.log(event.target.dataset.studyPlace)
            var studyplaces = this.state.studyPlace 
            studyplaces.push(event.target.dataset.studyplace)
            this.setState({ studyPlace: studyplaces
            })
                console.log("State " , this.state.studyPlace);
            };

        updateAvailability = event => {
            event.preventDefault();
                console.log(event.target.availability)
                var availability = this.state.availability
                availability.push(event.target.dataset.availability)
                this.setState({ availability: availability 
                })
                    console.log("State " , this.state.availability);
                };


       render() {
        return (
            <form>
                <p> Name:
                    <input 
                    type="text"
                    name="Name"
                    onChange={this.handleInputChange}
                    value={this.state.Name}
                   />
                  </p>
                <p> Email:
                    <input
                    type="text"
                    name="Email"
                    onChange={this.handleInputChange}
                    value={this.state.Email}
                   />
                 </p>
                <p>School Name: 
                 <input 
                type="text"
                name="schoolName"
                onChange={this.handleInputChange}
                value={this.state.schoolName}
               
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
              {this.state.teachers.map((teachers, index) => (
                <TeacherInput
                   key={index}
                   teacherName={teachers}
                />
            ))}
        

            Class ID: 
                 <input
                 type="text"
                 name="classID"
                 onChange={this.handleInputChange}
                 value={this.state.classID}
                  />
                Professor Name: 
                <input 
                type="text"
                name="professorName"
                onChange={this.handleInputChange}
                value={this.state.professorName}
               />

               <button onClick={this.handleAddClass}>➕</button>
               </div>
             
               <p>Preferred study methods (select all that apply)</p>
              <button onClick={this.updateStudyMethods} data-studymethod="Flashcards" > Flashcards </button>
              <button onClick={this.updateStudyMethods} data-studymethod="Quizzes" > Quizzes </button>
              <button onClick={this.updateStudyMethods} data-studymethod="Rereading" > Rereading </button>
              <button onClick={this.updateStudyMethods} data-studymethod="Revision Notes" > Revision Notes </button>
              <button onClick={this.updateStudyMethods} data-studymethod="Mnemonics" > Mnemonics </button>
              <button onClick={this.updateStudyMethods} data-studymethod="Other" > Other </button>
               <p>Preferred places to study (select all that apply)</p>
               <button onClick={this.updateStudyPlaces} data-studyplace="Library" > Library </button>
               <button onClick={this.updateStudyPlaces} data-studyplace="Coffee Shop" > Coffee Shop </button>
               <button onClick={this.updateStudyPlaces} data-studyplace="Commons" > Commons </button>
               <button onClick={this.updateStudyPlaces} data-studyplace="Cafe" > Cafe </button>
               <button onClick={this.updateStudyPlaces} data-studyplace="Home" > Home </button>
               <button onClick={this.updateStudyPlaces} data-studyplace="Other" > Other </button>
               <p>Availability</p>
               <button onClick={this.updateAvailability} data-availability="Monday Morning" className="Monday"> Monday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Monday Afternoon" className="Monday" > Monday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Monday Evening" className="Monday" > Monday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Monday Night" className="Monday" > Monday Night </button>
               <button onClick={this.updateAvailability} data-availability="Tuesday Morning" className="Tuesday" > Tuesday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Tuesday Afternoon" className="Tuesday" > Tuesday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Tuesday Evening" className="Tuesday" > Tuesday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Tuesday Night" className="Tuesday" > Tuesday Night </button>
               <button onClick={this.updateAvailability} data-availability="Wednesday Morning" className="Wednesday" > Wednesday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Wednesday Afternoon" className="Wednesday" > Wednesday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Wednesday Evening" className="Wednesday" > Wednesday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Wednesday Night" className="Wednesday" > Wednesday Night </button>
               <button onClick={this.updateAvailability} data-availability="Thursday Morning" className="Thursday" > Thursday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Thursday Afternoon" className="Thursday" > Thursday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Thursday Evening" className="Thursday" > Thursday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Thursday Night" className="Thursday" > Thursday Night </button>
               <button onClick={this.updateAvailability} data-availability="Friday Morning" className="Friday" > Friday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Friday Afternoon" className="Friday" > Friday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Friday Evening" className="Friday" > Friday Night </button>
               <button onClick={this.updateAvailability} data-availability="Friday Night" className="Friday" > Friday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Saturday Morning" className="Saturday" > Saturday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Saturday Afternoon" className="Saturday" > Saturday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Saturday Evening" className="Saturday" > Saturday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Saturday Night" className="Saturday" > Saturday Night </button>
               <button onClick={this.updateAvailability} data-availability="Sunday Morning" className="Sunday" > Sunday Morning </button>
               <button onClick={this.updateAvailability} data-availability="Sunday Afternoon" className="Sunday" > Sunday Afternoon </button>
               <button onClick={this.updateAvailability} data-availability="Sunday Evening" className="Sunday" > Sunday Evening </button>
               <button onClick={this.updateAvailability} data-availability="Sunday Night" className="Sunday" > Sunday Night </button>
               <p>Submit</p>
               <button onClick={this.handleFormSubmit} className="submit">Submit</button>
            </form>
         ) 

       }

     }


     export default Questionnaire;


                    
                    
