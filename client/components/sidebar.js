import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


const SideBar = (props) => {
  
   const categories = props.category

  return (
    <div id="sidebar-wrapper">
      <div>
        <h3 className="sidenav home">Categories</h3>
        <ul>
          {
          <h5 className="card-title"><Link to={'/categories'} className="textColor">All</Link></h5>
          
          }
        </ul>
        <h5 className="card-title"><Link to={'/allBudgets'} className="textColor">Set Budget</Link></h5>
        <h5 className="card-title"><Link to={'/trackExpenses'} className="textColor">Track Expenses by Budget</Link></h5>

      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.category
  }
}


export default connect(mapState)(SideBar);
