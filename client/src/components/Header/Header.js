import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import "./Header.css";


const HeaderComponent = () => (
    <div>
        <Container textAlign='center' className="dark-bg pink-txt" fluid style={{paddingBottom: 10, padding: "20px"}}>
            <Header as='h1'id="pink-txt">
                studii
            </Header>
        </Container>
    </div>
  )

export default HeaderComponent