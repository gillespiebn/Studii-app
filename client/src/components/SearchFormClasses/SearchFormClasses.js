import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const resultRenderer = ({ fullName, code }) => <Label key={code} content={fullName} ></Label>

resultRenderer.propTypes = {
  fullName: PropTypes.string,
  description: PropTypes.string,
  code: PropTypes.string,
}

export default class SearchExampleStandard extends Component {
  state= {
    count: 0,
    classNamesForAutocomplete: this.props.classNamesForAutocomplete
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], valueClass: '' })

  handleResultSelect = (e, { result }) => this.setState({ valueClass: result.name })

  handleSearchChange = (e, { valueClass }) => {
    this.setState({ isLoading: true, valueClass })

    setTimeout(() => {
      if (this.state.valueClass.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.valueClass), 'i')
      const isMatch = result => {
          this.setState({count: this.state.count + 1})
      }

      this.setState({
        isLoading: false,
        results: _.filter(this.props.classNamesForAutocomplete, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, valueClass, results } = this.state

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
