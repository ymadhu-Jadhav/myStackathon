// ACTION TYPES

const WRITE_EXPENSE = 'WRITE_EXPENSE';

// ACTION CREATORS

export function writeExpense (content) {
  const action = { type: WRITE_EXPENSE, content };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case WRITE_EXPENSE:
      return action.content;

    default:
      return state;
  }

}
