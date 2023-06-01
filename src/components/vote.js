import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	useSigner,
	useAccount,
} from 'wagmi'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const rows = [
    ["0x6F572BE2568CBdAE9C8eEd53B755BF9B133c23C0", "deployed", 2],
    ["0x6F572BE2568CBdAE9C8eEd53B755BF9B133c23C1", "not-deployed", 0],
    ["0x6F572BE2568CBdAE9C8eEd53B755BF9B133c23C2", "not-deployed", 1],
    ["0x6F572BE2568CBdAE9C8eEd53B755BF9B133c23C3", "not-deployed", 0]
];

export default function VotingTable() {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handlevote = (address) => {
        console.log("handlevote",address)
        setOpen(true)
    }
    const { address, connector, isConnected } = useAccount()
    const handleupgrade = (address) => {
        if(isConnected){
            console.log("handleupgrade",address)
            toast.success('Successfully Updated', {
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
    
    const handleview = (address) => {
        console.log("handleview",address)
        history.push(`/viewcontract/${address}`)
    }
    const voteinfavour = () => {
        if(isConnected){
            console.log("voteinfavour")
            toast.success('Voting Successfull', {
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
    const voteagainst = (address) => {
        if(isConnected){
            console.log("voteagainst")
            toast.success('Voting Successfull', {
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
    return (
        <div style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignContent: 'center'}}>
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
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} spacing={3}>
                        <Button variant="outlined" color="primary" onClick={()=>voteinfavour()}>
                            Voting in favor 
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>voteagainst()}>
                            Voting against
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <TableContainer sx={{ width: '80%', marginTop: '100px'}} component={Paper} >
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Contract Address</TableCell>
                        <TableCell align="center">Number of Votes</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row[0]}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                            {row[0]}
                        </TableCell>
                        <TableCell align="center">{row[2]}</TableCell>
                        <TableCell align="center">
                            <Stack direction="row" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} spacing={3}>
                                <Button variant="outlined" color="primary" onClick={()=>handlevote(row[0])}>
                                    Vote
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={()=>handleupgrade(row[0])}>
                                    Upgrade
                                </Button>
                                <Button variant="outlined" color="success" onClick={()=>handleview(row[0])}>
                                    View Contract
                                </Button>
                            </Stack>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    );
}