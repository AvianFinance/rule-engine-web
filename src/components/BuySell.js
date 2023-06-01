import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { errors } from '../data/errors.js';
// import { events } from '../data/`events.js';
// import { modifiers } from '../data/modifiers.js';
// import { functions } from '../data/functions.js';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
}));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const BuySell = () => {
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [checked, setChecked] = React.useState(false);

    const Check = (address) => {
        setChecked(true)
    }
    
    const Deploy = (address) => {
        console.log("Deployed")
    }

    const events = ['events1', 'events2', 'events3']
    console.log(events)
    const errors = ['errors1', 'errors2', 'errors3']

    const modifiers = ['modifiers1', 'modifiers2', 'modifiers3']
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', height: '100vh' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Events</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignContent: 'center'}}>
                                <FormGroup>
                                    {events.map((event, id) => {
                                        console.log(id, event)
                                        return(<FormControlLabel key={id} control={<Checkbox />} label={event} />)
                                    })}
                                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                    <FormControlLabel required control={<Checkbox />} label="Required" />
                                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Errors</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignContent: 'center'}}>
                                <FormGroup>
                                    {errors.map((event, id) => {
                                        console.log(id, event)
                                        return(<FormControlLabel key={id} control={<Checkbox />} label={event} />)
                                    })}
                                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                    <FormControlLabel required control={<Checkbox />} label="Required" />
                                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Modifiers</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignContent: 'center'}}>
                                <FormGroup>
                                    {modifiers.map((event, id) => {
                                        console.log(id, event)
                                        return(<FormControlLabel key={id} control={<Checkbox />} label={event} />)
                                    })}
                                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                    <FormControlLabel required control={<Checkbox />} label="Required" />
                                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Functions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                    <Stack direction="row" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} spacing={3}>
                            <Button variant="outlined" color="primary" onClick={()=>Check()} >
                                Check
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={()=>Deploy()} >
                                Deploy
                            </Button>
                        </Stack>
                    </div>
                </Grid>
                {checked ? 
                <>
                    <Grid item xs={12} md={6}>
                        <h1>Current Contract</h1>
                        <iframe style={{
                            width: "80%",
                            height: "100%",
                            overflow: "visible",
                            border: "none",
                            minHeight: "60vh",
                            minWidth: "100vw",
                            border: '2px solid black'
                        }} src="https://res.cloudinary.com/isuruieee/raw/upload/v1685011682/sell_logic_itauje.txt"></iframe> 
                        {/* <p>hii</p> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h1>Updated Contract</h1>
                        <iframe style={{
                            width: "80%",
                            height: "100%",
                            overflow: "visible",
                            border: "none",
                            minHeight: "60vh",
                            minWidth: "100vw",
                            border: '2px solid black'
                        }} src="https://res.cloudinary.com/isuruieee/raw/upload/v1685011682/sell_logic_itauje.txt"></iframe> 
                        {/* <p>hii</p> */}
                    </Grid>
                </> : null}
                    
            </Grid>
        </div>
  );
};

export default BuySell;