import React from "react";
import "./SearchForm.css";
import { Segment, Container, Header, Icon, Label, Form, Button} from 'semantic-ui-react';
// import TheForm from '../TheForm';


class SearchForm extends React.Component {
    state = {

    };

    
    render(props) {
        return(
            <Container>
                <Segment style={{marginTop: 20}} raised>
                    <Container textAlign='center'>
                        <Header as="h2">Search</Header>
                    </Container>
                    <Container>
                        <Form>
                            <Form.Field className={`${this.props.queryEmpty}`}>
                                <Label>{<Icon name="search" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                                <input type='text' placeholder='Search Term' required name="query" onChange={this.props.handleInputChange}/>
                                {this.props.queryEmpty ? 
                                    <Label basic color='red' pointing>The whole point of a search bar is to search for something. C'mon bro...You're better than this.</Label>
                                : "" }
                            </Form.Field>
                            <Form.Field className={`${this.props.numResultsEmpty} ${this.props.numResultsTooBig}`}>
                                <Label>{<Icon name="numbered list" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                                <input type='number' placeholder='Number of Results' required name="numResults" onChange={this.props.handleInputChange}/>
                                {this.props.numResultsEmpty ? 
                                    <Label basic color='red' pointing>Ya I'm gonna need you to go ahead and...tell me how many you want to display. Mmkay? Thanks Peter</Label>
                                : "" }
                                {this.props.numResultsTooBig ? 
                                    <Label basic color='red' pointing>Keep it under 10 ya? Cuz I don't wanna code no more.</Label>
                                : "" }
                            </Form.Field>
                            <Form.Field className={`${this.props.dateBackward}  ${this.props.dateEarly}  ${this.props.dateLate}`}>
                                <Label>{<Icon name="remove from calendar" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                                <input type='number' placeholder='Start Year' name="startDate"  onChange={this.props.handleInputChange}/>
                                {this.props.dateBackward ? 
                                    <Label basic color='red' pointing>End year has to be after start date</Label>
                                : "" }
                                {this.props.dateEarly ? 
                                    <Label basic color='red' pointing>Lets be real here...the New York Times wasn't a thing then yo. 1851 or later brah</Label>
                                : "" }
                                {this.props.dateLate ? 
                                    <Label basic color='red' pointing>Ya...so it's only 2018. Maybe lets stick to what is possible or something...or just leave it blank! That way I don't have to write all these damn warnings.</Label>
                                : "" }
                            </Form.Field>
                            <Form.Field className={`${this.props.dateBackward} ${this.props.dateLate}`}>
                                <Label>{<Icon name="add to calendar" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                                <input type='number' placeholder='End Year' name="endDate" className={this.props.dateBackward} onChange={this.props.handleInputChange}/>
                                {this.props.dateBackward ? 
                                    <Label basic color='red' pointing>End year has to be after start date</Label>
                                : "" }
                                {this.props.dateLate ? 
                                    <Label basic color='red' pointing>Ya...so it's only 2018. Maybe lets stick to what is possible or something...or just leave it blank! That way I don't have to write all these damn warnings.</Label>
                                : "" }
                            </Form.Field>
                        </Form>
                        <Button type="submit" onClick={this.props.handleFormSubmit}content='Click Here' />
                    </Container>
                </Segment>
            </Container>
        )
    }
}


export default SearchForm;
