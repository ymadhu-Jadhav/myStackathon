import React, { Component } from 'react'
import {connect} from 'react-redux'
//import {fetchAllExpensesToCompare} from '../store/expense';

class trackExpenses extends Component {
    // componentDidMount() {
    //   this.props.fetchForComparison();
    // }

    
  render() {
    // let expenses = this.props.expenses || [];
    // let budgets = this.props.budgets || [];
    
    //console.log(expenses);
   
     return (
      <div>
          <h5>In  trackExpenses component</h5>
          {/* <div>
              for Chart
           </div> */}

           {/* <div>
       <table className="table table-sm w-75 p-3"  >
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">Expsense Date</th>
                <th scope="col">Merchant</th>
                <th scope="col">Account No</th>
                <th scope="col">Category Name</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length && expenses.map(expense => ( 
                <tr  className="border border-light" key={ expense.categoryId }>
                  <th scope="row">{ expense.id }</th>
                  <td>{ expense.expsDate }</td>
                  <td>{expense.merchant }</td>
                  <td>{ expense.accountNo }</td>
                  <td>{expense.category?expense.category.name:"Not Available" }</td>
                  <td>$ { expense.amount }</td>
                </tr>
                ))
              } 
             
            </tbody>
          </table>  
      </div>   */}

     </div>
     )
    }
  }

// const mapStateToProps = (state,ownProps) => {
//     console.log(state);
//     const timeLine = ownProps.match.params.timeLine || "March";
//     return {
//       expenses: state.expense,
//       budgets: state.budget,
//       timeLine: timeLine,
      
//     }
//   }



// const mapDispatchToProps = (dispatch,ownProps) => {
//     const timeLine = ownProps.match.params.timeLine || "March";
//     const category = ownProps.match.params.categoryId || "All";
//     const budget = ownProps.match.params.budget;
  
//     console.log(category);    
//     /*
//       if timeline is not Q and Year then dispactcg fetchAllExpensesByCategory
//       else
//       fetchAllExpensesBySingleCategory
//       fetchQuarterlyExpBySingleCategory
//       fetchQuarterlyExpByALLCategory
      
  
//     */
//     return {
//         fetchForComparison: () => dispatch(fetchAllExpensesToCompare(timeLine,category,budget))
//     }
//   }

// export default connect(mapStateToProps, mapDispatchToProps)(trackExpenses);
export default trackExpenses;