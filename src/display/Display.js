import React from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import './display.css';
import FormDialog from '../components/FormDialog'
import {connect} from 'react-redux';




 function Display({dataToShow,currentUser}) {
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


  const rows: RowsProp = currentUser ? (dataToShow==='customers' ? currentUser.customers : currentUser.properties) : [];

  const columns: ColDef[] = [
    { field: 'name', headerName: `${name}`, width: 120 },
    { field: 'budget', headerName: `${budget}`, width: 120 },
    { field: 'phone', headerName: `${phone}`, width: 120 },
    { field: 'rooms', headerName: 'Rooms', width: 80 },
    { field: 'floor', headerName: 'Floor', width: 70 },
    { field: 'elevator', headerName: 'Elevator', width: 70 },
    { field: 'parking', headerName: 'Parking', width: 70 },
  ];


    return (
      
      <div className='display'> 
      <div  className='icon'>
        <FormDialog dataToShow={dataToShow}/>
      </div>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    );
  }

  const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  })


  export default connect(mapStateToProps)(Display);