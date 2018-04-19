import React from 'react'
import PracticeProfileLayout from "../../components/PracticeProfileLayout";
import API from "../../utils/API";
import Loading from "../../components/Loading"

class Home extends React.Component {
    state = {
       user: null,
       matches: null
     }

    componentDidMount() {
      this.getUser();
    }
 
    getUser = () => {
      API.getUser(this.props.facebook_id)
        .then(data => {
            this.setState({user: data.data})
        }
      )
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevState.user !== this.state.user){
        this.getMatches();
      }
    }
    getMatches = () => {
      API.getMatches(this.state.user)
        .then(data => {
        this.setState({matches: data.data})
      }
    )
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return(
    <div>
      {this.state.matches ? 
          <PracticeProfileLayout matches={this.state.matches} user={this.state.user} facebook_id={this.props.facebook_id } />
        : 
          <Loading />
      }
    </div>
    )
  }
}

export default Home;
