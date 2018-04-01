import React from "react";
import Container from "./components/Container/Container";
import Header from "./components/Header/";
import API from "./utils/API";
import WeHaveAnEmptyProject from "./components/WeHaveAnEmptyProject";


class App extends React.Component {
    state = {
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
          [name]: value
        });
      };
      
    handleFormSubmit = event => {
        event.preventDefault();
    };


    componentDidMount () {
    }

    render() {
        return(
            <div>
                <WeHaveAnEmptyProject />
            </div>
        )
    }
}

export default App;
