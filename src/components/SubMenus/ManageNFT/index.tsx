import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";

import './index.scss'

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
        cols: 2,
    },
];

const ManageNFT = () => {

    let navigate = useNavigate();

    const [uploadingNow, setUploadingNow] = useState(false);
    const [showStatusNFT, setShowStatusNFT] = useState(false);
    const [showNFTSetting, setShowNFTSetting] = React.useState<null | HTMLElement>(null);


    const handleOpenShowNFTSetting = (event: React.MouseEvent<HTMLElement>) => {
        setShowNFTSetting(event.currentTarget);
    }

    const handleCloseShowNFTSetting = () => {
        setShowNFTSetting(null);
    }

    const handleStatusPressed = () => {
        setShowStatusNFT(true);
        handleCloseShowNFTSetting();
    }
    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: 'rgb(0, 0, 0, 20%)' }}>
            <ImageList sx={{ position: 'absolute', width: (showStatusNFT ? '47%' : '97%'), height: '94vh', left: '1.5%', top: '13vh' }}>
                <ImageListItem key="Subheader" cols={(showStatusNFT ? 2 : 4)}>
                    <ListSubheader component="div"> My Image NFTs <Button variant='contained' color='error' sx={{ marginLeft: '5%' }} onClick={() => navigate('/home/mintnft')}> Mint New NFT </Button></ListSubheader>
                </ImageListItem>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.title}`}
                                    onClick={handleOpenShowNFTSetting}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        />
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
                            <MenuItem key="1" onClick={handleStatusPressed}>
                                <Typography textAlign="center">Status</Typography>
                            </MenuItem>
                        </Menu>
                    </ImageListItem>
                ))}
            </ImageList>
            {showStatusNFT ? (
                <Card className='edit-nft'>
                    <Backdrop
                        sx={{
                            color: '#fff',
                            zIndex: (theme) =>
                                theme.zIndex.drawer + 1
                        }}
                        open={uploadingNow}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Typography
                        sx={{
                            position: 'absolute',
                            left: '7%',
                            top: '5vh'
                        }}
                        variant='h5'>My Bear
                    </Typography>
                    <Button
                        variant='contained'
                        sx={{
                            position: 'absolute',
                            left: '7%',
                            top: '12vh',
                            width: '31%'
                        }} 
                        color='warning' > Sell
                    </Button>
                    <img
                        src='/images/Bear.png'
                        style={{
                            position: 'absolute',
                            left: '7%',
                            top: '20vh',
                            width: '31%',
                            height: '33vh'
                        }} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={9}
                        placeholder="Max 500 Characters"
                        sx={{ position: 'absolute', left: '43%', top: '20vh', width: '50%'}}
                    />
                </Card>
            ) : (<></>)}
</div>
    );
}

export default ManageNFT;