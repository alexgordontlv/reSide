import {USER_TYPES} from './user.types';


export const setUser = (user) => {
    return {
        type: USER_TYPES.SET_CURRENT_USER,
        payload: user
    }
}