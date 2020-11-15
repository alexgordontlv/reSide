import React from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import './display.css';
import FormDialog from '../components/FormDialog'
import {connect} from 'react-redux';




 function Display({Customers}) {
  const rows: RowsProp = Customers;


  const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', width: 20 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'budget', headerName: 'Budget', width: 120 },
    { field: 'phone', headerName: 'Phone Number', width: 120 },
    { field: 'rooms', headerName: 'Rooms', width: 80 },
    { field: 'floor', headerName: 'Floor', width: 70 },
    { field: 'elevator', headerName: 'Elevator', width: 70 },
    { field: 'parking', headerName: 'Parking', width: 70 },
  ];


    return (
      
      <div className='display'> 
      <div  className='icon'>
        <FormDialog/>
      </div>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    );
  }

  const mapStateToProps = state => ({
    Customers: state.customers.Customers
  })


  export default connect(mapStateToProps)(Display);