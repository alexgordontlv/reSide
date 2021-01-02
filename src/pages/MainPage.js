import React,{useState} from 'react'
import SideBar from '../sidebar/Sidebar';
import Display from '../components/display/Display';
import {Route,Switch} from 'react-router-dom';
import './mainpage.css';
import FrontDisplay from './frontdisplay/FrontDisplay';
import About from './about/About'
import {useSelector } from "react-redux";


const MainPage = ({match}) => {
  const [state,setState] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);

    return (
        <div className='mainbody'>
          <div className='sidebar_component'>
            <SideBar onChange={(value)=>setState(value)}/>
          </div>
          <div className='body'>
          <Switch>
          <Route exact path={`${match.path}`} render={props=>(!currentUser ? <FrontDisplay/>:<About/>)} />
            <Route exact path={`/customers`} render={props=>(<Display dataToShow={'customers'} searchValue={state}/>)} />
            <Route exact path={`/properties`} render={props=>(<Display dataToShow={'properties'}  searchValue={state}/>)} />
            <Route exact path={`/about`} render={props=>(<About/>)} />
            <Route exact path={`/calendar`} render={props=>(<About/>)} />
          </Switch>
          </div>
        </div>
    )
}

export default MainPage;
