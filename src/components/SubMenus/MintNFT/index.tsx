import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

import { NFTStorage } from 'nft.storage';
import { FileUploader } from "react-drag-drop-files";

import './index.scss';

const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM5MzIwNTBFODQwYzM4OWNGM2ZlRjRGQzFDODg1RTA4NTFlQ2NjMzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTQzOTcwNTI0NywibmFtZSI6Ik1hZ2ljTkZUeSJ9.XOg1e6ny5njX54-b8I3yrjQmoCGj4FQXj9wgy_oYk94';
const uploadFileTypes = ["JPG", "PNG", "GIF", "SVG", "MP4", "WEBM", "MP3", "WAV", "OGG", "GLB", "GLTF"];

const MintNFT = () => {
    const [uploadingNow, setUploadingNow] = useState(false);
    const [primaryDataFile, setPrimaryDataFile] = useState<any>();
    const [nftName, setNftName] = useState('');
    const [uploadedNft, setUploadedNft] = useState('');
    const [nftDescription, setNftDescription] = useState('');

    const [traitType, setTraitType] = useState('');
    const [traitValue, setTraitValue] = useState('');
    const [displayType, setDisplayType] = useState('');

    const [nftRoyalty, setNftRoyalty] = useState('');

    const [allProperty, setAllProperty] = useState<any>([]);


    const handleFileUpload = (file: any) => {
        setPrimaryDataFile(file);
        uploadNFT(file, 'New NFT', 'No Description');
    }

    const uploadNFT = async (uploadFile: any, nftName: any, nftDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: nftName,
                description: nftDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedNft('https://ipfs.io/ipfs/' + pathname);
            console.log(uploadedNft);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleNftNameChange = (e: any) => {
        setNftName(e.target.value);
    }

    const handleNftDescriptionChange = (e: any) => {
        setNftDescription(e.target.value);
    }

    const handleTraitTypeChange = (e: any) => {
        setTraitType(e.target.value);
    }

    const handleTraitValueChange = (e: any) => {
        setTraitValue(e.target.value);
    }

    const handleDisplayTypeChange = (e: any) => {
        setDisplayType(e.target.value);
    }

    const handleNftRoyaltyChange = (e: any) => {
        setNftRoyalty(e.target.value);
    }

    const handleAddProperty = () => {
        if (traitValue !== '') {
            let newProperty = {
                trait_Type: traitType,
                trait_Value: traitValue,
                display_Type: displayType
            }
            let tempProperty = allProperty;
            tempProperty.push(newProperty);
            setAllProperty([...tempProperty]);
            console.log(tempProperty);
        }
        console.log(allProperty);
    }

    return (
        <div style={{ width: '100%', height: '110vh', backgroundColor: 'rgb(0, 0, 0, 20%)' }}>
            <Card className='mint-div'>
                <Typography variant="h6" color="rgb(255, 129, 0)">
                    CREAT NEW NFT
                </Typography>
                <Divider />
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        width: '80%',
                        position: 'absolute',
                        left: '13%',
                        top: '10vh'
                    }}>
                    <DriveFileRenameOutlineIcon
                        sx={{
                            color: 'action.active',
                            mr: 2,
                            my: 0.5
                        }} />
                    <TextField
                        id="nft-name"
                        label="NFT Name"
                        variant="standard"
                        sx={{ width: '85%' }}
                        onChange={handleNftNameChange}
                        value={nftName} />
                </Box>
                <div style={{
                    position: 'absolute',
                    left: '13%',
                    top: '20vh',
                    width: '75%'
                }}>
                    <FileUploader
                        multiple={false}
                        handleChange={handleFileUpload}
                        name="file"
                        types={uploadFileTypes}
                    />
                    <p
                        style={{
                            color: 'action.active',
                            marginTop: '1vh'
                        }}>
                        {primaryDataFile ?
                            `File name: ${primaryDataFile.name}` :
                            "No files uploaded yet"}
                    </p>
                </div>
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="standard"
                    sx={{
                        position: 'absolute',
                        width: '74%',
                        left: '13%',
                        top: '29vh'
                    }}
                    onChange={handleNftDescriptionChange}
                    value={nftDescription}
                />
                <TextField
                    id="trait-type"
                    label="Trait_Type"
                    variant="standard"
                    sx={{ position: 'absolute', left: '13%', top: '47vh', width: '23%' }}
                    onChange={handleTraitTypeChange}
                    value={traitType} />

                <TextField
                    id="trait-value"
                    label="Trait_Value"
                    variant="standard"
                    sx={{ position: 'absolute', left: '38%', top: '47vh', width: '23%' }}
                    onChange={handleTraitValueChange}
                    value={traitValue} />

                <TextField
                    id="display-type"
                    label="Display_Type"
                    variant="standard"
                    sx={{ position: 'absolute', left: '63%', top: '47vh', width: '23%' }}
                    onChange={handleDisplayTypeChange}
                    value={displayType} />

                <Button
                    variant='contained'
                    sx={{
                        position: 'absolute',
                        width: '74%',
                        left: '13%',
                        top: '57vh'
                    }}
                    onClick={handleAddProperty}
                >
                    <AddIcon sx={{ mr: 2 }} />
                    Add Property
                </Button>
                {allProperty.length > 0 ? (
                    <List
                        component="nav"
                        aria-label="main mailbox folders"
                        sx={{ position: 'absolute', left: '10%', top: '65vh', width: '77%', maxHeight: '17vh', overflowY: 'scroll' }}>
                        {allProperty.map((item: any, index: any) => {
                            return (
                                <ListItem key={index}>
                                    <Typography>
                                        Trait_Type: {item.trait_Type} /
                                        Trait_Value: {item.trait_Value} /
                                        Display_Type: {item.display_Type}
                                    </Typography>
                                </ListItem>)
                        })}
                    </List>
                ) : (<></>)}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        width: '80%',
                        position: 'absolute',
                        left: '13%',
                        top: '84vh'
                    }}>
                    <PriceChangeOutlinedIcon
                        sx={{
                            color: 'action.active',
                            mr: 2,
                            my: 0.5
                        }} />
                    <TextField
                        id="nft-royalty"
                        label="Royalty"
                        variant="standard"
                        sx={{ width: '85%' }}
                        onChange={handleNftRoyaltyChange}
                        value={nftRoyalty} />
                </Box>
                <Button variant="contained" color="secondary" sx={{ position: 'absolute', left: '73%', top: '95vh'}}> Mint NFT </Button>
            </Card>
        </div>
    );

}

export default MintNFT;