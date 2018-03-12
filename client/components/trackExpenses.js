import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllExpensesToCompare} from '../store/expense';

 class trackExpenses extends Component {
  
  componentDidMount() {
    console.log("componentDidMount:trackExpenses"); 
    this.props.fetchTrackExpenses();
  }
  render() {
    let expenses = this.props.expenses||[];
    return (
      <div>trackExpenses
         <div>
       <table className="table table-sm w-75 p-3"  >
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">category Name</th>
                <th scope="col"> Expense Amount</th>
                <th scope="col"> Budget Amount</th>
                <th scope="col"> RAG status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length && expenses.map(expense => ( 
                <tr  className="border border-light" key={ expense.categoryId }>
                  <th scope="row">{ expense.categoryId }</th>
                  <td>{expense.name }</td>
                  <td>$ { expense.sum }</td>
                  <td>$ { expense.amount }</td>
                  {expense.sum > expense.amount ?
                  <td bgcolor="Red">Over Budget</td> : 
                  <td bgcolor="Green">Within Budget</td> 
                  }
                </tr>
                ))
              } 
             
            </tbody>
          </table>  
      </div>  

      </div>
    )
    
  }
}  



const mapStateToProps = (state,ownProps) => {
  console.log(state);
  return {
    expenses: state.expense
  } 
 
}
const mapDispatchToProps = (dispatch,ownProps) => {
  //console.log("mapDispatchToProps");  
  return {
    fetchTrackExpenses: () => dispatch(fetchAllExpensesToCompare())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(trackExpenses)
