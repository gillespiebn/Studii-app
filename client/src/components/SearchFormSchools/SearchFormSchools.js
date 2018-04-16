import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
// import SearchExampleStandard from './SearchExampleStandard';
import PropTypes from 'prop-types';



const resultRenderer = ({ name, code }) => <Label key={code} content={name} />

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  code: PropTypes.string,
}


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
          this.setState({count: this.state.count + 1})
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
        <Grid.Column width={16}>
          <Search
            fluid
            key={this.resultRenderer}
            noResultsMessage ={"No Results Found"}
            minCharacters= {3}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
