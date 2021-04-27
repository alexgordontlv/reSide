import { USER_TYPES } from './user.types';
let flag = false;
let nameFlag = false;
const INITIAL_STATE = {
  currentUser: null,
  propertyCount: 0,
  customerCount: 0
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
        customerCount: state.customerCount + 1,
        currentUser: {
          ...state.currentUser,
          customers: [...state.currentUser.customers, action.payload].filter(
            (n) => n
          )
        }
      };
    case USER_TYPES.SORT_BY_BUDGET:
      console.log(action.payload.target, flag);
      let sortedProps = [];
      if (flag) {
        sortedProps = state.currentUser[action.payload.route].sort((a, b) =>
          parseInt(a[action.payload.target]) >
          parseInt(b[action.payload.target])
            ? 1
            : -1
        );
      } else {
        sortedProps = state.currentUser[action.payload.route].sort((a, b) =>
          parseInt(a[action.payload.target]) <
          parseInt(b[action.payload.target])
            ? 1
            : -1
        );
      }
      flag = !flag;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.route]: sortedProps
        }
      };
    case USER_TYPES.SORT_BY_NAME:
      let sortedNames = [];
      if (nameFlag) {
        sortedNames = [
          ...state.currentUser[action.payload.route].sort((a, b) =>
            a[action.payload.target] > b[action.payload.target] ? 1 : -1
          )
        ];
      } else {
        sortedNames = [
          ...state.currentUser[action.payload.route].sort((a, b) =>
            a[action.payload.target] < b[action.payload.target] ? 1 : -1
          )
        ];
      }
      nameFlag = !nameFlag;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.route]: sortedNames
        }
      };
    case USER_TYPES.ADD_PROPERTY:
      return {
        ...state,
        propertyCount: state.propertyCount + 1,
        currentUser: {
          ...state.currentUser,
          properties: [action.payload, ...state.currentUser.properties].filter(
            (n) => n
          )
        }
      };
    case USER_TYPES.DELETE_CUSTOMER:
      let dataCount = null;
      if (action.payload.target == 'customers') {
        dataCount = 'customerCount';
      } else {
        dataCount = 'propertyCount';
      }
      console.log(state.customerCount);
      return {
        ...state,
        [dataCount]: state.dataCount - 1,
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
