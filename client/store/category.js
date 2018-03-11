import axios from 'axios';

// ACTION TYPES
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';


// ACTION CREATORS
const allCategories = (categories) => ({type: GET_ALL_CATEGORIES, categories});
const singleCategory = (category) => ({type: GET_SINGLE_CATEGORY, category});
const createCategory = (category) => ({type: CREATE_CATEGORY, category});
const updateCategory  = (category) => ({type: UPDATE_CATEGORY, category});
const deleteCategory = (categoryId) => ({type: DELETE_CATEGORY, categoryId });

// THUNK CREATORS
export const fetchAllCategories = () => {
	return dispatch => {
		return axios.get('/api/categories')
			.then(res => res.data)
			.then(categories => {
				const action = allCategories(categories);
				dispatch(action);
				})
			.catch(err => console.error('Oops! Guess what is wrong in fetchAllCategories thunk!', err))
	}
}

export const fetchSingleCategory = (categoryId) => {
	return dispatch => {
		return axios.get(`/api/categories/${categoryId}`)
			.then(res => res.data)
			.then(category => dispatch(singleCategory(category)))
			.catch(err => console.error('Oops! Can you find out what is wrong in fetchSingleCategory thunk?', err))
	}
}




// export const fetchSingleOrderByUserX = (userId, orderId) => {
// 	return dispatch => {
// 		return axios.get(`/api/users/${userId}/orders/${orderId}`)
// 			.then(res => res.data)
// 			.then(order => dispatch(singleOrder(order)))
// 			.catch(err => console.error('Oops! We are kind of stuck here in fetchSingleOrderByUserX thunk...', err))
// 	}
// }

export const postCategory = (category) => {
	return dispatch => {
		 return axios.post(`/api/categories`, category)
			.then(res => res.data)
			.then(res => dispatch(createCategory(res)))
			.catch(err => console.error('Oops! Looks like something is wrong in postCategory thunk.', err))
	}
}

export const putCategory = (categoryId, category) => {
	return dispatch => {
		return axios.put(`/api/categories/${categoryId}`, category)
			.then(res => res.data)
			.then(category => dispatch(updateCategory(category)))
			.catch(err => console.error('Oops! Looks like something is wrong in putCategory thunk.', err))
	}
}

export const removeCategory = (categoryId) => {
	return dispatch => {
		return axios.delete(`/api/categories/${categoryId}`)
			.then(() => dispatch(deleteCategory(categoryId)))
			.catch(err => console.error('Oops! Looks like something is wrong in removeCategory thunk.', err))
	}
}


const category = {expenses: []}
// REDUCER
export default function reducer(state = category, action) {

	switch (action.type) {

		case GET_ALL_CATEGORIES:
			return action.categories;

		case GET_SINGLE_CATEGORY:
			return action.category;

		case CREATE_CATEGORY:
			return Object.assign({}, state, action.category)

            
        case UPDATE_CATEGORY:
            return categories.map( category => action.category.categoryId === category.categoryId ? action.category : category ) // returning a new array with action.category


        case DELETE_CATEGORY:
            return categories.filter( category => category.categoryId !== action.categoryId ) // returning a new array that excluded a category of the action.categoryId
      
            
	    default:
			return state;
	}
}