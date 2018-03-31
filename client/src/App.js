import React from "react";
import Container from "./components/Container/Container";
import SearchForm from "./components/SearchForm/SearchForm";
import Header from "./components/Header/";
import ResultsSegment from "./components/ResultsSegment/";
import API from "./utils/API";
import SavedSegment from "./components/SavedSegment/";
require('dotenv').config()


class App extends React.Component {
    state = {
        query: '',
        startDate: '',
        endDate: '',
        numResults: '',
        dateBackward: '',
        queryEmpty: '',
        numResultsEmpty: '',
        numResultsTooBig: '',
        dateEarly: '',
        dateLate: '',
        resultData: {},
        savedArticles: {},
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
        this.setState({dateBackward: '', dateEarly: '', dateLate: '', queryEmpty: '', numResultsEmpty: '', numResultsTooBig: ''})
        this.checkQuery();
        this.checkDate();
        this.checkNumResults();
        if (!this.state.dateBackward && !this.state.dateEarly && !this.state.dateLate && !this.state.queryEmpty && !this.state.numResultsEmpty && !this.state.numResultsTooBig) {
            API.searchNytServer(this.state)
              .then(res => {
                if (res.data.status === "error") {
                  throw new Error(res.data.message);
                }
                this.handleSearchResults(res);
              })
              .catch(err => this.setState({ error: err.message }));
        };
    };

    handleSearchResults = res => {
        let response = res.data.response.docs
        response.length = this.state.numResults;
        this.setState({resultData: response});
    };
    

    checkQuery = () => {
        if (!this.state.query) {
            this.setState({ queryEmpty: "error" })
        }
    };

    retrieveSaved = () => {
        API.retrieveAll().then(data => {
            this.setState({ savedArticles: data.data, query: "", startDate: "", endDate: "", numResults: "" })
        });
    }

    componentDidMount () {
        this.retrieveSaved()
    }

    checkDate = ()=> {
        if (parseInt(this.state.endDate, 10) < parseInt(this.state.startDate, 10)) {
            this.setState({ dateBackward: "error" })
        }
        if (parseInt(this.state.startDate, 10) < 1851) {
            this.setState({dateEarly: "error"})
        }
        if (parseInt(this.state.startDate, 10) > 2018 || parseInt(this.state.endDate, 10) > 2018) {
            this.setState({dateLate: "error"})
        }
    };

    checkNumResults = () => {
        if (!this.state.numResults) {
            this.setState({numResultsEmpty: "error"})
        }
        if (parseInt(this.state.numResults, 10) > 10) {
            this.setState({numResultsTooBig: "error"})
        }
    };

    handleSave = story => {
        const objectToSave = {
            nyt_id: story._id,
            headline: story.headline.main,
            snippet: story.snippet,
            link: story.web_url
        }
        API.create(objectToSave)
        .then(data => this.retrieveSaved())
    }

    handleDelete = nyt_id => {
        API.deleteArticle(nyt_id).then(data=> this.retrieveSaved())
    }
    
    render() {
        return(
            <div>
                <Header />
                <Container>
                    <SearchForm 
                    handleInputChange = {this.handleInputChange}
                    handleFormSubmit = {this.handleFormSubmit}
                    dateBackward = {this.state.dateBackward}
                    numResultsEmpty = {this.state.numResultsEmpty}
                    queryEmpty = {this.state.queryEmpty}
                    dateEarly = {this.state.dateEarly}
                    dateLate = {this.state.dateLate}
                    numResultsTooBig ={this.state.numResultsTooBig}
                    />
                    <SavedSegment
                        savedArticles = {this.state.savedArticles}
                        handleDelete = {this.handleDelete}
                    />
                    <ResultsSegment
                        resultData = {this.state.resultData}
                        handleSave = {this.handleSave}
                    />
                </Container>
            </div>
        )
    }
}

export default App;
