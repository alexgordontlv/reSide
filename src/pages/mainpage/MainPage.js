import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './mainpage.css';

import { SnackbarProvider } from 'notistack';
import { Slide } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Map from '../../components/map/Map';
import SideBar from '../../components/sidebar/Sidebar';
import myLogo from '../../icons/real-estate.png';
import Headlines from '../../components/headlines/Headlines';
import { useFetchData } from '../../customhooks/customhooks';

const Display2 = React.lazy(() => import('../../components/display/Display2'));
const About = React.lazy(() => import('../about/About'));
const Contact = React.lazy(() => import('../contact/Contact'));

const selectProperties = createSelector(
  (state) => state.user.currentUser.properties,
  (properties) => properties
);

const MainPage = ({ userAuth }) => {
  const [state, setState] = useState('');
  const properties = useSelector(selectProperties);
  useFetchData(userAuth);
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="mainbody__background">
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <div className="map_div">
            <img loading src={myLogo} alt="LOGO" className="logoSVG" />
            <Map properties={properties} />
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
              <Suspense fallback={<div>Loading...</div>}>
                <Route
                  path={`/customers`}
                  render={(props) => (
                    <Display2 dataToShow={'customers'} searchValue={state} />
                  )}
                />
                <Route
                  path={`/properties`}
                  render={(props) => (
                    <Display2 dataToShow={'properties'} searchValue={state} />
                  )}
                />
                <Route path={`/contact`} render={(props) => <Contact />} />
                <Route path={`/about`} render={(props) => <About />} />
                <Route path={`/calendar`} render={(props) => <About />} />
              </Suspense>
            </Switch>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default MainPage;
