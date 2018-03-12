import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllBudgets, putBudget} from '../store/budget';


    
 class allBudgets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      budgets: this.props.budgets || [],
      budgetId: this.props.budgetId,
      value: '',
      isEdit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
  componentDidMount() {
    this.props.fetchBudgets();
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log("In handleSubmit");
    event.preventDefault();
    const id = this.state.budgetId;
    const amount = this.state.value;
    this.props.editBudgetInfo(id, {amount});
    
  }

  render() {
    let budgets = this.props.budgets || [];
    let budgetId = this.props.budgetId || 0;
    //console.log((budgetId));
    return (
      <div>
      <form className="form-group" onSubmit={(eve) => this.handleSubmit(eve)}> 
       <table className="table table-sm w-75 p-3"  >
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">Category Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {budgets.length && budgets.map(budget => ( 
                <tr  className="border border-light" key={ budget.id}>
                  <th scope="row">{ budget.id }</th>
                  <td>{ budget.category.name }</td>
                  {+budgetId === budget.id ? (<td className="w-25 p-3"><input type="text" className="amount" defaultValue={budget.amount} onChange={this.handleChange}/></td>)
                  :(<td>{budget.amount }</td>)
                  }
                  <td><Link to={`/editBudgets/${budget.id}`} className="textColor">Edit</Link></td>
                  <td><input className="btn btn-primary" type="submit" value="Submit"/></td>
                </tr>
                ))
              } 
             
            </tbody>
          </table>
         </form> 
        </div>       
    )
  }
}


const mapStateToProps = (state,ownProps) => {
    
  console.log(ownProps.match.params.budgetId);

  return {
    budgets: state.budget,
    categories: state.category,
    budgetId:ownProps.match.params.budgetId
    
  }
}



const mapDispatchToProps = (dispatch,ownProps) => {
  console.log("mapDispatchToProps ");

  const budgetId = ownProps.match.params.budgetId ||0;
  
  return {
    editBudgetInfo: (id,Amount) => dispatch((putBudget(id,{Amount}))),
    fetchBudgets: () => dispatch(fetchAllBudgets())
  }
  
  // ,
  // {
  //   editBudgetInfo: (id,Amount) => dispatch((putBudget(id,{Amount})))
  // }
 //]
}

export default connect(mapStateToProps, mapDispatchToProps)(allBudgets);