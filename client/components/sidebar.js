import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


const SideBar = (props) => {
  
const categories = props.category

  return (
   <div>
    <ul class="list-group">
      <li class="list-group-item"><Link to={'/categories'} className="textColor">ALL Categories</Link></li>
      <li class="list-group-item"><Link to={'/allBudgets'} className="textColor">Set Budget</Link></li>
      <li class="list-group-item"><Link to={'/trackExpenses'} className="textColor">Track Expenses</Link></li>
    </ul>
   </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.category
  }
}


export default connect(mapState)(SideBar);
