import React, { Component } from "react";
import "./Calendar.css";

// class Calendar extends Component {
// <Form>
//     <Form.Group widths="equal">
                
//                     {this.state.times.SundayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.SundayMorning} name="SundayMorning" onClick={this.handleTimeToggle} data-times="SundayMorning" className="Sunday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.SundayMorning} name="SundayMorning" onClick={this.handleTimeToggle} data-times="SundayMorning" className="Sunday Morning" />}
                  
//                   {this.state.times.MondayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.MondayMorning} name="MondayMorning" onClick={this.handleTimeToggle} data-times="MondayMorning" className="Monday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.MondayMorning} name="MondayMorning" onClick={this.handleTimeToggle} data-times="MondayMorning" className="Monday Morning" />}
                  
//                   {this.state.times.TuesdayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.TuesdayMorning} name="TuesdayMorning" onClick={this.handleTimeToggle} data-times="TuesdayMorning" className="Tuesday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.TuesdayMorning} name="TuesdayMorning" onClick={this.handleTimeToggle} data-times="TuesdayMorning" className="Tuesday Morning" />}
                  
//                   {this.state.times.WednesdayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.WednesdayMorning} name="WednesdayMorning" onClick={this.handleTimeToggle} data-times="WednesdayMorning" className="Wednesday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.WednesdayMorning} name="WednesdayMorning" onClick={this.handleTimeToggle} data-times="WednesdayMorning" className="Wednesday Morning" />}
                  
//                   {this.state.times.ThursdayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.ThursdayMorning} name="ThursdayMorning" onClick={this.handleTimeToggle} data-times="ThursdayMorning" className="Thursday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.ThursdayMorning} name="ThursdayMorning" onClick={this.handleTimeToggle} data-times="ThursdayMorning" className="Thursday Morning" />}
                  
//                   {this.state.times.FridayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.FridayMorning} name="FridayMorning" onClick={this.handleTimeToggle} data-times="FridayMorning" className="Friday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.FridayMorning} name="FridayMorning" onClick={this.handleTimeToggle} data-times="FridayMorning" className="Friday Morning" />}
                 
//                   {this.state.times.SaturdayMorning ?
//                   <img alt="." src="/images/pinkMor.png" active={this.state.times.SaturdayMorning} name="SaturdayMorning" onClick={this.handleTimeToggle} data-times="SaturdayMorning" className="Saturday Morning" />
//                   : <img alt="." src="/images/blueMor.png" active={this.state.times.SaturdayMorning} name="SaturdayMorning" onClick={this.handleTimeToggle} data-times="SaturdayMorning" className="Saturday Morning" />}
                 
//                   </Form.Group>
//                   <Form.Group widths="equal"> 
                   
//                     {this.state.times.SundayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.SundayAfternoon} name="SundayAfternoon" onClick={this.handleTimeToggle} data-times="SundayAfternoon" className="Sunday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.SundayAfternoon} name="SundayAfternoon" onClick={this.handleTimeToggle} data-times="SundayAfternoon" className="Sunday Afternoon" />}
                  
//                   {this.state.times.MondayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.MondayAfternoon} name="MondayAfternoon" onClick={this.handleTimeToggle} data-times="MondayAfternoon" className="Monday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.MondayAfternoon} name="MondayAfternoon" onClick={this.handleTimeToggle} data-times="MondayAfternoon" className="Monday Afternoon" />}
                  
//                   {this.state.times.TuesdayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" onClick={this.handleTimeToggle} data-times="TuesdayAfternoon" className="Tuesday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.TuesdayAfternoon} name="TuesdayAfternoon" onClick={this.handleTimeToggle} data-times="TuesdayAfternoon" className="Tuesday Afternoon" />}
                  
//                   {this.state.times.WednesdayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" onClick={this.handleTimeToggle} data-times="WednesdayAfternoon" className="Wednesday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.WednesdayAfternoon} name="WednesdayAfternoon" onClick={this.handleTimeToggle} data-times="WednesdayAfternoon" className="Wednesday Afternoon" />}
                  
//                   {this.state.times.ThursdayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" onClick={this.handleTimeToggle} data-times="ThursdayAfternoon" className="Thursday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.ThursdayAfternoon} name="ThursdayAfternoon" onClick={this.handleTimeToggle} data-times="ThursdayAfternoon" className="Thursday Afternoon" />}
                  
//                   {this.state.times.FridayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.FridayAfternoon} name="FridayAfternoon" onClick={this.handleTimeToggle} data-times="FridayAfternoon" className="Friday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.FridayAfternoon} name="FridayAfternoon" onClick={this.handleTimeToggle} data-times="FridayAfternoon" className="Friday Afternoon" />}
                 
//                   {this.state.times.SaturdayAfternoon ?
//                   <img alt="." src="/images/pinkAft.png" active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" onClick={this.handleTimeToggle} data-times="SaturdayAfternoon" className="Saturday Afternoon" />
//                   : <img alt="." src="/images/blueAft.png" active={this.state.times.SaturdayAfternoon} name="SaturdayAfternoon" onClick={this.handleTimeToggle} data-times="SaturdayAfternoon" className="Saturday Afternoon" />}
//                   </Form.Group>
//                   <Form.Group widths="equal">

