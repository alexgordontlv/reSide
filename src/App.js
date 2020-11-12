import React from 'react'
import './App.css';
import Header from './header/Header'
import {Route,Switch,Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInAndSignOut from './pages/signin&signout/SignInAndSignOut';
import {auth,createUserProfileDocument} from './firebase/firebase';
import {connect} from 'react-redux';
import {setUser} from './redux/user/user.actions';
class App extends React.Component {
unSubscribeFromAuth = null;
componentDidMount(){
  console.log(this.props.currentUser )
  const {setUser} = this.props;
 this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth=>{
   if ( userAuth) {
    const userRef = await createUserProfileDocument(userAuth);
    console.log(userAuth)
    userRef.onSnapshot(snapShot => {
      setUser({
          photoURL: userAuth.photoURL,
          id: snapShot.id,
          ...snapShot.data()
      })
    })
   }else{
     setUser(null);
   }

  })
}

componentWillUnmount(){
  this.unSubscribeFromAuth();
}


  render(){
  return (
    
      <div className='app'>
        <div className='header'>
          <Header/>
        </div>
        <div className='main'>
        <Switch>
         <Route exact path='/'><MainPage/></Route>
         <Route exact path='/signin'
          render={()=>this.props.currentUser 
            ?(<Redirect to='/'/>)
          :
          (<SignInAndSignOut/>)
        }
         />
         </Switch>
        </div>
      </div>

  );
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
