
import React, { useState, useRef, useEffect } from 'react';
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
import './hamburger.css'

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
  // const [isNavOpen, setisNavOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  function toggleClass() {
    setIsNavOpen(!isNavOpen);
  }



  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [divRef]);
  

  return (
    <>
      {/* <nav>
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
      </nav> */}
      {/* New Nav */}
      
      
        <div ref={divRef} className='new-nav-div'>
         
          <button onClick={toggleClass} className= {`navbar-toggler bg-transparent hamburger hamburger--collapse ${isNavOpen ? "is-active nav-button-off" : " nav-button-on"}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
         
          {isNavOpen && 
          <nav id="sidebar" className="active bg-black text-light newnav fixed-top slide">

            <div className="py-3 px-3 mb-3 border-bottom text-white d-flex">
            <CottageIcon sx={{ display: {md: 'flex' }, mr: 2 }} />
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
            </div>
            <ul className="list-unstyled mb-5 px-3">
              <li className="nav-item">
                <Button key="Dashboard" onClick={() => navigate('/home/dashboard')} sx={{ mr: 3, color: 'rgb(255, 255, 255)' }}>
                  Dashboard
                </Button>              
              </li>
              <li className="nav-item">
                <Button key="Profile" onClick={() => navigate('/home/profile')} sx={{ mr: 3, color: 'rgb(255, 255, 255)' }}>
                  Profile
                </Button>
              </li>
              <li className="nav-item">
                <Button key="Pages" onClick={() => navigate('/home/pages')} sx={{  mr: 3, color: 'rgb(255, 255, 255)' }} >
                  Pages
                </Button>
              </li>
              <li className="nav-item">
                <Button key="Commnunity" sx={{ color: 'rgb(255, 255, 255)' }} >
                  Commnunity
                </Button>              
              </li>
              <li className="nav-item">
                
                <Button key="NFT" onClick={handleOpenShowNFTSetting} sx={{ color: 'rgb(255, 255, 255)' }} >
                  NFT
                </Button>
                <Menu
                  style={{zIndex: 9999}}
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

                {/*
                <div className="btn-group dropdown-end p-0">
                <button className="btn btn-transparent border-0 text-white dropdown-toggle nav-dropdown p-0 fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  NFT
                </button>
                <ul className="dropdown-menu dropdown-menu-dark sidebar-dropdown" aria-labelledby="dropdownMenuButton1">
                  <li><Button className="dropdown-item" to={"/mynfts"}>My NFTs</Button></li>
                  <li><But className="dropdown-item" to={"/mintnft"}>Mint NFT</But></li>
                </ul> 
              </div>*/}
              </li>
              <li className="nav-item mt-5">
              
              </li>
            </ul>
            <div className="footer px-3">

            <p className='mb-3' style={{
                  fontFamily: 'Franklin Gothic',
                  fontWeight: 500,
                  color: 'rgb(137 201 255)',
                  textDecoration: 'none',
                }}>
                  {localStorage.getItem('fullName')} <span className='text-white fw-normal'>'s Page</span>
                </p>

              <div className="p-0 m-0 d-flex justify-content-between">
              {/* <Tooltip title="Go to Profile">
                  <IconButton onClick={handleProfilePressed} sx={{ p: 0 }}>
                  <span>
                      <svg width="30" height="30" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 9.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
                        <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm10-8.75a8.75 8.75 0 0 0-6.835 14.212C6.053 16.032 8.006 14.5 12 14.5c3.994 0 5.946 1.531 6.835 2.962A8.75 8.75 0 0 0 12 3.25Z" clip-rule="evenodd"></path>
                      </svg>
                    </span>
                    <Avatar alt="Remy Sharp" src="/images/Antoni.png" /> 
                    <span className='text-white small'>Profile</span>
                  </IconButton>
                </Tooltip> */}
                
                <button className="navprofile btn btn-black text-white border-0" key="Profile" onClick={handleProfilePressed}> 
                    <span>
                      <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 9.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
                        <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm10-8.75a8.75 8.75 0 0 0-6.835 14.212C6.053 16.032 8.006 14.5 12 14.5c3.994 0 5.946 1.531 6.835 2.962A8.75 8.75 0 0 0 12 3.25Z" clip-rule="evenodd"></path>
                      </svg>
                    </span> 
                    <span className="px-1">Profile</span>
                </button>
                  <MenuItem key="Logout" onClick={() => { handleCloseUserMenu(); navigate('/'); }}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </div>
            </div>
          </nav>
          }
        </div>
      
      <Outlet />
    </>
  )
}

export default CreatorPage;


