import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllExpensesByCategory} from '../store/expense';
import {PieChart} from 'react-easy-chart';

 class AllCategories extends Component {
  componentDidMount() {
    this.props.fetchExpenses();
  }

  render() {
    let expenses = this.props.expenses||[];
    
    //console.log(expenses);
   
     return (
      <div align='center'>
       <h5 > My Spending for {this.props.timeLine} </h5>
       <div>
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
                <th scope="col">category Name</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length && expenses.map(expense => ( 
                <tr  className="border border-light" key={ expense.categoryId }>
                  <th scope="row">{ expense.categoryId }</th>
                  <Link to={`/categories/singleCategory/${expense.categoryId}`}><td>{expense.name }</td></Link>
                  <td>$ { expense.sum }</td>
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
  var colorArr=['#00bfff','#dce7c5','#0040ff','#8000ff','#80ff00','#d9534f','	#FF1493','#ADFF2F','#ADD8E6','#8A2BE2','#7FFFD4'];
  console.log(colorArr.length);
  for (var i = 0;i < arr.length;i++)
  {
    if (arr[i] !== undefined)
    { 
    var chartObj = {};  
    chartObj.key = arr[i].name;
    chartObj.value = arr[i].sum;
    chartObj.color = colorArr[i];
    }
    returnArray.push(chartObj); 
  }
 
  return returnArray;
}

const mapStateToProps = (state,ownProps) => {
  //console.log(state);
  const timeLine = ownProps.match.params.timeLine || "March";
  
  const chartData=toObject(state.expense);
  
  
  return {
    expenses: state.expense,
    timeLine: timeLine,
    chartData: chartData
  }
}


const mapDispatchToProps = (dispatch,ownProps) => {
  const timeLine = ownProps.match.params.timeLine || "March";
  const category = ownProps.match.params.category || "All";

  /*
    if timeline is not Q and Year then dispactcg fetchAllExpensesByCategory
    else
    fetchAllExpensesBySingleCategory
    fetchQuarterlyExpBySingleCategory
    fetchQuarterlyExpByALLCategory
    

  */
  return {
    fetchExpenses: () => dispatch(fetchAllExpensesByCategory(timeLine,category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);