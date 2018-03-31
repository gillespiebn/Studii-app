import React from "react";
import "./ResultsSegment.css";
import { Segment, Container, Header, Button, Grid, Icon } from 'semantic-ui-react';

const ResultsSegment = (props) => {
    if (props.resultData.length) {
        return(
            <Container style={{margin: 20}}>
                <Segment.Group raised>
                    <Container textAlign='center'><Segment><Header as='h2'>Results</Header></Segment></Container>
                    <Segment.Group >
                    {props.resultData.map(story => {
                        return(
                            <Segment key={`${story._id}`}>
                                <Grid stackable>
                                    <Grid.Row width={16}>
                                        <Grid.Column width={13} className="textArea">
                                            <Segment.Group raised>
                                                <Segment>
                                                    <h3><a href={`${story.web_url}`} target="blank">{`${story.headline.main}`}</a></h3>
                                                </Segment>
                                                <Segment>
                                                    <h4>{`${story.snippet}`}</h4>
                                                </Segment>
                                            </Segment.Group>
                                        </Grid.Column>
                                        <Grid.Column width={3}> 
                                            <Button data={`${story}`} type="submit" className="SaveButton" onClick={() => props.handleSave(story)} color='green'><Icon name='save' /> Save Article</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        )
                    })}
                    </Segment.Group>
                </Segment.Group>
            </Container>
        )
    } else {
        return <div></div>;
    }
}

export default ResultsSegment;

