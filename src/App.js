import React from 'react'
import './App.css';
import Header from './header/Header'
import {Route,Switch,Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInAndSignOut from './pages/signin&signout/SignInAndSignOut';
import {auth,createUserProfileDocument,getDataFromFireStore} from './firebase/firebase';
import {connect} from 'react-redux';
import {setUser} from './redux/user/user.actions';
import {addCustomer, addProperty} from './redux/user/user.actions';



class App extends React.Component {
unSubscribeFromAuth = null;
componentDidMount(){
  const {setUser,addCustomer,addProperty} = this.props;
 this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth=>{
   if ( userAuth) {
    const userRef = await createUserProfileDocument(userAuth);
    await userRef.onSnapshot(async snapShot => {
      setUser({
          photoURL: userAuth.photoURL,
          id: snapShot.id,
          ...snapShot.data(),
          customers: [],
          properties: [],
      })
    })
    const customers = await getDataFromFireStore(userAuth,'customers');
    if (!customers.empty){
      customers.docs.map(doc => addCustomer(doc.data()))
    }
    const properties = await getDataFromFireStore(userAuth,'properties');
    if (!properties.empty){
      console.log(properties)
      properties.docs.map(doc => addProperty(doc.data()))
    }
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
         <Route path='/main' component={MainPage}/>
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
    addCustomer: (customer) => dispatch(addCustomer(customer)),
    addProperty: (customer) => dispatch(addProperty(customer))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
