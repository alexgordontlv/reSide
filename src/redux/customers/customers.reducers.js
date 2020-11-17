import {customersTypes} from './customers.types';
import {Customers} from './customers';


const INITIAL_STATE = {
    Customers: []
}


const customerReducer = (state = INITIAL_STATE, action) => {  
    switch(action.type) {
        case customersTypes.ADD_CUSTOMER :
            return {
                ...state,
                Customers: [...state.Customers, action.payload]
            }
        default:

            return state
    }
}

export default customerReducer;