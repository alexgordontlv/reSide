import {USER_TYPES} from './user.types';


export const setUser = (user) => {
    return {
        type: USER_TYPES.SET_CURRENT_USER,
        payload: user
    }
}


export const addCustomer = (customer) => {
    return {
        type: USER_TYPES.ADD_CUSTOMER,
        payload: customer
    };
}