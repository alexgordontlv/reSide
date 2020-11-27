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
                        customers: [...state.currentUser.customers, action.payload].filter(n => n)
                    }
                }
            case USER_TYPES.ADD_PROPERTY:
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        properties: [...state.currentUser.properties, action.payload].filter(n => n)
                    }
                }
            case USER_TYPES.DELETE_DATA:
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                       [action.payload.target]: [
                            ...state.currentUser.[action.payload.target].slice(0, action.payload.index),
                            ...state.currentUser.[action.payload.target].slice(action.payload.index + 1)
                          ].filter(n => n)
                    }
                }
                case USER_TYPES.UPDATE_DATA:
                    return { 
                        ...state,
                        currentUser:{
                            ...state.currentUser,
                            [action.payload.target]: [
                                ...state.currentUser.[action.payload.target].slice(0, action.payload.index),
                                {...action.payload.data},
                                ...state.currentUser.[action.payload.target].slice(action.payload.index + 1)
                              ].filter(n => n)
                        }
                    }
                    case USER_TYPES.SEARCH_DATA:
                        console.log(action.payload)
                        const newCustomers = state.currentUser.customers.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()))
                        return { 
                            ...state,
                            currentUser:{
                                ...state.currentUser,
                                customers: [...newCustomers]
                            }
                        }
        default:
            return state;
    }
}

export default userReducer;