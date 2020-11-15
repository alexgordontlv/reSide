import {customersTypes} from './customers.types';


export const addCustomer = (customer) => {
    console.log('action', customer)
    return {
        type: customersTypes.ADD_CUSTOMER,
        payload: customer
    };
}