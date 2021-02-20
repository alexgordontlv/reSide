import React from 'react';
import './headline.css';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { sortByParameter } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Headlines = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (target) => {
    let route;
    location.pathname === '/customers'
      ? (route = 'customers')
      : (route = 'properties');
    dispatch(sortByParameter({ target, route }));
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
          onClick={() => handleClick('name')}
        >
          Customer <ImportExportIcon fontSize="small" />
        </div>
        <div className="headline__contact">Contact</div>
        <div
          className="headline__budget click"
          onClick={() => handleClick('budget')}
        >
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
