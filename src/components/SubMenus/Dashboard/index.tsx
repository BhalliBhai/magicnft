import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Fab from '@mui/material/Fab';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Card from '@mui/material/Card';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import './index.scss';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const userDataCard = {
    position: 'absolute',
    left: '1%',
    top: '12vh',
    width: '98%',
    height: '18vh'
}

const siteDataCard = {
    position: 'absolute',
    left: '1%',
    top: '33vh',

    width: '98%',
    height: '75vh',

    padding: '5vh 0% 3vh 3%',
    fontFamily: 'Franklin Gothic'
}

const Dashboard = () => {

    const [siteData, setSiteData] = useState<any>([]);
    var preUrl = 'https://magic-nfty.herokuapp.com/public?token=';

    useEffect(() => {
        (async () => {
            const res = await axios.get('/creatorsite/siteinfo');
            // console.log(res.data);
            console.log(res.data);
            const siteData = res.data.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));
            setSiteData(siteData);
            console.log(siteData);
        })();
    }, []);



    const [switchValueArray, setSwitchValueArray] = useState([]);

    // const [selectEnable, setSelectEnable] = useState(true);
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

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [changeSwitch, setChangeSwitch] = useState('');

    return (
        <div style={{ width: '100%', height: '100vh', background: 'rgba(0, 0, 0, 20%)' }}>
            <Snackbar
                open={openSuccessNotification}
                autoHideDuration={4000}
                onClose={handleSuccessClose}
                message="Note archived"
            >
                <Alert severity="success" onClose={handleSuccessClose}>Site url <strong>copied to clipboard successfully!</strong></Alert>
            </Snackbar>
            <Card sx={userDataCard}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{ position: 'absolute', left: '3%', top: '5vh' }}
                >
                    <Avatar alt="Creator Image" src='/images/github-logo.png' />
                </StyledBadge>
                <span style={{ position: 'absolute', left: '10%', top: '5vh', fontFamily: 'Segoe UI', fontSize: '17px', textDecoration: 'underline' }}> {localStorage.getItem('fullName')} / {localStorage.getItem('email')}</span>
            </Card>
            <Card sx={siteDataCard}> <LanguageIcon fontSize='medium' sx={{ my: 2 }} /><span style={{ position: 'absolute', left: '6%', top: '7vh', fontSize: '18px' }}>My Sites / Total:</span> <span style={{ position: 'absolute', left: '15%', top: '7vh', fontSize: '18px', color: 'rgb(255, 125, 125)' }}>{siteData.length} Sites</span>
                {
                    siteData.map((item: any, index: any) => {
                        return (
                            <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} sx={{ width: '95%', my: 1 }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel-content"
                                    id="panel-header"
                                >
                                    <Typography sx={{ ml: 2, width: '80%' }}> https://magic-nfty.herokuapp.com/public?token={item.siteUrl} / {item.siteType? item.siteType: 'draft'} page</Typography>
                                    <Switch sx={{ ml: 30 }} />

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Fab variant="extended" sx={{ width: '20%'}} onClick={ () => {navigator.clipboard.writeText(preUrl+item.siteUrl); handleSuccessClick(); }} >
                                        <ContentCopyIcon sx={{ mr: 1 }} />
                                        Copy To Clipboard
                                    </Fab>
                                    <Fab variant="extended" sx={{ ml: 3, width: '20%'}} /*onClick={onClickSaveBtn}*/ >
                                        <SaveAsIcon sx={{ mr: 1 }} />
                                        Save Changes
                                    </Fab>
                                </AccordionDetails>
                            </Accordion>
                        )
                    }
                    )}
            </Card >
        </div >);
}

export default Dashboard;