export const cartIdReducer = (state=null, action) => {
  switch(action.type) {
    case 'MODIFY_CART_ID':
      return action.payload;
    default:
      return state;
  };
};