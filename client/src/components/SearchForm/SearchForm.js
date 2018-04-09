import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Label } from 'semantic-ui-react'
import twoSchools from '../../utils/twoSchools.js'
import allSchools from '../../utils/allSchools.js'
// import SearchExampleStandard from './SearchExampleStandard';
import PropTypes from 'prop-types';


const source = allSchools;

const resultRenderer = ({ name, code }) => <Label key={code} content={name} />

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
}

const SearchExampleStandardCustom = () => (
  <SearchExampleStandard resultRenderer={resultRenderer} />
)


export default class SearchExampleStandard extends Component {
  state= {
    count: 0,
    schoolsForAutocomplete: this.props.schoolsForAutocomplete
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => {
        if (this.state.count < 10){
          re.test(result.name)
          this.setState({count: this.state.count + 1})
        } else { 
          this.setState({count: 0})
          return
        }
      }

      this.setState({
        isLoading: false,
        results: _.filter(this.props.schoolsForAutocomplete, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            fluid
            noResultsMessage ={"No Results Found"}
            minCharacters= {3}
            resultRenderer={resultRenderer}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
