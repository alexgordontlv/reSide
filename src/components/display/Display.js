import React, {useState, useEffect} from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import './display.css';
import FormDialog from '../formdialog/FormDialog'
import {connect} from 'react-redux';
import TimePicker from '../timepicker/TimePicker';
import { SnackbarProvider} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';



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
      <SnackbarProvider maxSnack={3}>
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
        {
          rows.length || !currentUser > 0 ? <DataGrid rows={rows} columns={columns} onRowClick={(params)=>handleRowClick(params)}  disableMultipleSelection={true} />
          :
          <div className='proggress_container'>
          <CircularProgress className='proggress'/>
          </div>
        }
            
        </div>
      </div>
      </SnackbarProvider>
    );
  }

  const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  })


  export default connect(mapStateToProps)(Display);