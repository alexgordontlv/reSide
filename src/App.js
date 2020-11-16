import React from 'react'
import './App.css';
import Header from './header/Header'
import {Route,Switch,Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInAndSignOut from './pages/signin&signout/SignInAndSignOut';
import {auth,createUserProfileDocument,getCustomersFromFireStore} from './firebase/firebase';
import {connect} from 'react-redux';
import {setUser} from './redux/user/user.actions';
import {addCustomer} from './redux/customers/customers.actions';



class App extends React.Component {
unSubscribeFromAuth = null;
componentDidMount(){
  const {setUser,addCustomer} = this.props;
 this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth=>{
   if ( userAuth) {
    const userRef = await createUserProfileDocument(userAuth);
    userRef.onSnapshot(snapShot => {
      setUser({
          photoURL: userAuth.photoURL,
          id: snapShot.id,
          ...snapShot.data()
      })
    })
    const customers = await getCustomersFromFireStore(userAuth);
    console.log(customers.docs.map(doc => addCustomer(doc.data())));
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
         <Route exact path='/main'><MainPage/></Route>
         <Route exact path='/'
          render={()=>this.props.currentUser 
            ?(<Redirect to='/main'/>)
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
    setUser: (user) => dispatch(setUser(user)),
    addCustomer: (customer) => dispatch(addCustomer(customer))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
