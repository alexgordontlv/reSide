import './App.css';
import Header from './header/Header'
import {Route,Switch,Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInAndSignOut from './pages/signin&signout/SignInAndSignOut';
import Display from './display/Display';
function App() {
  return (
    <div className='app'>
    <div className='header'>
      <Header/>
    </div>
    <div className='main'>
      {
        false ? <MainPage/> : <SignInAndSignOut/>
      // <Display/>
      }
    </div>
    </div>
  );
}

export default App;
