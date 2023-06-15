import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import '../components/css/AnimatedLanding.css';

const LandingPage = () => {
  const history = useHistory();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    backgroundColor: '#cfd8dc',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    justifyContent: 'center',
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="animated-image">
      <h1 style={{ textAlign: 'center', marginBottom: '50px', marginTop: '150px' }}>Select the Contract Type</h1>
      <Grid container spacing={2} style={{width: '50%'}}>
        <Grid item xs={12} md={4}>
          <Item onClick={() => history.push("buy&sell")}><h1>Buy/Sell Smart Contract</h1></Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item onClick={() => history.push("upfrontrental")}><h1>Upfront Rental Smart Contract</h1></Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item onClick={() => history.push("installmentrental")}><h1>Installment Based Rental Smart Contract</h1></Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;