import React, { useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './pages/mainpage/MainPage';
import SignInAndSignOut from './pages/signin&signout/SignInAndSignOut';
import {
  auth,
  createUserProfileDocument,
  getDataFromFireStore
} from './firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, addCustomer, addProperty } from './redux/user/user.actions';
import FrontDisplay from './pages/frontdisplay/FrontDisplay';

const App = () => {
  
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        await userRef.onSnapshot(async (snapShot) => {
          dispatch(
            setUser({
              photoURL: userAuth.photoURL,
              id: snapShot.id,
              ...snapShot.data(),
              customers: [],
              properties: []
            })
          );
        });
        const customers = await getDataFromFireStore(userAuth, 'customers');
        !customers.empty &&
          customers.docs.forEach((doc) => dispatch(addCustomer(doc.data())));
        const properties = await getDataFromFireStore(userAuth, 'properties');
        !properties.empty &&
          properties.docs.forEach((doc) => dispatch(addProperty(doc.data())));
      } else {
        dispatch(setUser(null));
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="main">
        <div className="main__container">
          <Switch>
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? (
                  <Redirect to="/customers" />
                ) : (
                  <SignInAndSignOut />
                )
              }
            />
            <Route
              path="/"
              render={(props) =>
                currentUser ? <MainPage /> : <FrontDisplay />
              }
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default App;
