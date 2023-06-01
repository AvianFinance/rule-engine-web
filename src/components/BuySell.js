import React, {useState, useEffect} from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	useSigner,
	useAccount,
} from 'wagmi'

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
    const [errorsList, seterrorsList] = React.useState([]);
    const [eventsList, seteventsList] = React.useState([]);
    const [modifiersList, setmodifiersList] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [refresh, setrefresh] = React.useState(false);
    const [smartcontractadd, setsmartcontractadd] = React.useState();
    const { address, connector, isConnected } = useAccount()

    useEffect(() => {
        fetch('http://127.0.0.1:5000/fetch/sell/events')
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data.data);
                seteventsList(data.data)
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
        fetch('http://127.0.0.1:5000/fetch/sell/errors')
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data.data);
                seterrorsList(data.data)
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
        fetch('http://127.0.0.1:5000/fetch/sell/modifiers')
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data.data);
                setmodifiersList(data.data)
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
    }, [])

    const Check = () => {
        console.log({ eventsList: eventsList, errorsList: errorsList, modifiersList: modifiersList })
        fetch('http://127.0.0.1:5000/compile/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers as needed
            },
            body: JSON.stringify({ eventsList: eventsList, errorsList: errorsList, modifiersList: modifiersList }) // Include the request body data
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                setsmartcontractadd(data.data)
                console.log(data);
                setChecked(true)
                toast.success('Compaire the Smart Contracts and then Deploy', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
                toast.error('Error occured while creating the new smart contract. Try Again!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        });
    }
    
    const Deploy = (address) => {
        if(isConnected){
            console.log("deployingg")
            toast.success('Deploying Successfull', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            toast.error('Connect Your Metamask', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }   
    }

    const handleEvents = (id, name, description, value) => {
        let boolval
        if (value===1){
            boolval = 0
        } else {
            boolval = 1
        }
        let newValue =  [name, description, boolval]
        let previouslist = eventsList
        previouslist[id] = newValue;
        seteventsList(previouslist);
        setrefresh(!refresh)
    }

    const handleErrors = (id, name, description, value) => {
        let boolval
        if (value===1){
            boolval = 0
        } else {
            boolval = 1
        }
        let newValue =  [name, description, boolval]
        let previouslist = errorsList
        previouslist[id] = newValue;
        seterrorsList(previouslist);
        setrefresh(!refresh)
    }

    const handleModifiers = (id, name, description, value) => {
        let boolval
        if (value===1){
            boolval = 0
        } else {
            boolval = 1
        }
        let newValue =  [name, description, boolval]
        let previouslist = modifiersList
        previouslist[id] = newValue;
        setmodifiersList(previouslist);
        setrefresh(!refresh)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', height: '100vh' }}>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Events</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignContent: 'center'}}>
                                <FormGroup>
                                    {eventsList.map((event, id) => {
                                        return(<FormControlLabel onClick={() => handleEvents(id, event[0], event[1], event[2])} key={id} control={<Checkbox checked={event[2]}/>} label={event[0] + " - " + event[1]} />)
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
                                    {errorsList.map((error, id) => {
                                        return(<FormControlLabel onClick={() => handleErrors(id, error[0], error[1], error[2])} key={id} control={<Checkbox checked={error[2]}/>} label={error[0] + " - " + error[1]} />)
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
                                    {modifiersList.map((modifier, id) => {
                                        return(<FormControlLabel onClick={() => handleModifiers(id, modifier[0], modifier[1], modifier[2])} key={id} control={<Checkbox checked={modifier[2]}/>} label={modifier[0] + " - " + modifier[1]} />)
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
                        }} src={smartcontractadd ? smartcontractadd : "https://res.cloudinary.com/isuruieee/raw/upload/v1685011682/sell_logic_itauje.txt"}></iframe> 
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
                        }} src= {smartcontractadd ? smartcontractadd : "https://res.cloudinary.com/isuruieee/raw/upload/v1685011682/sell_logic_itauje.txt"}></iframe> 
                        {/* <p>hii</p> */}
                    </Grid>
                </> : null}
                    
            </Grid>
        </div>
  );
};

export default BuySell;