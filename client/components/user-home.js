import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Sidebar from './sidebar';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {firstName} = props

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <Sidebar />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
