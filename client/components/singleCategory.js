import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllExpensesBySingleCategory} from '../store/expense';
import {PieChart} from 'react-easy-chart';

class singleCategory extends Component {
    componentDidMount() {
      this.props.fetchAllExpBySingleCategory();
    }

    
  render() {
    let expenses = this.props.expenses || [];
    
    console.log(expenses);
   
     return (
      <div align='center'>
       <div >
          <PieChart
              labels
              padding={10}
              styles={{
                '.chart_lines': {
                  strokeWidth: 0
                },
                '.chart_text': {
                  fontFamily: 'serif',
                  fontSize: '1.25em',
                  fill: '#333'
                }
              }}
              size={350}
              innerHoleSize={200}
              data={this.props.chartData}
            />
      </div> 
      <div>  
       <table className="table table-sm w-75 p-3"  >
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">Expense Date</th>
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
     </div>
     )
    }
  }

  function toObject(arr) {
    var returnArray=[];
    var colorArr=['#00bfff','#FF1493','#7FFFD4','#FFD700','#E9967A','#90EE90','#80ff00','	#E9967A','	#FF1493','#90EE90','#FFD700'];
    console.log(colorArr.length);
    for (var i = 0;i < arr.length;i++)
    {
      if (arr[i] !== undefined)
      { 
      var chartObj = {};  
      chartObj.key = arr[i].merchant;
      chartObj.value = arr[i].amount;
      chartObj.color = colorArr[i];
      }
      returnArray.push(chartObj); 
    }
   
    return returnArray;
  } 
  
const mapStateToProps = (state,ownProps) => {
    console.log(state);
    const timeLine = ownProps.match.params.timeLine || "March";
    const chartData=toObject(state.expense);
    console.log(chartData);
    return {
      expenses: state.expense,
      timeLine: timeLine,
      chartData: chartData
      
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