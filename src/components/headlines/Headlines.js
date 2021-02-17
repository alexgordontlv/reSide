import React from 'react';
import './headline.css';
import ImportExportIcon from '@material-ui/icons/ImportExport';
const Headlines = () => {
  return (
    <div className="headline">
      <div className="headline__elevator_parking">E/P</div>
      <div className="headline__name">
        Customer <ImportExportIcon fontSize="small" />
      </div>
      <div className="headline__contact">
        Contact <ImportExportIcon fontSize="small" />
      </div>
      <div className="headline__budget">
        Budget <ImportExportIcon fontSize="small" />
      </div>
      <div className="headline__buttons">Event / Edit / Delete</div>
    </div>
  );
};

export default Headlines;
