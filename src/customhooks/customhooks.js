import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { addCustomer, addProperty, setUser } from '../redux/user/user.actions';
import {
  auth,
  getDataFromFireStore,
  createUserProfileDocument
} from '../firebase/firebase';

export const useFetchData = async (userAuth) => {
  const dispatch = useDispatch();
  const fetchData = async () => {
    const [customers, properties] = await Promise.all([
      getDataFromFireStore(userAuth, 'customers'),
      getDataFromFireStore(userAuth, 'properties')
    ]);
    !customers.empty &&
      customers.docs.forEach((doc) => dispatch(addCustomer(doc.data())));
    !properties.empty &&
      properties.docs.forEach((doc) => dispatch(addProperty(doc.data())));
  };
  useEffect(() => {
    fetchData();
  }, [userAuth]);
};
