import { USER_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
          customers: [...state.currentUser.customers, action.payload].filter(
            (n) => n
          )
        }
      };
    case USER_TYPES.SORT_BY_PARAMETER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.route]: [
            ...state.currentUser[action.payload.route].sort((a, b) =>
              a[action.payload.target] > b[action.payload.target] ? 1 : -1
            )
          ]
        }
      };
    case USER_TYPES.ADD_PROPERTY:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          properties: [action.payload, ...state.currentUser.properties].filter(
            (n) => n
          )
        }
      };
    case USER_TYPES.DELETE_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.target]: [
            ...state.currentUser[action.payload.target].slice(
              0,
              action.payload.index
            ),
            ...state.currentUser[action.payload.target].slice(
              action.payload.index + 1
            )
          ].filter((n) => n)
        }
      };
    case USER_TYPES.UPDATE_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.target]: state.currentUser[action.payload.target].map(
            (item, index) => {
              if (index !== action.payload.index) {
                return item;
              } else {
                console.log(index);
                return {
                  ...item,
                  ...action.payload.data
                };
              }
            }
          )
        }
      };
    default:
      return state;
  }
};

export default userReducer;
