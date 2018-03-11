import axios from 'axios';

// ACTION TYPES
const GET_ALL_BUDGETS = 'GET_ALL_BUDGETS';
const GET_SINGLE_BUDGET = 'GET_SINGLE_BUDGET';
const CREATE_BUDGET = 'CREATE_BUDGET';
const UPDATE_BUDGET = 'UPDATE_BUDGET';
const DELETE_BUDGET= 'DELETE_BUDGET';


// ACTION CREATORS
const allBudgets = (budgets) => ({type: GET_ALL_BUDGETS, budgets});
const singleBudget = (budget) => ({type: GET_SINGLE_BUDGET, budget});
const createBudget = (budget) => ({type: CREATE_BUDGET, budget});
const updateBudget  = (budget) => ({type: UPDATE_BUDGET, budget});
const deleteBudget = (budgetId) => ({type: DELETE_BUDGET, budgetId });

// THUNK CREATORS
export const fetchAllBudgets = () => {
	return dispatch => {
		return axios.get('/api/budgets')
			.then(res => res.data)
			.then(budgets => {
				const action = allBudgets(budgets);
				dispatch(action);
				})
			.catch(err => console.error('Oops! Guess what is wrong in fetchAllBudgets thunk!', err))
	}
}

export const fetchSingleBudget = (budgetId) => {
	return dispatch => {
		return axios.get(`/api/budgets/${budgetId}`)
			.then(res => res.data)
			.then(budget => dispatch(singleBudget(budget)))
			.catch(err => console.error('Oops! Can you find out what is wrong in fetchSingleBudget thunk?', err))
	}
}

// export const fetchAllOrdersByUserX = (userId) => {
// 	return dispatch => {
// 		return axios.get(`/api/users/${userId}/orders`)
// 			.then(res => res.data)
// 			.then(orders => dispatch(allOrders(orders)))
// 			.catch(err => console.error('Oops! What did you just do in fetchAllOrdersByUserX thunk?', err))
// 	}
// }


// export const fetchSingleOrderByUserX = (userId, orderId) => {
// 	return dispatch => {
// 		return axios.get(`/api/users/${userId}/orders/${orderId}`)
// 			.then(res => res.data)
// 			.then(order => dispatch(singleOrder(order)))
// 			.catch(err => console.error('Oops! We are kind of stuck here in fetchSingleOrderByUserX thunk...', err))
// 	}
// }

export const postBudget = (budget) => {
	return dispatch => {
		 return axios.post(`/api/budgets`, budget)
			.then(res => res.data)
			.then(res => dispatch(createBudget(res)))
			.catch(err => console.error('Oops! Looks like something is wrong in postBudget thunk.', err))
	}
}

export const putBudget = (budgetId, budget) => {
	return dispatch => {
		return axios.put(`/api/budgets/${budgetId}`, budget)
			.then(res => res.data)
			.then(budget => dispatch(updateBudge(budget)))
			.catch(err => console.error('Oops! Looks like something is wrong in putBudget thunk.', err))
	}
}

export const removeBudget = (budgetId) => {
	return dispatch => {
		return axios.delete(`/api/budgets/${budgetId}`)
			.then(() => dispatch(deleteBudget(budgetId)))
			.catch(err => console.error('Oops! Looks like something is wrong in removeBudget thunk.', err))
	}
}

const budget = []
// REDUCER
export default function reducer(state = [], action) {

	switch (action.type) {

		case GET_ALL_BUDGETS:
			return action.budgets;

		case GET_SINGLE_BUDGET:
			return action.budget;

		case CREATE_BUDGET:
			return Object.assign({}, state, action.budget)

            
        case UPDATE_BUDGET:
            return budgets.map( budget => action.budget.budgetId === budget.budgetId ? action.budget : budget ) // returning a new array with action.category


        case DELETE_BUDGET:
            return budgets.filter( budget => budget.budgetId !== action.budgetId ) // returning a new array that excluded a expense of the action.categoryId
      
            
	    default:
			return state;
	}
}