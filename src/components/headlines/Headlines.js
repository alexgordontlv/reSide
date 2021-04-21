import React, { useState } from 'react';
import './headline.css';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { sortByName, sortByBudget } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Headlines = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [route, setRoute] = React.useState('');

  React.useEffect(() => {
    location.pathname === '/customers'
      ? setRoute('customers')
      : setRoute('properties');
  }, [location]);

  const handleSort = () => {
    dispatch(sortByBudget({ target: 'budget', route }));
  };

  if (
    location.pathname === '/customers' ||
    location.pathname === '/properties'
  ) {
    return (
      <div className="headline">
        <div className="headline__elevator_parking">E/P</div>
        <div
          className="headline__name click"
          onClick={() => dispatch(sortByName({ target: 'name', route }))}
        >
          Customer <ImportExportIcon fontSize="small" />
        </div>
        <div className="headline__contact">Contact</div>
        <div className="headline__budget click" onClick={() => handleSort()}>
          Budget <ImportExportIcon fontSize="small" />
        </div>
        <div className="headline__buttons">Event / Edit / Delete</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Headlines;
