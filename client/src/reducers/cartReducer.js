let initialState = [];
// load from localStorage
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
  	initialState = JSON.parse(localStorage.getItem('cart'));
  }
}

export const cartReducer = (state=initialState, action) => {
  switch(action.type) {
  	case 'MODIFY_CART':
  	  return action.payload;
  	case 'CLEAR_CART':
  	  return [];
  	default:
  	  return state;
  }
}