//                     {this.state.times.SundayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.SundayEvening} name="SundayEvening" onClick={this.handleTimeToggle} data-times="SundayEvening" className="Sunday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.SundayEvening} name="SundayEvening" onClick={this.handleTimeToggle} data-times="SundayEvening" className="Sunday Evening" />}
                  
//                   {this.state.times.MondayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.MondayEvening} name="MondayEvening" onClick={this.handleTimeToggle} data-times="MondayEvening" className="Monday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.MondayEvening} name="MondayEvening" onClick={this.handleTimeToggle} data-times="MondayEvening" className="Monday Evening" />}
                  
//                   {this.state.times.TuesdayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.TuesdayEvening} name="TuesdayEvening" onClick={this.handleTimeToggle} data-times="TuesdayEvening" className="Tuesday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.TuesdayEvening} name="TuesdayEvening" onClick={this.handleTimeToggle} data-times="TuesdayEvening" className="Tuesday Evening" />}
                  
//                   {this.state.times.WednesdayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.WednesdayEvening} name="WednesdayEvening" onClick={this.handleTimeToggle} data-times="WednesdayEvening" className="Wednesday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.WednesdayEvening} name="WednesdayEvening" onClick={this.handleTimeToggle} data-times="WednesdayEvening" className="Wednesday Evening" />}
                  
//                   {this.state.times.ThursdayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.ThursdayEvening} name="ThursdayEvening" onClick={this.handleTimeToggle} data-times="ThursdayEvening" className="Thursday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.ThursdayEvening} name="ThursdayEvening" onClick={this.handleTimeToggle} data-times="ThursdayEvening" className="Thursday Evening" />}
                  
//                   {this.state.times.FridayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.FridayEvening} name="FridayEvening" onClick={this.handleTimeToggle} data-times="FridayEvening" className="Friday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.FridayEvening} name="FridayEvening" onClick={this.handleTimeToggle} data-times="FridayEvening" className="Friday Evening" />}
                 
//                   {this.state.times.SaturdayEvening ?
//                   <img alt="." src="/images/pinkEve.png" active={this.state.times.SaturdayEvening} name="SaturdayEvening" onClick={this.handleTimeToggle} data-times="SaturdayEvening" className="Saturday Evening" />
//                   : <img alt="." src="/images/blueEve.png" active={this.state.times.SaturdayEvening} name="SaturdayEvening" onClick={this.handleTimeToggle} data-times="SaturdayEvening" className="Saturday Evening" />}
//                   </Form.Group>
//                   <Form.Group widths="equal">   
                   
//                     {this.state.times.SundayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.SundayNight} name="SundayNight" onClick={this.handleTimeToggle} data-times="SundayNight" className="Sunday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.SundayNight} name="SundayNight" onClick={this.handleTimeToggle} data-times="SundayNight" className="Sunday Night" />}
                  
//                   {this.state.times.MondayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.MondayNight} name="MondayNight" onClick={this.handleTimeToggle} data-times="MondayNight" className="Monday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.MondayNight} name="MondayNight" onClick={this.handleTimeToggle} data-times="MondayNight" className="Monday Night" />}
                  
//                   {this.state.times.TuesdayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.TuesdayNight} name="TuesdayNight" onClick={this.handleTimeToggle} data-times="TuesdayNight" className="Tuesday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.TuesdayNight} name="TuesdayNight" onClick={this.handleTimeToggle} data-times="TuesdayNight" className="Tuesday Night" />}
                  
//                   {this.state.times.WednesdayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.WednesdayNight} name="WednesdayNight" onClick={this.handleTimeToggle} data-times="WednesdayNight" className="Wednesday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.WednesdayNight} name="WednesdayNight" onClick={this.handleTimeToggle} data-times="WednesdayNight" className="Wednesday Night" />}
                  
//                   {this.state.times.ThursdayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.ThursdayNight} name="ThursdayNight" onClick={this.handleTimeToggle} data-times="ThursdayNight" className="Thursday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.ThursdayNight} name="ThursdayNight" onClick={this.handleTimeToggle} data-times="ThursdayNight" className="Thursday Night" />}
                  
//                   {this.state.times.FridayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.FridayNight} name="FridayNight" onClick={this.handleTimeToggle} data-times="FridayNight" className="Friday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.FridayNight} name="FridayNight" onClick={this.handleTimeToggle} data-times="FridayNight" className="Friday Night" />}
                 
//                   {this.state.times.SaturdayNight ?
//                   <img alt="." src="/images/pinkNi.png" active={this.state.times.SaturdayNight} name="SaturdayNight" onClick={this.handleTimeToggle} data-times="SaturdayNight" className="Saturday Night" />
//                   : <img alt="." src="/images/blueNi.png" active={this.state.times.SaturdayNight} name="SaturdayNight" onClick={this.handleTimeToggle} data-times="SaturdayNight" className="Saturday Night" />}
//                 </Form.Group>
//             </Form> 
  
//   export default Calendar;