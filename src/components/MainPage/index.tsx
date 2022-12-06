// import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "../../services/web3auth";
import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './index.css';
import Alert from '@mui/material/Alert';

import Fab from '@mui/material/Fab';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PublicIcon from '@mui/icons-material/Public';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import InfoIcon from '@mui/icons-material/Info';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import TwitterIcon from '@mui/icons-material/Twitter';
import KeyIcon from '@mui/icons-material/Key';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import LinkIcon from '@mui/icons-material/Link';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';


import { useNavigate } from "react-router-dom";

import endpoint from '../../../endpoint.config';

const adminModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '25vh',
  bgcolor: 'rgba( 255, 255, 255, 70%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const MainPage = () => {
  const { provider, login, logout, getUserInfo, getAccounts/*, getBalance , signMessage, signTransaction, signAndSendTransaction, web3Auth, chain*/ } = useWeb3Auth();

  // const [loginInfo, setLoginInfo] = useState();

  const [btnDisabled, setBtnDisabled] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {

      localStorage.setItem('isAdmin', 'false');

      localStorage.setItem('isCreator', 'false');
      localStorage.setItem('logged', 'false');
      localStorage.setItem('isRequested', 'false');

      localStorage.setItem('email', '');
      localStorage.setItem('fullName', '');

      setBtnDisabled(localStorage.getItem('isRequested') === 'true');

      setShowDiv(false);
      setEmail('');
      setName('');
      if (provider === null) return;
      const userInfo = await getUserInfo();
      const account = await getAccounts();
      // const balance = await getBalance();
      const accountJson = { accountAddress: account[0] };
      let sendData;
      if (!userInfo.email) {
        const jsonTempData = { email: '', fullName: '' };
        sendData = { ...jsonTempData, ...accountJson };
      }
      sendData = { ...userInfo, ...accountJson };

      // console.log(sendData);
      if (userInfo.email) {
        setEmail(userInfo.email);
        setName(userInfo.name);
      }

      if (account[0]) { // if you logged in 
        const userDatas = (await axios.get('/user/getusers')).data;
        const filteredData = userDatas.filter((item: any) => item.accountAddress === account[0]); // logged user data

        console.log(filteredData.length);
        // console.log( filteredData);
        if (filteredData.length === 0) { // if your email and fullName does not exist
          console.log(sendData);
          await axios.post('/user/register', sendData);
        }
        else {
          if (filteredData[0].isCreater === true) {
            localStorage.setItem('isCreator', 'true');
            localStorage.setItem('isRequested', 'true');
            setBtnDisabled(localStorage.getItem('isRequested') === 'true');
            localStorage.setItem('email', filteredData[0].email);
            localStorage.setItem('fullName', filteredData[0].fullName);
          }

          // console.log( filteredData[0].isRequested );
          if (filteredData[0].isRequested === true) {
            localStorage.setItem('isRequested', 'true');
            setBtnDisabled(localStorage.getItem('isRequested') === 'true');
            localStorage.setItem('email', filteredData[0].email);
            localStorage.setItem('fullName', filteredData[0].fullName);
          }
        }

        if (provider !== null)
          localStorage.setItem('logged', 'true');
        else
          localStorage.setItem('logged', 'false');
      }
    })();
  }, [provider]);


  const sendCreaterData = async () => {
    const account = await getAccounts();
    const sendData = { Email: email, Name: name, Social: social, AccountAddress: account[0] };

    const responseData = (await axios.post('/user/creatorrequest', sendData)).data;
    console.log(responseData);

    setShowDiv(false);

    handleSuccessClick();
  }

  const [adminEmail, setAdminEmail] = useState('');
  const handleAdminEmail = (e: any) => {
    setAdminEmail(e.target.value);
  }

  const [adminPassword, setAdminPassword] = useState('');
  const handleAdminPassword = (e: any) => {
    setAdminPassword(e.target.value);
  }


  //changeurl
  const [creatorUrl, setCreatorUrl] = useState(endpoint.BaseUrl + '/verify?token=');
  const handleCreatorUrl = (e: any) => {
    setCreatorUrl(e.target.value);
  }

  //changeurl
  const [publicUrl, setPublicUrl] = useState(endpoint.BaseUrl + '/public?token=');
  const handlePublicUrl = (e: any) => {
    setPublicUrl(e.target.value);
  }


  const [email, setEmail] = useState('');
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const [name, setName] = useState('');
  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const [social, setSocial] = useState('');
  const handleSocial = (e: any) => {
    setSocial(e.target.value);
  };

  const [showDiv, setShowDiv] = useState(false);
  const showCreator = () => {
    setShowDiv(true);
  }

  const closeCreator = () => {
    setShowDiv(false);
  }

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const onAdminLogin = () => setOpenAdminModal(true);
  const onAdminLogout = () => setOpenAdminModal(false);

  const [openCreatorModal, setOpenCreatorModal] = useState(false);
  const onCreatorLogin = () => setOpenCreatorModal(true);
  const onCreatorLogout = () => setOpenCreatorModal(false);

  const [openPublicModal, setOpenPublicModal] = useState(false);
  const onPublicLogin = () => setOpenPublicModal(true);
  const onPublicLogout = () => setOpenPublicModal(false);


  const loggedInView = (
    <>
      <Fab variant="extended" color="secondary" onClick={logout} sx={{ left: '68%', top: '6vh', width: '55%' }}>
        <LogoutIcon sx={{ mr: 2 }} />
        LOG OUT
      </Fab>
      <Dialog
        open={showDiv}
        onClose={closeCreator}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"><span style={{ fontWeight: 'bold', color: 'rgb( 255, 124, 123)' }}>MagicNFTy</span></DialogTitle>
        <DialogContent dividers={true} >
          <Card sx={{ minWidth: 350, minHeight: 300 }}>
            <CardContent>
              <span style={{ fontFamily: 'Franklin Gothic', fontSize: '17px' }}> Join the waitlist by filling the form below</span>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AttachEmailIcon sx={{ ml: 2, mr: 2, my: 0 }} />
                <TextField id="input-with-sx" label="requester email" variant="standard" onChange={handleEmail} value={email} sx={{ mr: 3, my: 0 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PersonIcon sx={{ ml: 2, mr: 2, my: 0 }} />
                <TextField id="input-with-sx" label="full name" variant="standard" onChange={handleName} value={name} sx={{ mr: 3, my: 0 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TwitterIcon sx={{ ml: 2, mr: 2, my: 0 }} />
                <TextField id="input-with-sx" label="social media handles" variant="standard" onChange={handleSocial} value={social} sx={{ mr: 3, my: 0 }} />
              </Box>
              <button className="submitBtn" onClick={sendCreaterData}> SUBMIT</button>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );

  const unloggedInView = (
    <Fab variant="extended" onClick={login} sx={{ left: '68%', top: '6vh', width: '55%' }}>
      <LoginIcon sx={{ mr: 2 }} />
      LOGIN WITH WEB3AUTH
    </Fab>
  );

  const [openNotification, setOpenNotification] = React.useState(false);

  const handleClick = () => {
    setOpenNotification(true);
  };

  const [openCreatorNotification, setOpenCreatorNotification] = React.useState(false);

  const handleCreatorClick = () => {
    setOpenCreatorNotification(true);
  };
  const [openPublicNotification, setOpenPublicNotification] = React.useState(false);

  const handlePublicClick = () => {
    setOpenPublicNotification(true);
  };


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  const handleCreatorClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCreatorNotification(false);
  };

  const handlePublicClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPublicNotification(false);
  };


  const [openSuccessNotification, setOpenSuccessNotification] = React.useState(false);

  const handleSuccessClick = () => {
    setOpenSuccessNotification(true);
  };

  const handleSuccessClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessNotification(false);
  };

  const checkAdmin = () => {
    if ((adminEmail === 'strongwolf223@gmail.com' && adminPassword === 'password') || (adminEmail === 'aditya@magicnfty.com' && adminPassword === 'password')) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    }
    else {
      handleClick();
      onAdminLogout();
    }
  }

  const checkCreator = () => {
    console.log('/' + creatorUrl.split('/').pop());
    if (localStorage.getItem('logged') === 'true') {
      navigate('/' + creatorUrl.split('/').pop());
    }
    else {
      handleCreatorClick();
      onCreatorLogout();
    }
  }

  const checkPublic = () => {
    if (localStorage.getItem('logged') === 'true') {
      navigate('/' + publicUrl.split('/').pop());
    }
    else {
      handlePublicClick();
      onPublicLogout();
    }
  }
  return (<div className={styles.grid}>{provider ? loggedInView : unloggedInView}

    <Modal
      open={openAdminModal}
      onClose={onAdminLogout}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={adminModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ACCESS TO ADMIN PAGE
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AttachEmailIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="Input Your Email" variant="standard" sx={{ mr: 3, my: 0 }} onChange={handleAdminEmail} value={adminEmail} />
            <KeyIcon sx={{ color: 'action.active', mr: 2, my: 0 }} />
            <TextField id="input-with-sx" label="Input Password" variant="standard" type="password" sx={{ mr: 2, my: 0 }} onChange={handleAdminPassword} value={adminPassword} />
            <Fab variant="extended" size="medium" sx={{ ml: 5, my: 0 }} onClick={checkAdmin}>
              <VerifiedUserIcon sx={{ mr: 1 }} />
              ACCESS
            </Fab>
          </Box>
        </Typography>
      </Box>
    </Modal>

    <Modal
      open={openCreatorModal}
      onClose={onCreatorLogout}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={adminModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ACCESS TO CREATOR'S PAGE
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LinkIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="Input Your Specialized Url" variant="standard" sx={{ mr: 3, my: 0, width: '65%' }} onChange={handleCreatorUrl} value={creatorUrl} />
            <Fab variant="extended" size="medium" sx={{ ml: 5, my: 0 }} onClick={checkCreator}>
              <VerifiedUserIcon sx={{ mr: 1 }} />
              ACCESS
            </Fab>
          </Box>
        </Typography>
      </Box>
    </Modal>

    <Modal
      open={openPublicModal}
      onClose={onPublicLogout}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={adminModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ACCESS TO PUBLIC PAGES
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LinkIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="Input Public Page Url" variant="standard" sx={{ mr: 3, my: 0, width: '65%' }} onChange={handlePublicUrl} value={publicUrl} />
            <Fab variant="extended" size="medium" sx={{ ml: 5, my: 0 }} onClick={checkPublic}>
              <VerifiedUserIcon sx={{ mr: 1 }} />
              ACCESS
            </Fab>
          </Box>
        </Typography>
      </Box>
    </Modal>


    <Snackbar
      open={openNotification}
      autoHideDuration={4000}
      onClose={handleClose}
      message="Note archived"
    // action={action}
    >
      <Alert severity="error" onClose={handleClose}>Wrong email or wrong password - <strong>Check it out!</strong></Alert>
    </Snackbar>

    <Snackbar
      open={openCreatorNotification}
      autoHideDuration={4000}
      onClose={handleCreatorClose}
      message="Note archived"
    // action={action}
    >
      <Alert severity="error" onClose={handleCreatorClose}>You have to <strong> login first!</strong></Alert>
    </Snackbar>

    <Snackbar
      open={openPublicNotification}
      autoHideDuration={4000}
      onClose={handlePublicClose}
      message="Note archived"
    // action={action}
    >
      <Alert severity="error" onClose={handlePublicClose}>You have to <strong> login first!</strong></Alert>
    </Snackbar>


    <Snackbar
      open={openSuccessNotification}
      autoHideDuration={4000}
      onClose={handleSuccessClose}
      message="Note archived"
    // action={action}
    >
      <Alert severity="success" onClose={handleSuccessClose}>Your request has been <strong>sent to host manager successfully!</strong></Alert>
    </Snackbar>

    <Box sx={{ height: 320, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: '6vh', right: '2%' }}
        icon={<AdminPanelSettingsIcon />}
        direction="down"
      >
        <SpeedDialAction key="admin" icon={<SupervisorAccountIcon />} tooltipTitle="Connect To Admin Panel" onClick={onAdminLogin}></SpeedDialAction>
        <SpeedDialAction key="public" icon={<PublicIcon />} tooltipTitle="Connect To Public Sites" onClick={onPublicLogin}></SpeedDialAction>
        <SpeedDialAction key="private" icon={<VpnLockIcon />} tooltipTitle="Connect To Creator Page" onClick={onCreatorLogin}></SpeedDialAction>
        {!btnDisabled ? <SpeedDialAction key="request" icon={<SendTimeExtensionIcon />} tooltipTitle="Send Creator Request" onClick={showCreator} ></SpeedDialAction> : <></>}
        <SpeedDialAction key="info" icon={<InfoIcon />} tooltipTitle="About Magic-NFTy"></SpeedDialAction>
      </SpeedDial>
    </Box>

  </div>);
};

export default MainPage;
