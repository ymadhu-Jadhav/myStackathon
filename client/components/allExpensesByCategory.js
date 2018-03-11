
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllExpensesByCategory } from '../store/expense'


const allExpensesByCategory = (props) => {
  const expenses = props.expenses
  return (
    <div className="allProductsContainer">
      {
        expenses && expenses.map(expense => {
          return <div key={expense.id} className="product textColor">
            <img src={expense.image} alt={expense.title} />
            <Link to={`/expenses/${expense.id}`}><h2 className="title">{expense.title}</h2></Link>
            <ul>
              <li className="textColor">${expense.price}</li>
              <li className="textColor">description: {expense.description} </li>
            </ul>
            {/* <NewLineItem selectedProduct={aProduct} user={props.user} /> */}
          </div>
        })
      }
    </div>
  )
}

const mapState = (state, ownProps) => {
  const categoryName = ownProps.match.params.categoryName
  return {
    expenses: state.expense.filter(expense => expense.category === categoryName),
    category: state.category
  }
}


export default connect(mapState)(allExpensesByCategory)
