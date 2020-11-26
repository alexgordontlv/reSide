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
export const deleteData = (index,target) => {
    return {
        type: USER_TYPES.DELETE_DATA,
        payload: {index,target}
    };
}

export const addProperty = (property) => {
    return {
        type: USER_TYPES.ADD_PROPERTY,
        payload: property
    };
}