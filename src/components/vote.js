import React, { useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSigner, useAccount} from 'wagmi';
import { ethers } from "ethers";
import { getContracts } from '../api/contracts';
import  SellProxy  from '../contracts/ASEProxy/ASE_Proxy.json';

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

export default function VotingTable() {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handlevote = (address) => {
        console.log("handlevote",address)
        setOpen(true)
    }
    const { data: signer } = useSigner()

    const [contracts, setContracts] = React.useState([]);

    let _market = new ethers.Contract( // We will use this to interact with the AuctionManager
                    '0xc333411e89556784b20ECAbe108e175CfB860AD3',
                    SellProxy.abi,
                    signer
                );

    useEffect(() => {
        getContracts()
				.then((res) => {
                    if(res.data){
                        setContracts(res.data.data)
                    }
				})
        // fetch('http://127.0.0.1:5000/upgraded_contracts')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Handle the response data
        //         console.log(data.data);
        //         setContracts(data.data)
        //     })
        //     .catch(error => {
        //         // Handle any errors
        //         console.error('Error:', error);
        //     });
    }, [])

    const { isConnected } = useAccount()
    const handleupgrade = async (address) => {
        if(isConnected){
            try {
                let _marketplace = await new ethers.Contract( // We will use this to interact with the AuctionManager
                    '0xc333411e89556784b20ECAbe108e175CfB860AD3',
                    SellProxy.abi,
                    signer
                );
                console.log('marketplace',_marketplace)
                await _marketplace.updateImplContract();
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
            } catch (error) {
                toast.error(error.reason, {
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
        let val = address.split("/")
        console.log(val[val.length - 1])
        history.push(`/viewcontract/${val[val.length - 1]}`)
    }

    const voteinfavour = async () => {
        if(isConnected){
            console.log("voteinfavour")
            try {
                let _marketplace = await new ethers.Contract( // We will use this to interact with the AuctionManager
                    '0xc333411e89556784b20ECAbe108e175CfB860AD3',
                    SellProxy.abi,
                    signer
                );
                let votes  = await _market.calculateVotingResult()
                console.log(votes)
                let transaction = await _marketplace.voteOnProposal(true);
                console.log('transaction',transaction)
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
            } catch (error) {
                toast.error(error.reason, {
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
    const voteagainst = async (address) => {
        if(isConnected){
            try {
                let _marketplace = await new ethers.Contract( // We will use this to interact with the AuctionManager
                    '0xc333411e89556784b20ECAbe108e175CfB860AD3',
                    SellProxy.abi,
                    signer
                );
                let votes  = await _market.calculateVotingResult()
                console.log(votes)
                await _marketplace.voteOnProposal(false);
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
            } catch (error) {
                toast.error(error.reason, {
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

    console.log(contracts)
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
                        <TableCell align="center">Contract Type</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Number of Votes</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {contracts.map((row) => (
                        <TableRow
                        key={row.contract_address}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                            {row.contract_address}
                        </TableCell>
                        <TableCell align="center">{row.contract_name}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">{1}</TableCell>
                        <TableCell align="center">
                            <Stack direction="row" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} spacing={3}>
                                <Button disabled={row.status!=="pending"} variant="outlined" color="primary" onClick={()=>handlevote(row.contract_address)}>
                                    Vote
                                </Button>
                                <Button disabled={row.status!=="pending"} variant="outlined" color="secondary" onClick={()=>handleupgrade(row.contract_address)}>
                                    Upgrade
                                </Button>
                                <Button variant="outlined" color="success" onClick={()=>handleview(row.address)}>
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