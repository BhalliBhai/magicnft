// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import './index.css';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { CardContent, Card, CircularProgress } from "@mui/material";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Fab from '@mui/material/Fab';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { useNavigate } from "react-router-dom";



const VerifyPage = () => {
    
    let navigate = useNavigate(); 

    const [openErrorNotification, setOpenErrorNotification] = React.useState(false);

    const [statusButton, setStatusButton] = useState(false);
    const [statusText, setStatusText] = useState(false);
    const [errorString, setErrorString] = useState('');

    const handleErrorClick = () => {
        setErrorString('Your url token is wrong!');
        setOpenErrorNotification(true);
    };

    const handleErrorTokenEntered = () => {
        setErrorString(`You cannot access with other token!`);
        setOpenErrorNotification(true);
    };


    const handleErrorClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorNotification(false);
    };

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const goBackHome = () => {
        navigate('/');
    }

    useEffect(() => {
        const url = window.location.search;
        axios.post('/user/url-verify', { verifyToken: url.split('=')[1] })
            .then(async (response) => {
                console.log(response);
                if (response.data.verify === 1 && localStorage.getItem('email') === response.data.email) {
                    await timeout(1000);
                    navigate('/home/dashboard');
                }
                else if( response.data.verify === 1 && localStorage.getItem('email') !== response.data.email) {
                    await timeout(1000);
                    handleErrorTokenEntered();
                    setStatusButton(true);
                }
                else if (response.data.verify === -1 || response.data.verify === 0) {
                    await timeout(1000);
                    handleErrorClick();
                    setStatusButton(true);
                }
            })
    }, []);

    return (
        <div className="loader-container">
            <Snackbar
                open={openErrorNotification}
                autoHideDuration={10000}
                onClose={handleErrorClose}
                message="Note archived"
            // action={action}
            >
                <Alert severity="error" onClose={handleErrorClose}>{errorString}</Alert>
            </Snackbar>
            <Card sx={{ position: 'absolute', width: '50%', height: '50vh', left: '25%', top: '25vh' }}>
                <CardContent >
                    {statusButton ? <GppMaybeIcon color="secondary" sx={{ position: 'absolute', left: '46%', top: '13vh', fontSize: 60 }} /> : <CircularProgress color="secondary" sx={{ position: 'absolute', left: '48%', top: '15vh' }} />}
                    <h2 style={{ position: 'absolute', left: '37%', top: '25vh' }}>{statusButton ? 'VERIFY FAILED' : 'VERIFY NOW ...'}</h2>
                    {statusButton ? (<Fab variant="extended" size="medium" color="primary" aria-label="add" sx={{ position: 'absolute', left: '42%', top: '35vh' }} onClick={goBackHome}>
                        <KeyboardReturnIcon sx={{ mr: 1 }} />
                        GO BACK
                    </Fab>) : (<></>)}
                    <HealthAndSafetyIcon style={{ position: 'absolute', left: '13%', top: '45vh', color: 'rgb(255, 125, 123)' }} />
                    <h5 style={{ position: 'absolute', left: '18%', top: '45vh', textDecoration: 'underline', color: 'rgb(255, 125, 123)' }}>{statusButton ? 'Creator token is wrong and cannot use other creator token' : 'Now host is verify your creator url. Wait a second.'}</h5>
                </CardContent>
            </Card>
        </div>
    )
}

export default VerifyPage;