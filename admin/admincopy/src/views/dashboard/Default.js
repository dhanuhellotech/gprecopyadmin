import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import Admission from '../admission/Admission.jsx';
import TotalChartCard from '../../ui-component/cards/TotalChartCard/index.js';
import Contact from '../contact/Contact.jsx';
import SubCard from '../../ui-component/cards/SubCard/index.js';
import TableBasic from '../forms/tables/TableBasic/index.js';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const isSmallScreen = useMediaQuery({ maxWidth: 957 });

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(getGreeting(currentHour));
  }, []);

  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) {
      return 'Good Morning Admin';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon Admin';
    } else {
      return 'Good Evening Admin';
    }
  };

  return (
    <Grid container style={{ height: "100%", width: "100%", zIndex: "1000", position: "fixed" }} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          {greeting}
        </Typography>
        <Grid item xs={12}  md={8}>
        <Contact />
      </Grid>
      </Grid>
      

   

    
    </Grid>
  );
};

export default Dashboard;
