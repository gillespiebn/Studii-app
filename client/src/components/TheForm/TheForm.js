import React from "react";
import "./TheForm.css";
import { Form, Icon, Container, Button, Label} from 'semantic-ui-react'

const TheForm = (props) => {
    return (
        <Container>
            <Form>
                <Form.Field>
                    <Label>{<Icon name="search" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                    <input type='text' placeholder='Search Term' required name="query" onChange={props.handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <Label>{<Icon name="numbered list" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                    <input type='number' placeholder='Number of Results' required name="numResults" onChange={props.handleInputChange}/>
                </Form.Field>
                <Form.Field className={props.dateCorrect}>
                    <Label>{<Icon name="remove from calendar" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                    <input type='number' placeholder='Start Year' name="startDate"  onChange={props.handleInputChange}/>
                    {props.dateCorrect ? 
                        <Label basic color='red' pointing>End year has to be after start date</Label>
                    : "" }
                </Form.Field>
                <Form.Field className={props.dateCorrect}>
                    <Label>{<Icon name="add to calendar" size="large" style={{marginBottom: 5}}></Icon>}</Label>
                    <input type='number' placeholder='End Year' name="endDate" className={props.dateCorrect} onChange={props.handleInputChange}/>
                    {props.dateCorrect ? 
                        <Label basic color='red' pointing>End year has to be after start date</Label>
                    : "" }
                </Form.Field>
            </Form>
            <Button type="submit" onClick={props.handleFormSubmit}content='Click Here' />
        </Container>
    )
} 



export default TheForm

