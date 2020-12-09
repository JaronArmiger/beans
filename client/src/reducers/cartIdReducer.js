let initialVal = null;
if (typeof window !== 'undefined') {
  initialVal = (localStorage.getItem('cartId'));
}

export const cartIdReducer = (state=initialVal, action) => {
  switch(action.type) {
    case 'MODIFY_CART_ID':
      return action.payload;
    default:
      return state;
  };
};