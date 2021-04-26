import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignInAndSignOut from './pages/signin&signout/SignInAndSignOut';
import { auth, createUserProfileDocument } from './firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux/user/user.actions';
import FrontDisplay from './pages/frontdisplay/FrontDisplay';
import MainPage from './pages/mainpage/MainPage';
const App = () => {
  const [fetchedUserAuth, setFetchedUserAuth] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setFetchedUserAuth(userAuth);
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
                currentUser ? (
                  <MainPage userAuth={fetchedUserAuth} />
                ) : (
                  <FrontDisplay />
                )
              }
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default App;
