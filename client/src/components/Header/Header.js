/* eslint-disable max-len */

import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'
import "./Header.css";


const ContainerExampleFluid = () => (
    <div>
        <Container textAlign='center' fluid style={{background:"black", paddingBottom: 10}}>
            <Header as='h1' icon  inverted>
                <Icon name='newspaper' size="massive" />
                Your Dream Come True
                <Header.Subheader style={{color: "white"}}>
                <p>If your dream is to search and save New York Times stories. Kind of a lame dream to be honest</p>
                </Header.Subheader>
            </Header>
        </Container>
    </div>
  )

export default ContainerExampleFluid