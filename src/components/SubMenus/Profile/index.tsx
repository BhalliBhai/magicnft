
import './index.scss'

import React, { useState, useEffect } from 'react';

// material ui components import
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// react-modules import
import { Animate } from 'react-move';
import { FileUploader } from 'react-drag-drop-files';

import axios from 'axios';
import { NFTStorage } from 'nft.storage';

// material ui icons import
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import TitleIcon from '@mui/icons-material/Title';
import ArticleIcon from '@mui/icons-material/Article';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';


const uploadPhotoTypes = ['JPG', 'PNG', 'GIF'];

const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM5MzIwNTBFODQwYzM4OWNGM2ZlRjRGQzFDODg1RTA4NTFlQ2NjMzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTQzOTcwNTI0NywibmFtZSI6Ik1hZ2ljTkZUeSJ9.XOg1e6ny5njX54-b8I3yrjQmoCGj4FQXj9wgy_oYk94';


const Profile = () => {

    const [uploadingNow, setUploadingNow] = useState(false);

    const [profileDatas, setProfileDatas] = useState<any>({
        name: 'Frank Castle',
        title: 'Travel Viggor',
        bio: 'Travelling to off beat destination. Buy my NFTs for exclusive content.',
        // coverPhoto: '/images/Antoni.png',
        coverPhoto: '',
        // profilePhoto: '/images/profileBack.png'
        profilePhoto: ''
    });

    const [showEditPage, setShowEditPage] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [profileBio, setProfileBio] = useState('');

    const [profilePhotoFile, setProfilePhotoFile] = useState<any>();
    const [uploadedProfilePhoto, setUploadedProfilePhoto] = useState('');

    const [coverPhotoFile, setCoverPhotoFile] = useState<any>();
    const [uploadedCoverPhoto, setUploadedCoverPhoto] = useState('');

    const handleProfileNameChange = (e: any) => {
        setProfileName(e.target.value);
    }

    const handleProfileTitleChange = (e: any) => {
        setProfileTitle(e.target.value);
    }

    const handleProfileBioChange = (e: any) => {
        setProfileBio(e.target.value);
    }

    const handleCoverPhotoUpload = (file: any) => {
        setCoverPhotoFile(file);

        uploadCoverPhoto(file, 'Cover', 'No Description');
    }

    const onSaveBtnPressed = async () => {

        const saveData = {
            email: localStorage.getItem('email'),
            name: profileName,
            photo: uploadedProfilePhoto,
            bio: profileBio,
            title: profileTitle,
            coverPhoto: uploadedCoverPhoto
        }

        const profileData = (await axios.post('/profile/saveprofile', saveData)).data;
        setProfileDatas({
            name: profileData.profileName,
            coverPhoto: profileData.coverPhoto,
            profilePhoto: profileData.profilePhoto,
            bio: profileData.profileBio,
            title: profileData.profileTitle
        });

        setShowEditPage(false);
    }

    const onCancelBtnPressed = () => {
        setShowEditPage(false);
    }

    const uploadCoverPhoto = async (uploadFile: any, photoName: any, photoDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: photoName,
                description: photoDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedCoverPhoto('https://ipfs.io/ipfs/' + pathname);
            console.log(uploadedCoverPhoto);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleProfilePhotoUpload = (file: any) => {
        setProfilePhotoFile(file);

        uploadProfilePhoto(file, 'Profile', 'No Description');
    }

    const uploadProfilePhoto = async (uploadFile: any, photoName: any, photoDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: photoName,
                description: photoDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedProfilePhoto('https://ipfs.io/ipfs/' + pathname);
            console.log(uploadedProfilePhoto);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    useEffect(() => {
        (async () => {
            const res = await axios.post('/profile/getprofile', {email: localStorage.getItem('email')});
            console.log(res);
            if (res.data) {
                console.log(res.data);
                setProfileDatas({
                    name: res.data.profileName,
                    coverPhoto: res.data.coverPhoto,
                    profilePhoto: res.data.profilePhoto,
                    bio: res.data.profileBio,
                    title: res.data.profileTitle
                });
            }

        })();
    }, []);

    return (
        <div className='' style={{ width: '100%', minHeight:'128vh', background: '#3F3F3F' }} >
            <Card className='left-div p-4' sx={{  position: 'absolute', left: (showEditPage? '4%' : '27.5%') , top: '5vh' }}>
                <div className='pview pb-3'>
                <img
                    className='cover-photo mb-5'
                    src={profileDatas.coverPhoto}
                     />
                <Avatar
                    className='profile-photo'
                    alt='Remy Sharp'
                    src={profileDatas.profilePhoto}
                />

                <div className="pview-name mt-5">
                    <h3 className="text-center text-white mb-0">{profileDatas.name}</h3>
                    <p className="text-center text-white mb-0">{profileDatas.title}</p>
                    <p className="text-center text-white">{profileDatas.bio}</p>
                </div>
                <div className="web-links px-4 mb-2">
                    <a className="btn btn-dark w-100 my-2" href="http://" target="_blank" rel="noopener noreferrer"><LinkIcon className='me-2' />Page 1 / Name</a>
                    <a className="btn btn-dark w-100 my-2" href="http://" target="_blank" rel="noopener noreferrer"><LinkIcon className='me-2' />Page 2 / Name</a>
                    <a className="btn btn-dark w-100 my-2" href="http://" target="_blank" rel="noopener noreferrer"><LinkIcon className='me-2' />Page 3 / Name</a>
                </div>
                        
                </div>
                <div className="text-end mt-4">
                    <Button onClick={() => setShowEditPage(true)} className="bg-dark text-white px-5">< EditIcon className='me-2' /> Edit</Button>
                </div>
            </Card>
            {showEditPage ?
                (
                    <Card className='right-div p-4' sx={{  position: 'absolute', top:'5vh' }}>
                        
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
                        <Box className='profile-name'>
                        {/* <FontDownloadIcon className='nameIcon' /><br /> */}
                            <p className='text-white fw-bold'>Name</p>
                            <Input
                                placeholder='Input your profile name'
                                onChange={handleProfileNameChange}
                                value={profileName}
                                error
                                className='input-style px-2 py-1'
                            />
                        </Box>
                        <>
                            <div className='profile-text'>Cover Photo (For Background)</div>
                            <FileUploader className="input-file"
                                multiple={false}
                                handleChange={handleProfilePhotoUpload}
                                name='file'
                                types={uploadPhotoTypes}  
                            />
                            <p className='profile-status'>
                                {profilePhotoFile ?
                                    `File name: ${profilePhotoFile.name}` :
                                    'No files uploaded yet'}
                            </p>
                        </>
                        <Box className='profile-title'>
                            {/* <TitleIcon className='titleIcon' /> */}
                            <p className='text-white fw-bold'>Title</p>
                            <Input className="input-style px-2 py-1"
                                placeholder='Input title Ex.Travel Vlogger'
                                onChange={handleProfileTitleChange}
                                value={profileTitle}
                                error
                                sx={{
                                    color: 'rgb(255, 255, 255)',
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <>
                            <div className='cover-text'>Profile Photo (Your Image)</div>
                            <FileUploader
                                multiple={false}
                                handleChange={handleCoverPhotoUpload}
                                name='file'
                                types={uploadPhotoTypes}
                                sx={{
                                    color: 'rgb(255, 255, 255)',
                                    width: '100%',
                                    backgroundColor:'#3F3F3F',

                                }}
                            />
                            <p className='cover-status'>
                                {coverPhotoFile ?
                                    `File name: ${coverPhotoFile.name}` :
                                    'No files uploaded yet'}
                            </p>
                        </>
                        <Box className='profile-bio'>
                            {/* <ArticleIcon className='bioIcon' /> */}
                            <p className='text-white fw-bold'>Bio</p>
                            <Input className="input-style px-2 py-1"
                                placeholder='Share your story with your community.... '
                                onChange={handleProfileBioChange}
                                value={profileBio}
                                multiline
                                rows={4}
                                error
                                sx={{
                                    color: 'rgb(255, 255, 255)',
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <div className=" d-flex justify-content-between">
                        <Button
                            className='btn btn-dark bg-dark px-5'
                            variant='contained'
                            startIcon={< PlaylistAddCheckIcon />}
                            onClick={onSaveBtnPressed}
                        >
                            Save
                        </Button>
                        <Button
                            className='btn btn-dark px-5'
                            variant='contained'
                            color='error'
                            startIcon={< CancelIcon />}
                            onClick={onCancelBtnPressed}
                        >
                            Cancel
                        </Button>
                        </div>
                        
                    </Card>
                )

                : (<></>)}
        </div>
    )
}

export default Profile;