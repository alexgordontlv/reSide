import React, {useState, useEffect} from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import './display.css';
import FormDialog from '../components/FormDialog'
import {connect} from 'react-redux';
import Search from '../sidebar/Search';
import TimePicker from '../display/TimePicker';
import {addCalendarEvent} from '../pages/calendar/Calendar';





 function Display({dataToShow,currentUser,searchValue}) {
  const [state, setState] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  useEffect(() => {
    return function cleanup() {
      setState('')
    };
  },[dataToShow]);

  let name, budget, phone = null;
  if(dataToShow==='customers'){
    name = 'Name'
    budget = 'Budget'
    phone = 'Phone Number'
  }else{
   name = 'Address'
   budget = 'Price'
   phone = 'Contact'
  }


  const rows: RowsProp = currentUser ? (dataToShow==='customers' ?
   currentUser.customers.filter(customer => customer.name.toLowerCase().includes(searchValue.toLowerCase()))
    : 
    currentUser.properties.filter(property => property.name.toLowerCase().includes(searchValue.toLowerCase()))
    ) : [];

  const columns: ColDef[] = [
    { field: 'name', headerName: `${name}`, width: 120 },
    { field: 'budget', headerName: `${budget}`, width: 120 },
    { field: 'phone', headerName: `${phone}`, width: 120 },
    { field: 'rooms', headerName: 'Rooms', width: 80 },
    { field: 'floor', headerName: 'Floor', width: 70 },
    { field: 'elevator', headerName: 'Elevator', width: 70 },
    { field: 'parking', headerName: 'Parking', width: 70 },
  ];

const handleRowClick = (event) => {
  setIndex(event.rowIndex);
  setState(rows[event.rowIndex])
}

    return (
      
      <div className='display'> 
      <div  className='icon'>
        <FormDialog dataToShow={dataToShow} rowData={null}/>
      
        <div className='container'>
        {
          state ? <FormDialog  dataToShow={dataToShow} rowData={state} rowIndex={index} className='button'/> : null
        }
        {
          state ? <TimePicker  rowData={state}  className='button'/> : null
       }
      </div>
      </div>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} onRowClick={(params)=>handleRowClick(params)}/>
        </div>
      </div>
    );
  }

  const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  })


  export default connect(mapStateToProps)(Display);