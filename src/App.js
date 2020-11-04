import './App.css';
import Header from './header/Header'
import {Route,Switch,Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import Display from './display/Display';
function App() {
  return (
    <div className='app'>
    <div className='header'>
      <Header/>
    </div>
    <div className='main'>
      {
        true ? <MainPage/> : <SignIn/>
      // <Display/>
      }
    </div>
    </div>
  );
}

export default App;
