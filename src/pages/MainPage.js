import React, { useState } from 'react';
import SideBar from '../sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Display2 from '../components/display/Display2';
import './mainpage.css';
import About from './about/About';
import Contact from './contact/Contact';
import { SnackbarProvider } from 'notistack';
import Map from '../components/map/Map';
import { Slide } from '@material-ui/core';
import myLogo from '../real-estate.png';
import Headlines from '../components/headlines/Headlines';

const MainPage = () => {
  const [state, setState] = useState('');
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="mainbody__background">
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <div className="map_div">
            <img src={myLogo} alt="LOGO" className="logoSVG" />
            <Map />
          </div>
        </Slide>
        <div className="mainbody">
          <div className="sidebar_component">
            <SideBar onChange={(value) => setState(value)} />
          </div>
          <div className="main_page_body">
            <div className="mainbody__headline">
              <Headlines />
            </div>
            <Switch>
              <Route
                exact
                path={`/customers`}
                render={(props) => (
                  <Display2 dataToShow={'customers'} searchValue={state} />
                )}
              />
              <Route
                exact
                path={`/properties`}
                render={(props) => (
                  <Display2 dataToShow={'properties'} searchValue={state} />
                )}
              />
              <Route exact path={`/contact`} render={(props) => <Contact />} />
              <Route exact path={`/about`} render={(props) => <About />} />
              <Route exact path={`/calendar`} render={(props) => <About />} />
            </Switch>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default MainPage;
