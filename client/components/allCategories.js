import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import {fetchAllExpensesByCategory} from '../store/expense';
import {PieChart} from 'react-easy-chart';

 class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLine:'',
      chartData:[]
    };
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchExpenses(this.props.timeLine);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.timeLine +"NEXT PROPS");
    console.log(this.props.timeLine + "PROPS NOW");

    if(nextProps.timeLine!==this.props.timeLine)
    {
    this.props.fetchExpenses(nextProps.timeLine);
    }
  }
//   shouldComponentUpdate(nextProps, nextState){
//     console.log("shouldComponentUpdate");
//     // return a boolean value
//     return true;
// }

  render() {
    let expenses=[] ;
    expenses = this.props.expenses;
    console.log('MEMEMEMEMEME?!')
  
   
     return (
      <div align='center'>
       <h5 > Your Spendings for {this.props.timeLine} </h5>
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
       <div >
          <table className="table table-sm w-75 p-3">
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">category Name</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length && expenses.map((expense, i) => ( 
                <tr className="border border-light" key={i}>
                <td scope="row">{expense.categoryId}</td>
                <td><Link to={`/categories/singleCategory/${expense.categoryId}`}>{expense.name}</Link></td>
                <td>${expense.sum}</td></tr>
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
  console.log(arr + '###########array#######')
  var returnArray=[];
  var colorArr=['#00bfff','#FF1493','#7FFFD4','#FFD700','#E9967A','#90EE90','#80ff00','	#E9967A','	#FF1493','#90EE90','#FFD700'];
  //console.log(colorArr.length+"?????????????? color array ???????");
  for (var i = 0;i < arr.length;i++){
    if (arr[i] !== undefined){ 
    var chartObj = {};  
    chartObj.key = arr[i].name;
    chartObj.value = arr[i].sum;
    chartObj.color = colorArr[i];
    returnArray.push(chartObj); 
    }
   
  }
 
  return returnArray;
}

const mapStateToProps = (state,ownProps) => {
  //console.log(state+ "##########");
  console.log(JSON.stringify(state.expense[0]), "#########################")
  const timeLine = ownProps.match.params.timeLine || 'March';
  const chartData=toObject(state.expense);
  
  
  return {
    expenses: state.expense,
    timeLine: timeLine,
    chartData: chartData
  } 
}


const mapDispatchToProps = (dispatch,ownProps) => {
  // const timeLine = ownProps.match.params.timeLine || "March" ;
  // console.log('timeline in props dispatch', timeLine)
  const category = ownProps.match.params.category || "All";
  // console.log(timeLine);
  /*
    if timeline is not Q and Year then dispacth fetchAllExpensesByCategory
    else
    fetchAllExpensesBySingleCategory
    fetchQuarterlyExpBySingleCategory
    fetchQuarterlyExpByALLCategory
    

  */
  return {
    fetchExpenses: (timeLine) => dispatch(fetchAllExpensesByCategory(timeLine || 'March', category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCategories));







