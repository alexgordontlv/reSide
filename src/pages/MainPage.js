import React,{useState} from 'react'
import SideBar from '../sidebar/Sidebar';
import Display from '../display/Display';
import {Route,Switch} from 'react-router-dom';
import './mainpage.css';
import DisplayData from '../display/DisplayData';
import CalendarComponent from './calendar/Calendar';
const MainPage = ({match}) => {
  const [state,setState] = useState('');
    return (
        <div className='mainbody'>
          <div className='sidebar_component'>
            <SideBar onChange={(value)=>setState(value)}/>
          </div>
          <div className='body'>
          <Switch>
          <Route exact path={`${match.path}`} render={props=>(<DisplayData/>)} />
            <Route exact path={`/customers`} render={props=>(<Display dataToShow={'customers'} searchValue={state}/>)} />
            <Route exact path={`/properties`} render={props=>(<Display dataToShow={'properties'}  searchValue={state}/>)} />
            <Route exact path={`/calendar`} render={props=>(<CalendarComponent/>)} />
          </Switch>
          </div>
        </div>
    )
}

export default MainPage;
