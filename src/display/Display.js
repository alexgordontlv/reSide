import React from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import {Customers} from './customers';



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



export default function Display() {
    return (
      <div className='display'>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    );
  }