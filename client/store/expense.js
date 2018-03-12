import axios from 'axios';

// ACTION TYPES
const GET_ALL_EXPENSES = 'GET_ALL_EXPENSES';
const GET_ALL_EXPENSES_BY_QUARTER = 'GET_ALL_EXPENSES_BY_QUARTER';
const GET_SINGLE_EXPENSE = 'GET_SINGLE_EXPENSE';
const CREATE_EXPENSE = 'CREATE_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';


// ACTION CREATORS
const allExpenses = (expenses) => ({type: GET_ALL_EXPENSES, expenses});
const allExpensesByQuarter = (expenses) => ({type: GET_ALL_EXPENSES_BY_QUARTER, expenses});
const singleExpense = (expense) => ({type: GET_SINGLE_EXPENSE, expense});
const createExpense = (expense) => ({type: CREATE_EXPENSE, expense});
const updateExpense  = (expense) => ({type: UPDATE_EXPENSE, expense});
const deleteExpense = (expenseId) => ({type: DELETE_EXPENSE, expenseId });

// THUNK CREATORS
export const fetchAllExpenses = () => {
	return dispatch => {
		return axios.get('/api/expenses')
			.then(res => res.data)
			.then(expenses => {
				const action = allExpenses(expenses);
				dispatch(action);
				})
			.catch(err => console.error('Oops! Guess what is wrong in fetchAllExpenses thunk!', err))
	}
}

export const fetchSingleExpense = (expenseId) => {
	return dispatch => {
		return axios.get(`/api/expenses/${expenseId}`)
			.then(res => res.data)
			.then(expense => dispatch(singleExpense(expense)))
			.catch(err => console.error('Oops! Can you find out what is wrong in fetchSingleExpense thunk?', err))
	}
}

export const fetchAllExpensesByCategory = (timeLine,category) => {
	//console.log("fetchAllExpensesByCategory");
	console.log(timeLine);
	// console.log(category);
	if(timeLine==='Q1'){
		console.log('Inside Q1');	
		return dispatch => {
			return axios.get(`/api/expenses/gropupByAllCategoryByQuarter/${timeLine}`)
				.then( res => dispatch(allExpensesByQuarter(res.data)))
				.catch(err => console.error('Oops! What did you just do in fetchAllExpensesByCategory thunk?', err))
		}
	}else{
		return dispatch => {
			return axios.get(`/api/expenses/gropupByAllCategory/${timeLine}`)
				.then( res => dispatch(allExpenses(res.data)))
				.catch(err => console.error('Oops! What did you just do in fetchAllExpensesByCategory thunk?', err))
		}
	}

	
}

export const fetchAllExpensesBySingleCategory = (timeLine,categoryId) => {
	// console.log("fetchAllExpensesByCategory");
	//  console.log(timeLine);
    //   console.log(categoryId);
	return dispatch => {
		return axios.get(`/api/expenses/expByMonth/${timeLine}/categories/${categoryId}`)
			.then( res => dispatch(allExpenses(res.data)))
			.catch(err => console.error('Oops! What did you just do in fetchAllExpensesByCategory thunk?', err))
	}
}
// budget comparison

export const fetchAllExpensesToCompare = (timeLine,categoryId,budget) => {
	 console.log("fetchAllExpensesByCategory");
	//  console.log(timeLine);
    //   console.log(categoryId);
	return dispatch => {
		return axios.get(`/api/expenses/gropupByAllCategory/budgets/${timeLine}`)
			.then( res => dispatch(allExpenses(res.data)))
			.catch(err => console.error('Oops! What did you just do in fetchAllExpensesToCompare thunk?', err))
	}
}

export const fetchSingleExpenseByCategory = (categoryId, expenseId) => {
	return dispatch => {
		return axios.get(`/api/categories/${categoryId}/expenses/${expenseId}`)
			.then(res => res.data)
			.then(expense => dispatch(singleExpense(expense)))
			.catch(err => console.error('Oops! We are kind of stuck here in fetchSingleExpenseByCategoryX thunk...', err))
	}
}

export const postExpense = (expense) => {
	return dispatch => {
		 return axios.post(`/api/expenses`, expense)
			.then(res => res.data)
			.then(res => dispatch(createExpense(res)))
			.catch(err => console.error('Oops! Looks like something is wrong in postExpense thunk.', err))
	}
}

export const putExpense = (expenseId, expense) => {
	return dispatch => {
		return axios.put(`/api/expenses/${expenseId}`, expense)
			.then(res => res.data)
			.then(expense => dispatch(updateExpense(expense)))
			.catch(err => console.error('Oops! Looks like something is wrong in putExpense thunk.', err))
	}
}

export const removeExpense = (expenseId) => {
	return dispatch => {
		return axios.delete(`/api/expenses/${expenseId}`)
			.then(() => dispatch(deleteExpense(expenseId)))
			.catch(err => console.error('Oops! Looks like something is wrong in removeExpense thunk.', err))
	}
}

//const expense = []
// REDUCER
export default function reducer(expenses= [], action) {
	console.log(action.type);
	// console.log(action);
	switch (action.type) {
		
		case GET_ALL_EXPENSES:
			return action.expenses;

		case GET_ALL_EXPENSES_BY_QUARTER:
			return action.expenses;	

		case GET_SINGLE_EXPENSE:
			return action.expense;

		case CREATE_EXPENSE:
			return Object.assign({}, expenses, action.expense)

            
        case UPDATE_EXPENSE:
            return expenses.map( expense => action.expense.expenseId === expense.expenseId ? action.expense : expense ) // returning a new array with action.category


        case DELETE_EXPENSE:
            return expenses.filter( expense => expense.expenseId !== action.expenseId ) // returning a new array that excluded a expense of the action.categoryId
      
            
	    default:
			return expenses;
	}
}