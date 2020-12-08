export const paymentIdReducer = (state=null, action) => {
  switch(action.type) {
    case 'SET_PAYMENT_ID':
      return action.payload;
    default:
      return state;
  };
};