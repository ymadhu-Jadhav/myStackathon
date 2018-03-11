import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllExpensesBySingleCategory} from '../store/expense';

class singleCategory extends Component {
    componentDidMount() {
      this.props.fetchAllExpBySingleCategory();
    }

    
  render() {
    let expenses = this.props.expenses||[];
    
    console.log(expenses);
   
     return (
      <div>
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
     </div>
     )
    }
  }

const mapStateToProps = (state,ownProps) => {
    console.log(state);
    const timeLine = ownProps.match.params.timeLine || "March";
    return {
      expenses: state.expense,
      timeLine: timeLine,
      
    }
  }



const mapDispatchToProps = (dispatch,ownProps) => {
    const timeLine = ownProps.match.params.timeLine || "March";
    const category = ownProps.match.params.categoryId || "All";
  
    console.log(category);    
    /*
      if timeline is not Q and Year then dispactcg fetchAllExpensesByCategory
      else
      fetchAllExpensesBySingleCategory
      fetchQuarterlyExpBySingleCategory
      fetchQuarterlyExpByALLCategory
      
  
    */
    return {
        fetchAllExpBySingleCategory: () => dispatch(fetchAllExpensesBySingleCategory(timeLine,category))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(singleCategory);