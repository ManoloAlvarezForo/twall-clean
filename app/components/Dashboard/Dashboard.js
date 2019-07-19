import React from 'react';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import UnderConstruction from '../UnderConstruction/UnderConstruction';

class Dashboard extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CustomToolBar title="Dashboard" />
        <UnderConstruction />
      </div>
    );
  }
}

export default Dashboard;
