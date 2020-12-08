export const paymentStatusReducer = (state=null, action) => {
  switch(action.type) {
    case 'SET_PAYMENT_STATUS':
      return action.payload;
    default:
      return state;
  };
};