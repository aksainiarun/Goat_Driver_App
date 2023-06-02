import { getRequest } from "../utils/appUtil/ApiHelper";

export const getByDriverId = (id) => {
  return dispatch => {
    getRequest('driver/getByDriverId/'+id)
        .then(data => {
          if(!data.err){
          dispatch({type: 'SIGNIN', payload: data.driver})
        }else{
          alert(data.msg)
        }
        })
        .catch(error => {
          console.log(error,"getByDriverId");
        });
  };
};

export const getAllOrders = (id) => {
  return dispatch => {
    getRequest('driverOrder/getByDriverId/'+id)
        .then(data => {
          if(!data.err){
          dispatch({type: 'ORDERS', payload: data.order})
        }else{
          alert(data.msg)
        }
        })
        .catch(error => {
          console.log(error,"getByDriverId");
        });
  };
};
