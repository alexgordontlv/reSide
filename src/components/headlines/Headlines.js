import React, { useState } from 'react';
import './headline.css';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import {
  sortByName,
  sortByBudgetDown,
  sortByBudgetUP
} from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Headlines = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const [route, setRoute] = React.useState('');

  React.useEffect(() => {
    location.pathname === '/customers'
      ? setRoute('customers')
      : setRoute('properties');
  }, [location]);

  const handleSort = () => {
    console.log('click');
    if (state) {
      dispatch(sortByBudgetDown({ target: 'budget', route }));
      setState((i) => !i);
      console.log('down');

      return;
    }
    console.log('up');
    dispatch(sortByBudgetUP({ target: 'budget', route }));
    setState((i) => !i);
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
