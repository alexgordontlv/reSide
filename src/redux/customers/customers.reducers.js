import {customersTypes} from './customers.types';
import {Customers} from './customers';


const INITIAL_STATE = {
    Customers: Customers
}


const customerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case customersTypes.ADD_CUSTOMER :
            console.log('reducer')
            return {
                ...state,
                Customers: [...Customers, action.payload]
            }
        default:
            console.log('default')
            return state
    }
}

export default customerReducer;