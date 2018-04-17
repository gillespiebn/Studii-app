// import React from "react";
// import _ from 'lodash';
// import "./PracticeProfileLayout.css";
// import Footer from "../Footer";
// import API from "../../utils/API";

// import { Card, Image, Container, Button, List, Transition } from 'semantic-ui-react'

// class Profiles extends React.Component {  

//     state = {
//        user: this.props.user,
//        matches: this.props.matches,
//        facebook_id: this.props.facebook_id,
     
//      }

//     componentDidMount() {
//         this.getUser();
//         this.getMatches();
//         console.log("there is a fairy");
//     }

//     getUser = () => {
//         API.getUser(this.props.facebook_id)
//             .then(data => {
//                 this.setState({user: data.data[0]})
//                 console.log(data)
//                 this.getMatches()
//             })
//     };

//     getMatches = () => {
//         API.getMatches(this.state.user)
//         .then(data => {
//             console.log("the line under this is matches")
//             console.log(data)      
//         })
//     };

//     render() {
//         console.log("at render " + this.state.matches.length);
//         var firstUserId=this.props.matches[0].facebook_id;
//         if (this.state.matches) {
//             return(
//                 <div>
//                     <Container>
//                         {this.state.matches.map(profile => (
//                             <Card className="cardContainer" fluid align="center" key={profile._id} style={{display: (firstUserId===profile.facebook_id ? 'block' : 'none') }}>
//                                 <div className="imgDiv">
//                                     <Image className="cardImage" src={profile.photo} size='small' />
//                                 </div>
//                                 <div className="profileDiv">
//                                     <h2 className="profileName">{profile.name}</h2>
//                                     <h3 className="profileElmt">{profile.classStanding}</h3>
//                                     <h3 className="profileElmt">Major -  {profile.major}</h3>
//                                     {profile.minor ? 
//                                     <h3 className="profileElmt">Minor -  {profile.minor}</h3>
//                                     : "" 
//                                     }
//                                 </div> 
//                                 <div class="prfDiv">
//                                     <h3>Classes</h3>
//                                     <h3>Study Methods</h3>
//                                     <h3>Preferred Locations</h3>
//                                     <h3>Availability</h3>
//                                 </div> 
//                             </ Card>
//                             <div>
//                                 <Button.Group>
//                                     <Button icon='plus' onClick={this.handleNext} />
//                                 </Button.Group>
//                             </div>
//                         ))}                    
//                     </Container>
//                     <Footer />
//                 </div>  
//             )
//         }
//     }
// }

//  export default Profiles;

//  CAN THIS BE DELETED BELOW????????? /////////////////////////////////////////////////////////////////////////////////////////////////////////

                //   <Transition.Group
                //       as={List}
                //       duration={200}
                //       divided
                //       size='huge'
                //       verticalAlign='middle'
                //     />
                //     {profiles.map(item => (
                //       <List.Item key={item} />
                //         <Card fluid style={{marginTop: 20}} align="center" key={profile._id}>
                //         <Segment align="center"> 
                //         <Image src={profile.photo} size='small' />
                //         <h2>Name: {profile.name}</h2>
                //         <h2>Class: {profile.classStanding}</h2>
                //         <h3>Major: {profile.major}</h3>
                //           {profile.minor ? 
                //           <h3>Minor: {profile.minor}</h3>
                //               : "" 
                //         }
                //        <Segment> 
                //       ))}
                //       < /Card >
        //   ))}

          /* <Card
            image='/assets/images/avatar/large/elliot.jpg'
            header='Elliot Baker'
            meta='Friend'
            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
          /> */
