import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllExpensesToCompare} from '../store/expense';
import {BarChart} from 'react-easy-chart';
import { withRouter} from 'react-router-dom';
 class trackExpenses extends Component {
  
  componentDidMount() {
    console.log("componentDidMount:trackExpenses"); 
    this.props.fetchTrackExpenses();
  }
  render() {
    let expenses = this.props.expenses||[];
    return (
      <div>
          <div align='center'>
          <BarChart
              axisLabels={{x: 'My x Axis', y: 'My y Axis', y2: 'My second y Axis'}}
              axes
              grid
              colorBars
              height={450}
              width={650}
              interpolate={'cardinal'}
              y2Type="linear"
              lineData={this.props.chartLineData}
              data={this.props.chartData}
            />
          </div>
         <div>
       <table className="table table-sm w-75 p-3"  >
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">category Name</th>
                <th scope="col"> Expense Amount</th>
                <th scope="col"> Budget Amount</th>
                <th scope="col"> Budget Alert </th>
              </tr>
            </thead>
            <tbody>
              {expenses.length && expenses.map((expense,i)=> ( 
                <tr  className="border border-light" key={i}>
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

function toObjectData(arr) {
  var returnArray=[];
  for (var i = 0;i < arr.length;i++)
  {
    if (arr[i] !== undefined)
    { 
    var chartObj = {};  
    chartObj.x = arr[i].name;
    chartObj.y = arr[i].sum;
    returnArray.push(chartObj); 
    }    
  }
  return returnArray;
} 
function toObjectLine(arr) {
  var returnArray=[];
  for (var i = 0;i < arr.length;i++)
  {
    if (arr[i] !== undefined)
    { 
    var chartObj = {};  
    chartObj.x = arr[i].name;
    chartObj.y = arr[i].amount;
    returnArray.push(chartObj); 
    }    
  }
  return returnArray;
} 

const mapStateToProps = (state,ownProps) => {
  console.log(state);
  const chartData=toObjectData(state.expense);
  console.log(chartData);
  const chartLineData=toObjectLine(state.expense);
  console.log(chartLineData);
  return {
    expenses: state.expense,
    chartLineData: chartLineData,
    chartData: chartData
  } 
 
}
const mapDispatchToProps = (dispatch,ownProps) => {
  //console.log("mapDispatchToProps");  
  return {
    fetchTrackExpenses: () => dispatch(fetchAllExpensesToCompare())
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(trackExpenses));
