import React, { useState } from 'react';
import SideBar from '../sidebar/Sidebar';
import Display from '../components/display/Display';
import { Route, Switch } from 'react-router-dom';
import Display2 from '../components/display/Display2';
import './mainpage.css';
import FrontDisplay from './frontdisplay/FrontDisplay';
import About from './about/About';
import { useSelector } from 'react-redux';
import Contact from './contact/Contact';
import { SnackbarProvider } from 'notistack';
import Map from '../components/map/Map';
import dataLogo from '../datalogo2.svg';
import { Slide } from '@material-ui/core';
import myLogo from '../real-estate.png';
import Headlines from '../components/headlines/Headlines';
const MainPage = ({ match }) => {
  const [state, setState] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="mainbody__background">
        {currentUser ? (
          <Slide direction="down" in mountOnEnter unmountOnExit>
            <div className="map_div">
              <img src={myLogo} alt="LOGO" className="logoSVG" />
              <Map />
            </div>
          </Slide>
        ) : (
          <div></div>
        )}

        <div className="mainbody">
          {currentUser ? (
            <div className="sidebar_component">
              <SideBar onChange={(value) => setState(value)} />
            </div>
          ) : (
            <div></div>
          )}

          <div className="main_page_body">
            <div className="mainbody__headline">
              {' '}
              <Headlines />
            </div>
            <Switch>
              <Route
                exact
                path={`${match.path}`}
                render={(props) =>
                  !currentUser ? (
                    <FrontDisplay />
                  ) : (
                    <Display2 dataToShow={'customers'} searchValue={state} />
                  )
                }
              />
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
