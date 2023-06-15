import * as React from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Metamask_comp_text } from './metamask'
import {
	useAccount,
} from 'wagmi'


function ResponsiveAppBar() {
    const history = useHistory();
    const { address } = useAccount()
    console.log(address)
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        console.log('clicked');
        history.push("/vote");
    };

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <img src="https://jade-witty-wolverine-528.mypinata.cloud/ipfs/QmUSypdWo8JRV44Ktk9KcXgiCk7us5WEYk3ZzeDzGEtDN3?pinataGatewayToken=xA9loW9mwlHFcUpNy4slXCUcWXNb-o8w5UN3T8pDiJRXLEh2zw4NoFeijQv9m5kK&_gl=1*1a7h9ba*rs_ga*MTAxNjE0NTAyLjE2ODYwNjg1NTc.*rs_ga_5RMPXG14TE*MTY4Njg1NzQ3Ni4xNC4xLjE2ODY4NTc1MDYuMzAuMC4w" alt="Arctix Logo" width="50" height="50" />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Arctix
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                // onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                    <MenuItem key="vote" onClick={() => handleCloseNavMenu()}>
                    <Typography textAlign="center">Vote</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Rentify
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                    key="vote"
                    onClick={() => handleCloseNavMenu()}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Vote
                </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Metamask_comp_text/>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;