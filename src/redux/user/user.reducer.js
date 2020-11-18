import {USER_TYPES} from './user.types';

const INITIAL_STATE = {
    currentUser: null
};


const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case USER_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
            case USER_TYPES.ADD_CUSTOMER:
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        customers: [...state.currentUser.customers, action.payload]
                    }
                }
            case USER_TYPES.ADD_PROPERTY:
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        properties: [...state.currentUser.properties, action.payload]
                    }
                }
        default:
            return state;
    }
}

export default userReducer;