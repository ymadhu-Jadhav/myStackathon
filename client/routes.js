import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Login, Signup, UserHome, AllCategories, Sidebar, SingleCategory, AllBudgets, TrackExpenses, DisplayCategories, NewExpenseEntry} from './components'
import {me,fetchAllCategories,fetchAllBudgets } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/categoriesByMonth/:timeLine" component={AllCategories} />
              <Route exact path="/categoriesByQuarter/:timeLine" component={AllCategories} />
              <Route exact path="/categoriesByYear/:timeLine" component={AllCategories} />
              <Route exact path="/displayCategories" component={DisplayCategories} />
              <Route exact path="/home" component={AllCategories} />
              <Route exact path="/allBudgets"  component={AllBudgets} />
              <Route exact path="/editBudgets/:budgetId"  component={AllBudgets} />
              <Route exact path="/categories/singleCategory/:categoryId"  component={SingleCategory} />
              <Route exact path="/trackExpenses"  component={TrackExpenses} />
              <Route exact path="/newExpenseEntry"  component={NewExpenseEntry} />
              
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    category: state.category
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchAllBudgets())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}






