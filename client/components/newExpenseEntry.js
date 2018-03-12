import React from 'react';
import { connect } from 'react-redux';
import { postExpense, writeExpense} from '../store';

function NewExpenseEntry (props) {

  const { expsDate, month, quarter, year, merchant, accountNo, amount, newExpenseEntry, handleChange, handleSubmit } = props;

  return (
    <form id="new-expense-form" onSubmit={evt => handleSubmit(expsDate, month, quarter, year, merchant, accountNo, amount, newExpenseEntry, evt)}>
      <div align='center'>
       <table>
        <tr>
            <td>
              Expense Date
            </td> 
            <td>
            <input type="text" className="form-control " aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
            </td> 
         </tr>
         <tr>
            <td>
            Merchant Name
            </td> 
            <td>
            <input type="text" className="form-control " aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
            </td> 
         </tr> 
         <tr>
            <td>
              Account Name
            </td> 
            <td>
            <input type="text" className="form-control " aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
            </td> 
         </tr> 
         <tr>
            <td>
             Expense Amount
            </td> 
            <td>
            <input type="text" className="form-control " aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
            </td> 
         </tr> 
         </table>
          <div align ='right'>
          <span className="input-group-btn" align='center'>
            <button className="btn btn-default" type="submit" >Submit</button>
          </span>
          </div>
      </div>
    </form>
  );
}

const mapStateToProps = function (state, ownProps) {
  return {
    newExpenseEntry: state.newExpenseEntry,
    expsDate: state.expsDate,
    month: state.month,
    quarter: state.quarter,
    year: state.year,
    merchant: state.merchant,
    accountNo: state.accountNo,
    amount: state.amount
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeExpense(evt.target.value));
    },
    handleSubmit (name, content, evt) {
      evt.preventDefault();

      const { categoryId } = ownProps;

      dispatch(postExpense({ expsDate, month, quarter, year, merchant, accountNo, amount, content, categoryId }));
      dispatch(writeExpense(''));
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(NewExpenseEntry);
