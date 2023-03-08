import './index.scss';
import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import Fab from '@mui/material/Fab';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useNavigate } from "react-router-dom";

import endpoint from '../../../endpoint.config';

const pagesDig = {
    position: 'absolute',
    left: '15%',
    top: '12.5vh',
    width: '70%',
    height: '95vh',
    borderRadius: '10px',
}

const Pages = () => {

    let navigate = useNavigate();

    const [publicSites, setPublicSites] = useState<any>([]);
    const [privateSites, setPrivateSites] = useState<any>([]);
    const [draftSites, setDraftSites] = useState<any>([]);
    const [siteTypeSelect, setSiteTypeSelect] = useState<any>('0');
    const [showMorePublicSetting, setShowMorePublicSetting] = React.useState<null | HTMLElement>(null);
    const [showMorePrivateSetting, setShowMorePrivateSetting] = React.useState<null | HTMLElement>(null);
    const [showMoreDraftSetting, setShowMoreDraftSetting] = React.useState<null | HTMLElement>(null);
    const [notificationText, setNotificationText] = useState('');

    // const [btnHandle, setBtnHandle] = useState(false);
    const [alignment, setAlignment] = React.useState('public');

    const [openSuccessNotification, setOpenSuccessNotification] = React.useState(false);

    const handleOpenMorePublicSetting = (event: React.MouseEvent<HTMLElement>) => {
        setShowMorePublicSetting(event.currentTarget);
    }

    const handleCloseMorePublicSetting = () => {
        setShowMorePublicSetting(null);
    }

    const handleOpenMorePrivateSetting = (event: React.MouseEvent<HTMLElement>) => {
        setShowMorePrivateSetting(event.currentTarget);
    }

    const handleCloseMorePrivateSetting = () => {
        setShowMorePrivateSetting(null);
    }

    const handleOpenMoreDraftSetting = (event: React.MouseEvent<HTMLElement>) => {
        setShowMoreDraftSetting(event.currentTarget);
    }

    const handleCloseMoreDraftSetting = () => {
        setShowMoreDraftSetting(null);
    }

    const handlePublicEditPressed = (siteUrl: any) => {
        // navigate(siteUrl);
        // window.open('https://magic-nfty.herokuapp.com/' + siteUrl, "_blank");
        window.open('http://' + endpoint.BaseUrl + '/' + siteUrl, "_blank");
        handleCloseMorePublicSetting();
    }

    const handlePrivateEditPressed = (siteUrl: any) => {
        // navigate(siteUrl);
        window.open('http://' + endpoint.BaseUrl + '/' + siteUrl, "_blank");
        handleCloseMorePrivateSetting();
    }

    const handleDraftEditPressed = (siteUrl: any) => {
        // navigate(siteUrl);
        window.open('http://' + endpoint.BaseUrl + '/' + siteUrl, "_blank");
        handleCloseMoreDraftSetting();
    }

    const handleMakePrivatePressed = async (siteUrl: any) => {

        console.log("siteUrl", siteUrl);
        // const tempAllData = (await axios.post('/creatorsite/changetype', { url: siteUrl, type: 'private' })).data;
        // const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));

        // setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        // setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        // setDraftSites(allData.filter((item: any) => item.published === false));

        // setNotificationText('Public site successfully changed to private site.');
        // handleSuccessClick();

        // handleCloseMorePublicSetting();
    }

    const handleDuplicatePressed = async (item: any) => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 30; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        const sendData = { id: item.creatorId, email: item.creatorEmail, url: text, allowed: true, published: true, name: item.siteName, description: item.siteDescription, thumbnail: item.siteThumbnail, type: item.siteType };

        console.log(sendData);

        const tempAllData = (await axios.post('/creatorsite/duplicate', sendData)).data;
        const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));

        setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        setDraftSites(allData.filter((item: any) => item.published === false));

        const mData = allData.filter((item: any) => item.siteUrl === text);

        handleCloseMorePublicSetting();

        await axios.post('/tiles/duplicatetiles', { siteId: mData[0]._id, originId: item._id });

        setNotificationText('Site successfully duplicated.');   
        handleSuccessClick();

    }

    const handleMakePublicPressed = async (siteUrl: any) => {

        const tempAllData = (await axios.post('/creatorsite/changetype', { url: siteUrl, type: 'public' })).data;
        const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));

        setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        setDraftSites(allData.filter((item: any) => item.published === false));

        setNotificationText('Private site successfully changed to public site.');
        handleSuccessClick();

        handleCloseMorePrivateSetting();
    }

    const handleDeletePublicSite = async (siteUrl: any, siteId: any) => {
        const tempAllData = (await axios.post('/creatorsite/deletesite', { url: siteUrl })).data;
        await axios.post('/tiles/deletetiles', { id: siteId });
        const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));

        setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        setDraftSites(allData.filter((item: any) => item.published === false));

        setNotificationText('Public site successfully deleted.');
        handleSuccessClick();

        handleCloseMorePublicSetting();
    }

    const handleDeletePrivateSite = async (siteUrl: any, siteId: any) => {
        const tempAllData = (await axios.post('/creatorsite/deletesite', { url: siteUrl })).data;
        await axios.post('/tiles/deletetiles', { id: siteId });

        const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));

        setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        setDraftSites(allData.filter((item: any) => item.published === false));

        setNotificationText('Private site successfully deleted.');
        handleSuccessClick();

        handleCloseMorePrivateSetting();
    }

    const handleDeleteDraftSite = async (siteUrl: any) => {
        const tempAllData = (await axios.post('/creatorsite/deletesite', { url: siteUrl })).data;
        const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));


        setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        setDraftSites(allData.filter((item: any) => item.published === false));

        setNotificationText('Draft site successfully deleted.');
        handleSuccessClick();

        handleCloseMoreDraftSetting();
    }




    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const handleSuccessClick = () => {
        setOpenSuccessNotification(true);
    };

    const handleSuccessClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessNotification(false);
    };

    const onBtnPressed = async () => {
        // setBtnHandle(true);
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 30; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        const userDatas = (await axios.get('/user/getusers')).data;
        const filteredData = userDatas.filter((item: any) => item.email === localStorage.getItem('email'));

        const sendData = { id: filteredData[0]._id, email: filteredData[0].email, url: text, allowed: true, published: false };
        setNotificationText('New site created. You can edit it and publish to private or public site.');
        handleSuccessClick();

        const tempAllData = (await axios.post('/creatorsite/createsite', sendData)).data;
        const allData = tempAllData.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));

        setPublicSites(allData.filter((item: any) => item.siteType === 'public'));
        setPrivateSites(allData.filter((item: any) => item.siteType === 'private'));
        setDraftSites(allData.filter((item: any) => item.published === false));

        setSiteTypeSelect('2');
        // navigate('/home/dashboard');
    }

    const onGoDashboard = () => {
        navigate('/home/dashboard');
    }


    useEffect(() => {
        (async () => {
            const res = await axios.get('/creatorsite/siteinfo');
            const siteData = res.data.filter((item: any) => item.creatorEmail === localStorage.getItem('email'));
            // setSiteData(siteData);

            setPublicSites(siteData.filter((item: any) => item.siteType === 'public'));
            setPrivateSites(siteData.filter((item: any) => item.siteType === 'private'));
            setDraftSites(siteData.filter((item: any) => item.published === false));

        })();
    }, []);

    return (
        <div className='bg-dark' style={{ width: '100%', height: '100vh' }} >
            <Snackbar
                open={openSuccessNotification}
                autoHideDuration={4000}
                onClose={handleSuccessClose}
                message="Note archived"
            // action={action}
            >
                <Alert severity="success" onClose={handleSuccessClose}>{notificationText}</Alert>
            </Snackbar>
 
            <Card sx={pagesDig} 
            className='bg-black p-4 pages-main-div'
                style={{minHeight: '20vh auto', overflowY: 'scroll'}}
            >
                <AddIcon fontSize="medium" sx={{ mr: 1.5, my: -0.5, color: 'rgb(255, 255, 255)' }} />
                <span style={{ fontFamily: 'Cooper', fontSize: '20px', color: 'rgb(255, 255, 255)', marginRight: '40%' }}>CREATE SITE PANEL</span>
                <Fab variant="extended" size="medium" sx={{ marginBottom: '2vh' }} onClick={onGoDashboard}>
                    <KeyboardReturnIcon sx={{ mr: 1 }} />
                    GO DASHBOARD
                </Fab>
                <Divider />
                <button className='btn btn-dark w-100 my-4' onClick={onBtnPressed}>
                    CREATE NEW WALL
                </button>

                <ToggleButtonGroup
                className='text-white tabs-group mb-3'
                    color="primary"
                    value={siteTypeSelect}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ width: '100%' }}
                >
                    <ToggleButton className='tabs-btn' value="0" sx={{ width: '33%' }} onClick={() => setSiteTypeSelect('0')}> <h6 className='text-white'>Public ({publicSites.length})</h6> </ToggleButton>
                    <ToggleButton className='tabs-btn' value="1" sx={{ width: '34%' }} onClick={() => setSiteTypeSelect('1')}> <h6 className='text-white'>Private ({privateSites.length})</h6> </ToggleButton>
                    <ToggleButton className='tabs-btn' value="2" sx={{ width: '33%' }} onClick={() => setSiteTypeSelect('2')}> <h6 className='text-white'>Drafts ({draftSites.length})</h6> </ToggleButton>
                </ToggleButtonGroup>
                {
                    siteTypeSelect === '0' && (
                        publicSites.map((item: any, index: any) => {
                            console.log("=============", item)
                            return ( 
                            <div className=" d-flex wall-row p-3  my-3">
                                {/* <div className="img-div pe-3">
                                <img src={wall} alt="Wall"/>
                                </div> */}
                                <div className="text-div">
                                  <div className="d-flex">
                                  <h5 className='text-white'>{item.siteName}</h5>
                                  <span id="link1" className="border-bottom border-2 border-white py-1 fw-bold"></span>
                                  <Tooltip title="Copy to Clipboard">
                                        <Button
                                            sx={{
                                                // position: 'absolute',
                                                // right: '13%',
                                                // top: '2vh',
                                                width: '10px',
                                                height: '4vh',
                                                backgroundColor: 'rgb(255, 255, 255)',
                                                borderColor: 'rgb(255, 255, 255)'
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    'https://' + endpoint.BaseUrl + '/public?token=' + item.siteUrl
                                                );
                                                setNotificationText('Site url copied to clipboard successfully!');
                                                handleSuccessClick();
                                            }}>
                                            <ContentCopyIcon />
                                        </Button>
                                    </Tooltip>
                                  </div>
                                  <p className="mb-0 text-white">
                                  https://{endpoint.BaseUrl}/public?token={item.siteUrl} 

                                    {/* <ReadMore>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </ReadMore> */}
                                  </p>
                                  <div className="options-btn">
                                        <div className="btn-group dropstart">
                                            <Tooltip title="More you can Do">
                                                <Button
                                                    sx={{
                                                        // position: 'absolute',
                                                        // right: '0.5%',
                                                        // top: '2vh',
                                                        width: '2%',
                                                        height: '4vh',
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                        borderColor: 'rgb(255, 255, 255)'
                                                    }}
                                                    onClick={handleOpenMorePublicSetting}>
                                                    <MoreVertIcon />
                                                </Button>
                                            </Tooltip>,
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={showMorePublicSetting}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(showMorePublicSetting)}
                                                onClose={handleCloseMorePublicSetting}
                                            >
                                                <MenuItem key="1" onClick={() => handlePublicEditPressed('public?token=' + item.siteUrl)}>
                                                    <Typography textAlign="center">Edit</Typography>
                                                </MenuItem>
                                                <MenuItem key="2" onClick={() => handleMakePrivatePressed(item.siteUrl)}>
                                                    <Typography textAlign="center">Make Private</Typography>
                                                </MenuItem>
                                                <MenuItem key="3" onClick={() => handleDuplicatePressed(item)}>
                                                    <Typography textAlign="center">Duplicate</Typography>
                                                </MenuItem>
                                                <MenuItem key="4" onClick={() => handleDeletePublicSite(item.siteUrl, item._id)}>
                                                    <Typography textAlign="center">Delete</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                  </div>
                                </div>
                                {/* btn toggle */}
                                <div className="switch">
                                    <Tooltip title="Un/Enable Site">
                                        <Switch
                                            sx={{
                                                position: 'absolute',
                                                right: '-7%',
                                                top: '1.5vh',
                                                zIndex:'999',
                                            }}
                                            color="default"
                                        />
                                    </Tooltip>
                                    {/* <input id="cmn-toggle-1" className="cmn-toggle cmn-toggle-round-flat" type="checkbox"/>
                                    <label ></label> */}
                                </div>
                            </div>
                                // <Card
                                //     key={index}
                                //     sx={{
                                //         height: '8vh',
                                //         width: '91%',
                                //         marginTop: '2vh',
                                //         position: 'absolute',
                                //         top: `${36 + index * 9}vh`
                                //     }}>
                                //     <Typography
                                //         sx={{
                                //             ml: 2,
                                //             my: 0.5,
                                //             width: '80%'
                                //         }}>
                                //         <span
                                //             style={{
                                //                 fontSize: '16px',
                                //                 fontWeight: 'bold'
                                //             }}>
                                //             {item.siteName}
                                //         </span>
                                //         <br />
                                //         https://{endpoint.BaseUrl}/public?token={item.siteUrl}
                                //     </Typography>
                                //     <Tooltip title="Un/Enable Site">
                                //         <Switch
                                //             sx={{
                                //                 position: 'absolute',
                                //                 right: '7%',
                                //                 top: '1.5vh'
                                //             }} />
                                //     </Tooltip>
                                //     <Tooltip title="Copy to Clipboard">
                                //         <Button
                                //             sx={{
                                //                 position: 'absolute',
                                //                 right: '13%',
                                //                 top: '2vh',
                                //                 width: '2%',
                                //                 height: '4vh',
                                //                 backgroundColor: 'rgb(255, 255, 255)',
                                //                 borderColor: 'rgb(255, 255, 255)'
                                //             }}
                                //             onClick={() => {
                                //                 navigator.clipboard.writeText(
                                //                     'https://' + endpoint.BaseUrl + '/public?token=' + item.siteUrl
                                //                 );
                                //                 setNotificationText('Site url copied to clipboard successfully!');
                                //                 handleSuccessClick();
                                //             }}>
                                //             <ContentCopyIcon />
                                //         </Button>
                                //     </Tooltip>
                                //     <Tooltip title="More you can Do">
                                //         <Button
                                //             sx={{
                                //                 position: 'absolute',
                                //                 right: '0.5%',
                                //                 top: '2vh',
                                //                 width: '2%',
                                //                 height: '4vh',
                                //                 backgroundColor: 'rgb(255, 255, 255)',
                                //                 borderColor: 'rgb(255, 255, 255)'
                                //             }}
                                //             onClick={handleOpenMorePublicSetting}>
                                //             <MoreVertIcon />
                                //         </Button>
                                //     </Tooltip>
                                //     <Menu
                                //         sx={{ mt: '45px' }}
                                //         id="menu-appbar"
                                //         anchorEl={showMorePublicSetting}
                                //         anchorOrigin={{
                                //             vertical: 'top',
                                //             horizontal: 'right',
                                //         }}
                                //         keepMounted
                                //         transformOrigin={{
                                //             vertical: 'top',
                                //             horizontal: 'right',
                                //         }}
                                //         open={Boolean(showMorePublicSetting)}
                                //         onClose={handleCloseMorePublicSetting}
                                //     >
                                //         <MenuItem key="1" onClick={() => handlePublicEditPressed('public?token=' + item.siteUrl)}>
                                //             <Typography textAlign="center">Edit</Typography>
                                //         </MenuItem>
                                //         <MenuItem key="2" onClick={() => handleMakePrivatePressed(item.siteUrl)}>
                                //             <Typography textAlign="center">Make Private</Typography>
                                //         </MenuItem>
                                //         <MenuItem key="3" onClick={() => handleDuplicatePressed(item)}>
                                //             <Typography textAlign="center">Duplicate</Typography>
                                //         </MenuItem>
                                //         <MenuItem key="4" onClick={() => handleDeletePublicSite(item.siteUrl, item._id)}>
                                //             <Typography textAlign="center">Delete</Typography>
                                //         </MenuItem>
                                //     </Menu>
                                // </Card>
                            )
                        })
                    )
                }
                {
                    siteTypeSelect === '1' && (
                        privateSites.map((item: any, index: any) => {
                            return (

                                <div className=" d-flex wall-row p-3  my-3">
                                {/* <div className="img-div pe-3">
                                <img src={wall} alt="Wall"/>
                                </div> */}
                                <div className="text-div">
                                  <div className="d-flex">
                                  <h5 className='text-white'>{item.siteName}</h5>
                                  <span id="link1" className="border-bottom border-2 border-white py-1 fw-bold"></span>
                                    <Tooltip title="Copy to Clipboard">
                                        <Button
                                            sx={{
                                                // position: 'absolute',
                                                // right: '13%',
                                                // top: '2vh',
                                                width: '2%',
                                                height: '4vh',
                                                backgroundColor: 'rgb(255, 255, 255)',
                                                borderColor: 'rgb(255, 255, 255)'
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    'https://' + endpoint.BaseUrl + '/public?token=' + item.siteUrl
                                                );
                                                setNotificationText('Site url copied to clipboard successfully!');
                                                handleSuccessClick();
                                            }}>
                                            <ContentCopyIcon />
                                        </Button>
                                    </Tooltip>
                                  </div>
                                  <p className="mb-0 text-white">
                                  https://{endpoint.BaseUrl}/public?token={item.siteUrl} 

                                    {/* <ReadMore>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </ReadMore> */}
                                  </p>
                                  <div className="options-btn">
                                        <div className="btn-group dropstart">
                                            <Tooltip title="More you can Do">
                                            <Button
                                                sx={{
                                                    // position: 'absolute',
                                                    // right: '0.5%',
                                                    // top: '2vh',
                                                    width: '2%',
                                                    height: '4vh',
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderColor: 'rgb(255, 255, 255)'
                                                }}
                                                onClick={handleOpenMorePrivateSetting}>
                                                <MoreVertIcon />
                                            </Button>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={showMorePrivateSetting}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(showMorePrivateSetting)}
                                                onClose={handleCloseMorePrivateSetting}
                                            >
                                                <MenuItem key="1" onClick={() => handlePrivateEditPressed('public?token=' + item.siteUrl)}>
                                                    <Typography textAlign="center">Edit</Typography>
                                                </MenuItem>
                                                <MenuItem key="2" onClick={() => handleMakePublicPressed(item.siteUrl)}>
                                                    <Typography textAlign="center">Make Public</Typography>
                                                </MenuItem>
                                                <MenuItem key="3" onClick={() => handleDuplicatePressed(item)}>
                                                    <Typography textAlign="center">Duplicate</Typography>
                                                </MenuItem>
                                                <MenuItem key="4" onClick={() => handleDeletePrivateSite(item.siteUrl, item._id)}>
                                                    <Typography textAlign="center">Delete</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                  </div>
                                </div>
                                {/* btn toggle */}
                                <div className="switch">
                                    <Tooltip title="Un/Enable Site">
                                        <Switch
                                            sx={{
                                                position: 'absolute',
                                                right: '-7%',
                                                top: '1.5vh',
                                                zIndex:'999',
                                            }}
                                            color="default"
                                        />
                                    </Tooltip>
                                    {/* <input id="cmn-toggle-1" className="cmn-toggle cmn-toggle-round-flat" type="checkbox"/>
                                    <label ></label> */}
                                </div>
                            </div>

                                // <Card
                                //     key={index}
                                //     sx={{
                                //         height: '8vh',
                                //         width: '91%',
                                //         marginTop: '2vh',
                                //         position: 'absolute',
                                //         top: `${36 + index * 9}vh`
                                //     }}>

                                //     <Typography
                                //         sx={{
                                //             ml: 2,
                                //             my: 0.5,
                                //             width: '80%'
                                //         }}>
                                //         <span
                                //             style={{
                                //                 fontSize: '16px',
                                //                 fontWeight: 'bold'
                                //             }}>
                                //             {item.siteName}
                                //         </span>
                                //         <br />
                                //         
                                //     </Typography>
                                //     
                                //     <Tooltip title="Un/Enable Site">
                                //         <Switch
                                //             sx={{
                                //                 position: 'absolute',
                                //                 right: '7%',
                                //                 top: '1.5vh'
                                //             }} />
                                //     </Tooltip>
                                //     
                                // </Card>
                            )
                        })
                    )
                }
                {
                    siteTypeSelect === '2' && (
                        draftSites.map((item: any, index: any) => {
                            return (

                            <div className=" d-flex wall-row p-3  my-3">
                                {/* <div className="img-div pe-3">
                                <img src={wall} alt="Wall"/>
                                </div> */}
                                <div className="text-div">
                                  <div className="d-flex">
                                  <h5 className='text-white'>My First Website - {index + 1}</h5>
                                  <span id="link1" className="border-bottom border-2 border-white py-1 fw-bold"></span>
                                    <Tooltip title="Copy to Clipboard">
                                        <Button
                                            sx={{
                                                width: '10px',
                                                height: '4vh',
                                                paddingLeft:'0',
                                                marginLeft:'20px',
                                                color: 'rgb(255, 255, 255)',
                                                backgroundColor: 'transparent',
                                                borderColor: 'rgb(255, 255, 255)'
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    'https://' + endpoint.BaseUrl + '/public?token=' + item.siteUrl
                                                );
                                                setNotificationText('Site url copied to clipboard successfully!');
                                                handleSuccessClick();
                                            }}>
                                            <ContentCopyIcon />
                                        </Button>
                                    </Tooltip>
                                  </div>
                                  <p className="mb-0 text-white">
                                   https://{endpoint.BaseUrl}/public?token={item.siteUrl} 

                                    {/* <ReadMore>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </ReadMore> */}
                                  </p>
                                  <div className="options-btn">
                                        <div className="btn-group dropstart">
                                            <Tooltip title="More you can Do">
                                                <Button
                                                sx={{
                                                    width: '2%',
                                                    height: '4vh',
                                                    // backgroundColor: 'rgb(255, 255, 255)',
                                                    color: 'rgb(255, 255, 255)',
                                                    borderColor: 'rgb(255, 255, 255)'
                                                }}
                                                onClick={handleOpenMoreDraftSetting}
                                                    >
                                                    <MoreVertIcon />
                                                </Button>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '30px' }}
                                                id="menu-appbar"
                                                anchorEl={showMoreDraftSetting}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(showMoreDraftSetting)}
                                                onClose={handleCloseMoreDraftSetting}
                                                >
                                                <MenuItem key="1" onClick={() => handleDraftEditPressed('public?token=' + item.siteUrl)}>
                                                    <Typography textAlign="center">Edit</Typography>
                                                </MenuItem>
                                                {/* <MenuItem key="2" onClick={handleCloseMoreDraftSetting}>
                                                    <Typography textAlign="center">Duplicate</Typography>
                                                </MenuItem> */}
                                                <MenuItem key="2" onClick={() => handleDeleteDraftSite(item.siteUrl)}>
                                                    <Typography textAlign="center">Delete</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                  </div>
                                </div>
                                {/* btn toggle */}
                                <div className="switch">
                                    <Tooltip title="Un/Enable Site">
                                        <Switch
                                            sx={{
                                                position: 'absolute',
                                                right: '-7%',
                                                top: '1.5vh',
                                                zIndex:'999',
                                            }}
                                            color="default"
                                        />
                                    </Tooltip>
                                {/* <input id="cmn-toggle-1" className="cmn-toggle cmn-toggle-round-flat" type="checkbox"/>
                                <label></label> */}
                                </div>
                            </div>
                               
                                // <Card
                                //   className='bg-dark py-3'
                                //     key={index}
                                //     sx={{
                                //         height: '100px',
                                //         width: '91%',
                                //         marginTop: '5px',
                                //         position: 'relative',
                                //         // top: `${26 + index * 9}vh`,
                                //         overFlow:'scroll'
                                //     }}>

                            
                                //     <Typography
                                //     className='text-white'

                                //         sx={{
                                //             ml: 2,
                                //             my: 0.5,
                                //             width: '80%'
                                //         }}>
                                //         <span
                                //             style={{
                                //                 fontSize: '16px',
                                //                 fontWeight: 'bold',
                                //                 color:'white'
                                //             }}>
                                //             Untitled - {index + 1}
                                //         </span>
                                //         <Tooltip title="Copy to Clipboard">
                                //         <Button
                                        
                                //             sx={{
                                //                 // position: 'absolute',
                                //                 // left: '15%',
                                //                 // top: '2vh',
                                //                 width: '10px',
                                //                 height: '4vh',
                                //                 paddingLeft:'0',
                                //                 marginLeft:'20px',
                                //                 color: 'rgb(255, 255, 255)',
                                //                 backgroundColor: 'transparent',
                                //                 borderColor: 'rgb(255, 255, 255)'
                                //             }}
                                //             onClick={() => {
                                //                 navigator.clipboard.writeText(
                                //                     'https://' + endpoint.BaseUrl + '/public?token=' + item.siteUrl
                                //                 );
                                //                 setNotificationText('Site url copied to clipboard successfully!');
                                //                 handleSuccessClick();
                                //             }}>
                                //             <ContentCopyIcon />
                                //         </Button>
                                //     </Tooltip>
                                //         <br />
                                //         https://{endpoint.BaseUrl}/public?token={item.siteUrl}
                                //     </Typography>
                                    
                                //     <Tooltip title="Un/Enable Site">
                                //         <Switch
                                //             sx={{
                                //                 position: 'absolute',
                                //                 right: '-7%',
                                //                 top: '1.5vh',
                                //                 zIndex:'999',
                                //             }}
                                //             color="default"
                                //             />
                                //     </Tooltip>
                                //     <Tooltip title="More you can Do">
                                //         <Button
                                //             sx={{
                                //                 position: 'absolute',
                                //                 right: '0.5%',
                                //                 top: '2vh',
                                //                 width: '2%',
                                //                 height: '4vh',
                                //                 // backgroundColor: 'rgb(255, 255, 255)',
                                //                 color: 'rgb(255, 255, 255)',
                                //                 borderColor: 'rgb(255, 255, 255)'
                                //             }}
                                //             onClick={handleOpenMoreDraftSetting}
                                                // >
                                //             <MoreVertIcon />
                                //         </Button>
                                //     </Tooltip>
                                //     <Menu
                                //         sx={{ mt: '30px' }}
                                //         id="menu-appbar"
                                //         anchorEl={showMoreDraftSetting}
                                //         anchorOrigin={{
                                //             vertical: 'top',
                                //             horizontal: 'right',
                                //         }}
                                //         keepMounted
                                //         transformOrigin={{
                                //             vertical: 'top',
                                //             horizontal: 'right',
                                //         }}
                                //         open={Boolean(showMoreDraftSetting)}
                                //         onClose={handleCloseMoreDraftSetting}
                                //     >
                                //         <MenuItem key="1" onClick={() => handleDraftEditPressed('public?token=' + item.siteUrl)}>
                                //             <Typography textAlign="center">Edit</Typography>
                                //         </MenuItem>
                                //         {/* <MenuItem key="2" onClick={handleCloseMoreDraftSetting}>
                                //             <Typography textAlign="center">Duplicate</Typography>
                                //         </MenuItem> */}
                                //         <MenuItem key="2" onClick={() => handleDeleteDraftSite(item.siteUrl)}>
                                //             <Typography textAlign="center">Delete</Typography>
                                //         </MenuItem>
                                //     </Menu>
                                // </Card>
                            )
                        })
                    )
                }
            </Card>
        </div>
    )
}

export default Pages;