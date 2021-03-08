import { USER_TYPES } from './user.types';

export const setUser = (user) => {
  return {
    type: USER_TYPES.SET_CURRENT_USER,
    payload: user
  };
};

export const addCustomer = (customer) => {
  return {
    type: USER_TYPES.ADD_CUSTOMER,
    payload: customer
  };
};

export const sortByName = (param) => {
  return {
    type: USER_TYPES.SORT_BY_NAME,
    payload: param
  };
};

export const sortByBudget = (param) => {
  return {
    type: USER_TYPES.SORT_BY_BUDGET,
    payload: param
  };
};

export const deleteData = (index, target) => {
  return {
    type: USER_TYPES.DELETE_DATA,
    payload: { index, target }
  };
};

export const addProperty = (property) => {
  return {
    type: USER_TYPES.ADD_PROPERTY,
    payload: property
  };
};
export const updateData = (index, target, data) => {
  return {
    type: USER_TYPES.UPDATE_DATA,
    payload: { index, target, data }
  };
};
export const searchInput = (data) => {
  return {
    type: USER_TYPES.SEARCH_DATA,
    payload: data
  };
};
