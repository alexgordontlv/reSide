import React, { useState } from "react";
import SideBar from "../sidebar/Sidebar";
import Display from "../components/display/Display";
import { Route, Switch } from "react-router-dom";
import Display2 from "../components/display/Display2";
import "./mainpage.css";
import FrontDisplay from "./frontdisplay/FrontDisplay";
import About from "./about/About";
import { useSelector } from "react-redux";
import Contact from "./contact/Contact";
import { SnackbarProvider } from "notistack";

const MainPage = ({ match }) => {
  const [state, setState] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="mainbody">
      <div className="sidebar_component">
        <SideBar onChange={(value) => setState(value)} />
      </div>
      <div className="body">
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={(props) => (!currentUser ? <FrontDisplay /> : <About />)}
          />
          <SnackbarProvider maxSnack={3}>
          <Route
            exact
            path={`/customers`}
            render={(props) => (
              <Display2 dataToShow={"customers"} searchValue={state} />
            )}
          />
          <Route
            exact
            path={`/properties`}
            render={(props) => (
              <Display2 dataToShow={"properties"} searchValue={state} />
            )}
          />
          </SnackbarProvider>
          <Route exact path={`/contact`} render={(props) => <Contact />} />
          <Route exact path={`/about`} render={(props) => <About />} />
          <Route exact path={`/calendar`} render={(props) => <About />} />
        </Switch>
      </div>
    </div>
  );
};

export default MainPage;
