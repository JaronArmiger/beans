export const addressIdReducer = (state=null, action) => {
  switch(action.type) {
    case 'SAVE_ADDRESS_ID':
      return action.payload;
    default:
      return state;
  };
};