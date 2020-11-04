import React from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';

const rows: RowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' , col3: '0548099631', col4: '2', col5: '3'},
  { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns: ColDef[] = [
  { field: 'col1', headerName: 'Name', width: 120 },
  { field: 'col2', headerName: 'Budget', width: 120 },
  { field: 'col3', headerName: 'Phone Number', width: 120 },
  { field: 'col4', headerName: 'Rooms', width: 80 },
  { field: 'col5', headerName: 'Floor', width: 70 },
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