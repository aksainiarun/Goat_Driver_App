export const lastOrderAddress = () => {
  return dispatch => {
    getLastOrderAddressApi()
        .then(address => {
          dispatch({type: 'LAST_ORDER_ADDRESS', payload: address?.data});
        })
        .catch(error => {
          console.log(error);
        });
  };
};
