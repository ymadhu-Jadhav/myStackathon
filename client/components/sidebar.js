import React from 'react';
import { connect } from 'react-redux';
import {withRouter,Link,NavLink} from 'react-router-dom'



const SideBar = (props) => {
  
const categories = props.category

  return (
    
   <div>
    <ul className="list-group">
      <li className="list-group-item"><NavLink to={'/categoriesByMonth/March'} className="textColor">ALL Category-Expenses Monthly</NavLink></li>
      <li className="list-group-item"><NavLink to={'/categoriesByQuarter/Q1'} className="textColor">ALL Category-Expenses Quarterly</NavLink></li>
      <li className="list-group-item"><Link to={'/allBudgets'} className="textColor">Set Budget</Link></li>
      <li className="list-group-item"><Link to={'/trackExpenses'} className="textColor">Track Expenses</Link></li>
      <li className="list-group-item"><Link to={'/newExpenseEntry'} className="textColor">Insert Expenses</Link></li>
      <li className="list-group-item"><Link to={'/displayCategories'} className="textColor">Display All Categories</Link></li>
    </ul>
   </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.category
  }
}


export default withRouter(connect(mapState)(SideBar));
