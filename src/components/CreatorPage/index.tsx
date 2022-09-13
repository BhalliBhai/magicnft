
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CottageIcon from '@mui/icons-material/Cottage';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from "react-router-dom";

import { useWeb3Auth } from "../../services/web3auth";
import './index.css'

const settings = ['Profile', 'Logout'];

// const CreatorPage: React.FC = () => {
//   const [menuKey, setMenuKey] = useState(1);


//   const keyChanged = (item: any) => {
//     setMenuKey(item.key);
//   }

//   return (
//     <>
//       <nav>
//         <div style={{ backgroundColor: 'rgba(255, 255, 255, 70%)', width: '100%', height: '100vh' }}>
//           <div className="headerDiv"> <span style={{color: 'rgb(200, 111, 51)', fontSize: '26px'}} ><CottageIcon fontSize='large' style={{position: 'absolute', top: '2vh', left: '5%', color: 'rgb(255, 255, 255)'}}/>{localStorage.getItem('fullName')} </span> 's Page
//             {/* <div style={{ position: 'absolute', top: '71px', left: '0px', width: '100%', height: '30px', backgroundColor: 'rgb(0, 21, 41)' }}></div> */}
//           </div>
//           <Menu
//             style={{ width: '25%', height: '80vh', fontSize: '15px', fontFamily: 'Segoe UI', position: 'absolute', top: '15vh' }}
//             defaultSelectedKeys={['1']}
//             mode="inline"
//             theme="dark"
//             // inlineCollapsed={collapsed}
//             onClick={keyChanged}
//           >
//             <Menu.Item key='1'><Link to="/home/dashboard" className='subMenuText'>Dashboard</Link></Menu.Item>
//             <Menu.Item key='2'><Link to="/home/profile" className='subMenuText'>Profile</Link></Menu.Item>
//             <Menu.Item key='3'><Link to="/home/pages" className='subMenuText'>Pages</Link></Menu.Item>
//           </Menu>
//           <div className="userLogDiv"><img src="/images/User.png" style={{ width: '30px', height: '30px', position: 'absolute', left: '15px', bottom: '20px' }} /><span style={{ position: 'absolute', left: '60px', bottom: '25px', fontWeight: 'bold' }}>{localStorage.getItem('email')}</span><Button shape="round" className="logOutBtn">Log out</Button></div>
//         </div>
//       </nav>

//       <Outlet />
//     </>
//   );
// }

const CreatorPage = () => {

  let navigate = useNavigate();

  const { logout } = useWeb3Auth();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [showNFTSetting, setShowNFTSetting] = React.useState<null | HTMLElement>(null);


  const handleOpenShowNFTSetting = (event: React.MouseEvent<HTMLElement>) => {
    setShowNFTSetting(event.currentTarget);
  }

  const handleCloseShowNFTSetting = () => {
    setShowNFTSetting(null);
  }


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfilePressed = () => {
    navigate('/home/profile');
    handleCloseUserMenu();
  }

  const handleMyNFTPressed = () => {
    navigate('/home/managenft');
    handleCloseShowNFTSetting();
  }

  const handleMintNFTPressed = () => {
    navigate('/home/mintnft');
    handleCloseShowNFTSetting();
  }

  return (
    <>
      <nav>
        <AppBar position="static" color="secondary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <CottageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 10,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                GO HOME
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button key="Dashboard" onClick={() => navigate('/home/dashboard')} sx={{ my: 2, mr: 3, color: 'rgb(255, 255, 255)' }}>
                  Dashboard
                </Button>
                <Button key="Profile" onClick={() => navigate('/home/profile')} sx={{ my: 2, mr: 3, color: 'rgb(255, 255, 255)' }}>
                  Profile
                </Button>
                <Button key="Pages" onClick={() => navigate('/home/pages')} sx={{ my: 2, mr: 3, color: 'rgb(255, 255, 255)' }} >
                  Pages
                </Button>
                <Button key="Commnunity" sx={{ my: 2, mr: 3, color: 'rgb(255, 255, 255)' }} >
                  Commnunity
                </Button>
                <Button key="NFT" onClick={handleOpenShowNFTSetting} sx={{ my: 2, mr: 3, color: 'rgb(255, 255, 255)' }} >
                  NFT
                </Button>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={showNFTSetting}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(showNFTSetting)}
                  onClose={handleCloseShowNFTSetting}
                >
                  <MenuItem key="1" onClick={handleMyNFTPressed}>
                    <Typography textAlign="center">My NFTs</Typography>
                  </MenuItem>
                  <MenuItem key="2" onClick={handleMintNFTPressed}>
                    <Typography textAlign="center">Mint NFT</Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="h5" sx={{
                  mr: 1,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Franklin Gothic',
                  fontWeight: 700,
                  color: 'rgb(137 201 255)',
                  textDecoration: 'none',
                }}>
                  {localStorage.getItem('fullName')}
                </Typography>
                <Typography variant="h6" sx={{
                  mr: 10,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Franklin Gothic',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                  's Page
                </Typography>
              </Box>


              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/images/Antoni.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="Profile" onClick={handleProfilePressed}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key="Logout" onClick={() => { handleCloseUserMenu(); navigate('/'); }}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </nav>
      <Outlet />
    </>
  )
}

export default CreatorPage;