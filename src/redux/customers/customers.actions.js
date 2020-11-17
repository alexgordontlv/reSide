import {customersTypes} from './customers.types';


export const addCustomer = (customer) => {
    return {
        type: customersTypes.ADD_CUSTOMER,
        payload: customer
    };
}