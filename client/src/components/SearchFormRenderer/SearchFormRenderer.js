import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'semantic-ui-react'
import SearchExampleStandard from './SearchForm'

const resultRenderer = ({ name }) => <Label content={name} />

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
}

const SearchExampleStandardCustom = () => (
  <SearchExampleStandard  resultRenderer={resultRenderer} />
)

export default SearchExampleStandardCustom