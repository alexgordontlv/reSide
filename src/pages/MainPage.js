import React from 'react'
import SideBar from '../sidebar/Sidebar';
import Display from '../display/Display';
import {Route,Switch} from 'react-router-dom';
import './mainpage.css';
import DisplayData from '../display/DisplayData';
const MainPage = ({match}) => {
  console.log(match.path)
    return (
        <div className='mainbody'>
        
          <div className='sidebar_component'>
            <SideBar/>
          </div>
          <div className='body'>
          <Switch>
          <Route exact path={`${match.path}`} render={props=>(<DisplayData/>)} />
            <Route exact path={`/customers`} render={props=>(<Display dataToShow={'customers'}/>)} />
            <Route exact path={`/properties`} render={props=>(<Display dataToShow={'properties'}/>)} />
          </Switch>
          </div>
        </div>
    )
}

export default MainPage;
