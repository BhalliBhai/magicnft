import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { FileUploader } from "react-drag-drop-files";
import { NFTStorage } from 'nft.storage';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";

import Draggable from 'react-draggable'; // The default
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

//@ts-ignore

import { Resizable } from 'react-resizeable';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PublicIcon from '@mui/icons-material/Public';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TextIncreaseOutlinedIcon from '@mui/icons-material/TextIncreaseOutlined';
import VoiceChatOutlinedIcon from '@mui/icons-material/VoiceChatOutlined';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ForwardIcon from '@mui/icons-material/Forward';
import DeleteIcon from '@mui/icons-material/Delete';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';

import {
    InstagramOutlined,
    InstagramFilled,
    TwitterOutlined,
    LinkedinOutlined,
    LinkedinFilled,
    FacebookOutlined,
    FacebookFilled,
    GoogleOutlined,
    GoogleSquareFilled,

} from '@ant-design/icons';

import './index.css';
import { styled } from '@mui/material/styles';
import { SketchPicker } from 'react-color';


// import { Container, Draggable } from 'react-smooth-dnd';

// This is your APIKEY of the NFT storage. When you access NFT Storage, create new user and get new API KEY for save the datas

const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM5MzIwNTBFODQwYzM4OWNGM2ZlRjRGQzFDODg1RTA4NTFlQ2NjMzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTQzOTcwNTI0NywibmFtZSI6Ik1hZ2ljTkZUeSJ9.XOg1e6ny5njX54-b8I3yrjQmoCGj4FQXj9wgy_oYk94';

const uploadImageFileTypes = ["JPG", "PNG", "GIF"];

const uploadAudioFileTypes = ["mp3", "wav"];

const uploadVideoFileTypes = ["avi", "mp4", "wmv"];

const imageFitSolid = {
    width: '100%',
    height: '60vh',
    // position: 'absolute', 
    top: '5vh',
    left: '2.5%',
    backdropFilter: 'blur(0px)'
}

const imageFitBlurred = {
    width: '100%',
    height: '60vh',
    // position: 'absolute', 
    top: '5vh',
    left: '2.5%',
    backdropFilter: 'blur(100px)'
}


const add_Gallery_LinksModalStyle = {
    position: 'absolute' as 'absolute',
    top: '5vh',
    left: '32%',
    width: '37%',
    minHeight: '57vh',
    maxHeight: '90vh',
    bgcolor: 'rgba( 255, 255, 255, 70%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const add_Img_Audio_VideoModalStyle = {
    position: 'absolute' as 'absolute',
    top: '16vh',
    left: '32%',
    width: '37%',
    minHeight: '57vh',
    maxHeight: '90vh',
    bgcolor: 'rgba( 255, 255, 255, 70%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const add_Instant_ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '16vh',
    left: '32%',
    width: '37%',
    minHeight: '32vh',
    maxHeight: '37vh',
    bgcolor: 'rgba( 255, 255, 255, 70%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const add_Text_ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '16vh',
    left: '30%',
    width: '37%',
    minHeight: '40vh',
    maxHeight: '80vh',
    bgcolor: 'rgba( 255, 255, 255, 70%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const edit_Page_ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '16vh',
    left: '30%',
    width: '38.5%',
    minHeight: '40vh',
    maxHeight: '80vh',
    bgcolor: 'rgba( 255, 255, 255, 70%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const publish_Box_ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '30vh',
    left: '30%',
    width: '43%',
    minHeight: '25vh',
    maxHeight: '30vh',
    bgcolor: 'rgba( 0, 0, 0, 30%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const PublishHeader = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    position: 'absolute',
    top: '0.5vh',
    left: '45%',
    fontSize: '18px',
    color: 'rgb(255, 255, 255)'
}));


const UrlListItems = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgb(0, 0, 0)'
}));


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const PublicPage = () => {

    const [siteID, setSiteID] = useState('');
    const [pageStatus, setPageStatus] = useState('');
    const [showSelectSiteType, setShowSelectSiteType] = useState(false);
    const [publishUploadingNow, setPublishUploadingNow] = useState(false);

    const onPublishBtnPressed = () => {
        setShowSelectSiteType(true);
    }

    const onClosePublishPressed = () => {
        setShowSelectSiteType(false);
    }

    const onClickPublicBtn = async () => {
        console.log('Opend!');
        let publicSiteInfo = {
            siteUrl: window.location.search.split('=')[1],
            siteType: 'public',
            siteName: pageName,
            siteDescription: pageDescription,
            siteThumbnail: uploadedThumbImage,
            published: true
        }
        setPublishUploadingNow(true);
        await axios.post('/creatorsite/resetsite', publicSiteInfo);
        setPublishUploadingNow(false);
        handleSuccessPublishedClick();
        onClosePublishPressed();
    }

    const onClickPrivateBtn = async () => {
        let privateSiteInfo = {
            siteUrl: window.location.search.split('=')[1],
            siteType: 'private',
            siteName: pageName,
            siteDescription: pageDescription,
            siteThumbnail: uploadedThumbImage,
            published: true
        }
        setPublishUploadingNow(true);
        await axios.post('/creatorsite/resetsite', privateSiteInfo);
        setPublishUploadingNow(false);
        handleSuccessPublishedClick();
        onClosePublishPressed();
    }

    // ------------- To Show Success Notification -------------- //

    const [openSuccessNotification, setOpenSuccessNotification] = React.useState(false);
    const [openSuccessPublishedNotification, setOpenSuccessPublishedNotification] = React.useState(false);

    const handleSuccessClick = () => {
        setOpenSuccessNotification(true);
    };

    const handleSuccessClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessNotification(false);
    };


    const handleSuccessPublishedClick = () => {
        setOpenSuccessPublishedNotification(true);
    };

    const handleSuccessPublishedClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessPublishedNotification(false);
    };


    // ------------Variables and Functions for 'Add Tile Option'--------- //

    const [addBtnHandle, setAddBtnHandle] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [linksMenuValue, setLinksMenuValue] = React.useState(0);


    const onAddBtnPressed = () => {
        setAddBtnHandle(true);
    }

    const onBackBtnPressed = () => {
        setAddBtnHandle(false);
    }

    const linksMenuHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setLinksMenuValue(newValue);
    };

    // ------------Variables and Functions for 'Edit Page'--------------- //

    const [pageInfo, setPageInfo] = useState<any>();
    const [editPage, setEditPage] = useState(false);
    const [pageName, setPageName] = useState('Untitled Page');
    const [pageDescription, setPageDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState<any>('');
    const [uploadedThumbImage, setUploadedThumbImage] = useState('');

    const onEditPagePressed = () => {
        setEditPage(true);
    }

    const onCloseEditPressed = () => {
        setEditPage(false);
    }

    const handlePageNameChange = (e: any) => {
        setPageName(e.target.value);
    }

    const handlePageDescriptionChange = (e: any) => {
        setPageDescription(e.target.value);
    }
    
    const handleEditImage = (file: any) => {
        setThumbnailFile(file);
        console.log(file);

        uploadThumbImage(file, 'Thumbnail', 'No Description');
    }

    const uploadThumbImage = async (uploadFile: any, thumbName: any, thumbDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: thumbName,
                description: thumbDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedThumbImage('https://ipfs.io/ipfs/' + pathname);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onSaveEditPage = () => {
        let tempInfo = {
            name: pageName,
            description: pageDescription,
            thumbnail: uploadedThumbImage,
        }
        setPageInfo(tempInfo);
        onCloseEditPressed();
    }

    // ------------Variables and Functions for 'Add Text'--------------- //

    const [allTextData, setAllTextData] = useState<any>([]);
    const [addText, setAddText] = useState(false);
    const [textName, setTextName] = useState('');
    const [textUrl, setTextUrl] = useState('');
    const [textImageUploadedFile, setTextImageUploadedFile] = useState<any>();
    const [uploadedTextImage, setUploadedTextImage] = useState('');
    const [content, setContent] = useState('');

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        // 'blockquote',
        'list',
        'bullet',
        'indent',
        // 'link',
        // 'image',
        // 'video'
    ];

    const modules = {
        toolbar: [
            [{ header: '1' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['clean']
        ],
    };

    const onAddTextPressed = () => {
        setAddText(true);
    }

    const onCloseTextPressed = () => {
        setAddText(false);
    }

    const handleTextNameChange = (e: any) => {
        setTextName(e.target.value);
    }

    const handleTextUrlChange = (e: any) => {
        setTextUrl(e.target.value);
    }

    const handleTextImageUpload = (file: any) => {
        setTextImageUploadedFile(file);
        // console.log(file);

        uploadTextImageFile(file, 'TextImage', 'No Description');
    }

    const uploadTextImageFile = async (uploadFile: any, imgName: any, imgDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: imgName,
                description: imgDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedTextImage('https://ipfs.io/ipfs/' + pathname);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const changeHandler = (html: any) => {
        if (html.length > 20 * 1024) {
            return;
        }

        setContent(html);
    }


    const onTextDonePressed = async () => {
        let newTextData = {
            textName: textName,
            textImage: uploadedTextImage,
            textContent: content,
            textUrl: textUrl
        }

        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'text', tileValue: newTextData });

        let tempData = allTextData;
        tempData.push(newTextData);

        setAllTextData(tempData);
        console.log(allTextData);

        onCloseTextPressed();
    }

    const onTextDeletePressed = () => {
        setTextName('');
        setUploadedTextImage('');
        setContent('');
        setTextUrl('');
        onCloseTextPressed();
    }


    // ------------Variables and Functions for 'Add Instant Embed'--------------- //
    const [allInstantData, setAllInstantData] = useState<any>([]);
    const [addInstantEmbeds, setAddInstantEmbeds] = useState(false);
    const [instantTitle, setInstantTitle] = useState('');
    const [instantUrl, setInstantUrl] = useState('');

    const onAddInstantEmbedsPressed = () => {
        setAddInstantEmbeds(true);
    }

    const onCloseInstantEmbedsPressed = () => {
        setAddInstantEmbeds(false);
    }

    const handleInstantTitleChange = (e: any) => {
        setInstantTitle(e.target.value);
    }

    const handleInstantUrlChange = (e: any) => {
        setInstantUrl(e.target.value);
    }

    const onInstantEmbedsDonePressed = async () => {
        let newInstantData = {
            instantTitle: instantTitle,
            instantUrl: instantUrl
        }

        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'instantembeds', tileValue: newInstantData });
        let tempData = allInstantData;
        tempData.push(newInstantData);

        setInstantTitle('');
        setInstantUrl('');
        setAllInstantData(tempData);

        console.log(allInstantData);

        onCloseInstantEmbedsPressed();
    }

    const onInstantEmbedsDeletePressed = () => {
        setInstantTitle('');
        setInstantUrl('');

        onCloseInstantEmbedsPressed();
    }


    // ------------Variables and Functions for 'Add Links'--------------- //

    const [allLinksData, setAllLinksData] = useState<any>({ normal: [], social: {} });
    const [addLinks, setAddLinks] = useState(false);

    const [normalLinkName, setNormalLinkName] = useState('');
    const [normalLinkValue, setNormalLinkValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [instagramValue, setInstagramValue] = useState('');
    const [twitterValue, setTwitterValue] = useState('');
    const [linkedinValue, setLinkedinValue] = useState('');
    const [facebookValue, setFacebookValue] = useState('');

    const onAddLinksPressed = () => {
        setAddLinks(true);
    }

    const onCloseLinksPressed = () => {
        setAddLinks(false);
    }

    const handleLinkNameChange = (e: any) => {
        setNormalLinkName(e.target.value);
    }

    const handleLinkValueChange = (e: any) => {
        setNormalLinkValue(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        setEmailValue(e.target.value);
    }

    const handleInstagramChange = (e: any) => {
        setInstagramValue(e.target.value);
    }

    const handleTwitterChange = (e: any) => {
        setTwitterValue(e.target.value);
    }

    const handleLinkedinChange = (e: any) => {
        setLinkedinValue(e.target.value);
    }

    const handleFacebookChange = (e: any) => {
        setFacebookValue(e.target.value);
    }

    const onLinksDonePressed = async () => {

        let normalLinksData = [];
        if (allLinksData.normal) {
            normalLinksData = allLinksData.normal;
            normalLinksData.push({
                linkName: normalLinkName,
                linkUrl: normalLinkValue
            });
        }
        else {
            normalLinksData.push({
                linkName: normalLinkName,
                linkUrl: normalLinkValue
            });
        }

        let socialLinksData = {
            email: emailValue,
            instagram: instagramValue,
            twitter: twitterValue,
            linkedin: linkedinValue,
            facebook: facebookValue
        };


        let tempLinksData = {
            normal: normalLinksData,
            social: socialLinksData
        };

        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'links', tileValue: tempLinksData });

        setAllLinksData(tempLinksData);

        setNormalLinkName('');
        setNormalLinkValue('');

        onCloseLinksPressed();
    }

    const onLinksDeletePressed = () => {
        setNormalLinkName('');
        setNormalLinkValue('');
        setEmailValue('');
        setInstagramValue('');
        setTwitterValue('');
        setLinkedinValue('');
        setFacebookValue('');

        onCloseLinksPressed();
    }

    // ------------Variables and Functions for 'Add Video'--------------- //

    const [allVideoData, setAllVideoData] = useState<any>([]); // array data of uploaded images.
    const [addVideo, setAddVideo] = useState<boolean>(false);
    const [videoUploadedFile, setVideoUploadedFile] = useState<any>();
    const [uploadedVideo, setUploadedVideo] = useState('');
    const [videoName, setVideoName] = useState('');
    const [showOptionalVideoDescription, setShowOptionalVideoDescription] = React.useState(true);
    const [optionalVideoDescription, setOptionalVideoDescription] = useState('');

    const onAddVideoPressed = () => {
        setAddVideo(true);
    }

    const onCloseVideoPressed = () => {
        setAddVideo(false);
    }

    const handleVideoUpload = (file: any) => {
        setVideoUploadedFile(file);
        uploadVideoFile(file, 'Videos', 'No Description');
    }

    const handleVideoNameChange = (e: any) => {
        setVideoName(e.target.value);
    }

    const onOptionalVideoDescriptionChange = (event: any) => {
        setShowOptionalVideoDescription(event.target.checked);
    }

    const handleOptionalVideoDescriptionChange = (e: any) => {
        setOptionalVideoDescription(e.target.value);
    }


    const uploadVideoFile = async (uploadFile: any, videoName: any, videoDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: videoName,
                description: videoDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedVideo('https://ipfs.io/ipfs/' + pathname);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onVideoDeletePressed = () => {
        setVideoName('');
        setVideoUploadedFile('');
        setOptionalVideoDescription('');

        onCloseVideoPressed();
    }

    const onVideoDonePressed = async () => {

        let newVideoData = {
            videoName: videoName,
            videoUrl: uploadedVideo,
            optionalDescription: optionalVideoDescription
        }

        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'video', tileValue: newVideoData });

        let tempData = allVideoData;
        tempData.push(newVideoData);

        setAllVideoData(tempData);

        setVideoName('');
        setVideoUploadedFile('');
        setOptionalVideoDescription('');

        console.log(allVideoData);

        onCloseVideoPressed();
    }


    // ------------Variables and Functions for 'Add Audio'--------------- //

    const [allAudioData, setAllAudioData] = useState<any>([]); // array data of uploaded images.
    const [addAudio, setAddAudio] = useState<boolean>(false);
    const [audioUploadedFile, setAudioUploadedFile] = useState<any>();
    const [uploadedAudio, setUploadedAudio] = useState('');
    const [audioName, setAudioName] = useState('');
    const [showOptionalAudioDescription, setShowOptionalAudioDescription] = React.useState(true);
    const [optionalAudioDescription, setOptionalAudioDescription] = useState('');

    const onAddAudioPressed = () => {
        setAddAudio(true);
    }

    const onCloseAudioPressed = () => {
        setAddAudio(false);
    }

    const handleAudioUpload = (file: any) => {
        setAudioUploadedFile(file);
        // console.log(file);

        uploadAudioFile(file, 'Audios', 'No Description');
    }

    const handleAudioNameChange = (e: any) => {
        setAudioName(e.target.value);
    }

    const onOptionalAudioDescriptionChange = (event: any) => {
        setShowOptionalAudioDescription(event.target.checked);
    }

    const handleOptionalAudioDescriptionChange = (e: any) => {
        setOptionalAudioDescription(e.target.value);
    }

    const uploadAudioFile = async (uploadFile: any, audioName: any, audioDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: audioName,
                description: audioDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setUploadedAudio('https://ipfs.io/ipfs/' + pathname);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onAudioDeletePressed = () => {
        setAudioName('');
        setAudioUploadedFile('');
        setOptionalAudioDescription('');

        onCloseAudioPressed();
    }

    const onAudioDonePressed = async () => {

        let newAudioData = {
            audioName: audioName,
            audioUrl: uploadedAudio,
            optionalDescription: optionalAudioDescription
        }


        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'audio', tileValue: newAudioData });


        let tempData = allAudioData;
        tempData.push(newAudioData);

        setAllAudioData(tempData);

        setAudioName('');
        setAudioUploadedFile('');
        setOptionalAudioDescription('');

        console.log(allAudioData);

        onCloseAudioPressed();
    }

    // ------------Variables and Functions for 'Add Image'--------------- //

    const [allOneImageData, setAllOneImageData] = useState<any>([]); // array data of uploaded images.
    const [addImage, setAddImage] = useState<boolean>(false);
    const [oneImageUploadedFile, setOneImageUploadedFile] = useState<any>();
    const [oneUploadedImage, setOneUploadedImage] = useState('');
    const [oneImageName, setOneImageName] = useState('');
    const [optionalLinkUrl, setOptionalLinkUrl] = useState('');
    

    const onAddImagePressed = () => {
        setAddImage(true);
    }

    const onCloseImagePressed = () => {
        setAddImage(false);
    }

    const handleOneImageUpload = (file: any) => {
        setOneImageUploadedFile(file);
        // console.log(file);

        uploadOneImageFile(file, 'OneImage', 'No Description');
    }

    const handleOneImageNameChange = (e: any) => {
        setOneImageName(e.target.value);
    }

    const handleOptionalLinkChange = (e: any) => {
        setOptionalLinkUrl(e.target.value);
    }

    const uploadOneImageFile = async (uploadFile: any, imgName: any, imgDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: imgName,
                description: imgDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            setOneUploadedImage('https://ipfs.io/ipfs/' + pathname);
            console.log(oneUploadedImage);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onImageDeletePressed = () => {
        setOneImageName('');
        setOneImageUploadedFile('');
        setOptionalLinkUrl('');

        onCloseImagePressed();
    }

    const onImageDonePressed = async () => {

        let newImageData = {
            imageName: oneImageName,
            imageUrl: oneUploadedImage,
            optionalUrl: optionalLinkUrl
        }

        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'image', tileValue: newImageData });

        let tempData = allOneImageData;
        tempData.push(newImageData);

        setAllOneImageData(tempData);

        setOneImageName('');
        setOneImageUploadedFile('');
        setOptionalLinkUrl('');

        onCloseImagePressed();
    }



    // ------------Variables and Functions for 'Add Gallery'--------------- //

    const [allGalleryData, setAllGalleryData] = useState<any>([]);
    const [addGallery, setAddGallery] = useState<boolean>(false);
    const [galleryMenuValue, setGalleryMenuValue] = React.useState(0);
    const [imageFitValue, setImageFitValue] = React.useState('');
    const [slideTimeValue, setSlideTimeValue] = React.useState('');
    const [autoPlayValue, setAutoPlayValue] = React.useState(true);
    const [showOptionalLink, setShowOptionalLink] = React.useState(true);
    const [uploadedFile, setUploadedFile] = useState();
    const [uploadBtnEnable, setUploadBtnEnable] = useState<boolean>(false);
    const [galleryImageAvatar, setGalleryImageAvatar] = useState<any>([]);
    const [uploadingNow, setUploadingNow] = useState(false);
    const [galleryImageName, setGalleryImageName] = useState('');
    const [galleryImageDescription, setGalleryImageDescription] = useState('');
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const [backColor, setBackColor] = useState('#FF0000');
    const [opaBackColor, setOpaBackColor] = useState('');
    const [galleryName, setGalleryName] = useState('');
    const [navActionValue, setNavActionValue] = useState(0);

    const onAddGalleryPressed = () => {
        setAddGallery(true);
    }

    const onCloseGalleryPressed = () => {
        setAddGallery(false);
    }

    const galleryHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setGalleryMenuValue(newValue);
    };

    const imageFitHandleChange = (event: SelectChangeEvent) => {
        setImageFitValue(event.target.value);
    };

    const slideTimeHandleChange = (event: SelectChangeEvent) => {
        setSlideTimeValue(event.target.value);
    };

    const onAutoPlayChange = (event: any) => {
        setAutoPlayValue(event.target.checked);
    }

    const onOptionalLinkChange = (event: any) => {
        setShowOptionalLink(event.target.checked);
    }

    const handleFileUpload = (event: any) => {
        setUploadedFile(event.target.files[0]);
        setUploadBtnEnable(true);
    }

    const uploadFileContent = async (uploadFile: any, imgName: any, imgDescription: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: imgName,
                description: imgDescription,
                image: uploadFile
            });
            setUploadingNow(false);
            const pathname = metadata.data.image.pathname.split('//')[1];
            let tempAvatars = galleryImageAvatar;
            const newAvatar = {
                url: 'https://ipfs.io/ipfs/' + pathname,
                name: metadata.data.name,
                description: metadata.data.description
            };
            tempAvatars.push(newAvatar);
            setGalleryImageAvatar(tempAvatars);
            console.log(galleryImageAvatar);
        } catch (error) {
            console.log(error);
        }
    }

    const onDelteImageButton = (index: any) => {
        let tempData = galleryImageAvatar;
        let removed = tempData.splice(index, 1);
        setGalleryImageAvatar([...tempData]);
    }

    const onGalleryImageNameChange = (e: any) => {
        setGalleryImageName(e.target.value);
    }

    const onGalleryImageDescriptionChange = (e: any) => {
        setGalleryImageDescription(e.target.value);
    }

    const onColorPickerPressed = () => {
        setDisplayColorPicker(!displayColorPicker);
    }

    const handleBackColorChange = (color: any) => {
        setBackColor(color.hex);
        // console.log(color.hex);
        setOpaBackColor(color.rgb.a);
    }

    const handleEditBackColorChange = (e: any) => {
        setBackColor(e.target.value);
        // console.log(e.target.value);
    }

    const handleGalleryNameChange = (e: any) => {
        setGalleryName(e.target.value);
    }

    const onGalleryDonePressed = async () => {
        let newGalleryData = {
            uploadedImages: galleryImageAvatar,
            galleryName: galleryName,
            galleryImageFit: imageFitValue,
            galleryBackgrond: backColor,
            galleryFlowTime: slideTimeValue
        };

        await axios.post('/tiles/createtile', { siteId: siteID, tileType: 'gallery', tileValue: newGalleryData });

        let tempAllGalleryData = allGalleryData;
        tempAllGalleryData.push(newGalleryData);
        setAllGalleryData(tempAllGalleryData);

        setGalleryImageAvatar([]);
        setGalleryName('');
        setImageFitValue('');
        setBackColor('#FF0000');
        setSlideTimeValue('');

        onCloseGalleryPressed();
    }

    const onGalleryDeletePressed = () => {
        setGalleryImageAvatar([]);
        setGalleryName('');
        setImageFitValue('');
        setBackColor('#FF0000');
        setSlideTimeValue('');

        onCloseGalleryPressed();
    }

/////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        (async () => {
            const res = await axios.get('/creatorsite/siteinfo');
            console.log(res);
            const siteData = res.data.filter(
                (item: any) => item.siteUrl === window.location.search.split('=')[1]
            );
            setSiteID(siteData[0]._id);
            if (siteData[0].published === true) {
                setPageDescription(siteData[0].siteDescription);
                setUploadedThumbImage(siteData[0].siteThumbnail);
                setPageName(siteData[0].siteName);
                setPageStatus(siteData[0].siteType);
            }
            else if (siteData[0].published === false) {
                setPageStatus('Draft');
            }

            const tilesData = (await axios.post('/tiles/tilesinfo', { siteId: siteData[0]._id })).data;
            const imageTiles = tilesData.filter(
                (item: any) => item.tileType === 'image'
            );
            setAllOneImageData(imageTiles.map((item: any) => {
                return item.tileValue;
            }));

            const audioTiles = tilesData.filter(
                (item: any) => item.tileType === 'audio'
            );
            setAllAudioData(audioTiles.map((item: any) => {
                return item.tileValue;
            }));

            const videoTiles = tilesData.filter(
                (item: any) => item.tileType === 'video'
            );
            setAllVideoData(videoTiles.map((item: any) => {
                return item.tileValue;
            }));

            const galleryTiles = tilesData.filter(
                (item: any) => item.tileType === 'gallery'
            );
            setAllGalleryData(galleryTiles.map((item: any) => {
                return item.tileValue;
            }));

            const instantEmbesTiles = tilesData.filter(
                (item: any) => item.tileType === 'instantembeds'
            );
            setAllInstantData(instantEmbesTiles.map((item: any) => {
                return item.tileValue;
            }));
            
            const textTiles = tilesData.filter(
                (item: any) => item.tileType === 'text'
            );
            setAllTextData(textTiles.map((item: any) => {
                return item.tileValue;
            }));

            const linkTiles = tilesData.filter(
                (item: any) => item.tileType === 'links'
            );
            setAllLinksData(linkTiles[0].tileValue);
        })();
    }, []);


    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

    return (
        <div className="mainBackground" id="mainBack">
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={publishUploadingNow}
            >
                <CircularProgress
                    color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSuccessNotification}
                autoHideDuration={4000}
                onClose={handleSuccessClose}
                message="Note archived"
            >
                <Alert
                    severity="success"
                    onClose={handleSuccessClose}>
                    Site url <strong>copied to clipboard successfully!</strong>
                </Alert>
            </Snackbar>

            <Snackbar
                open={openSuccessPublishedNotification}
                autoHideDuration={4000}
                onClose={handleSuccessPublishedClose}
                message="Note archived"
            >
                <Alert
                    severity="success"
                    onClose={handleSuccessPublishedClose}>
                    Your page successfully <strong>published!</strong>
                </Alert>
            </Snackbar>

            <div className='publishPanel'>
                <PublishHeader>
                    {pageInfo ? pageInfo.name : pageName}
                    <span style={{ fontSize: '14px' }}> ({pageStatus}) </span>
                </PublishHeader>

                <Button style={{
                    position: 'absolute',
                    left: '5%',
                    color: 'rgb(255, 255, 255)'
                }}
                    onClick={onBackBtnPressed}>
                    Exit
                </Button>
                <Button style={{
                    position: 'absolute',
                    left: '90%',
                    color: 'rgb(255, 255, 255)'
                }}
                    onClick={onPublishBtnPressed}>
                    Publish
                </Button>

            </div>
            {/* ====================================== To Show Text Windows ======================== */}

            {allTextData?.length > 0 ?
                (
                    allTextData.map((textItem: any, textIndex: any) => {
                        return (
                            <Draggable
                                onStop={() => setSelectedItem(textIndex)}
                                onDrag={() => setSelectedItem(textIndex)}>
                                <Card
                                    key={textIndex}
                                    className={`${textIndex == selectedItem && 'forDrag'}`}
                                    style={{
                                        position: 'absolute',
                                        width: '30%',
                                        height: '73vh',
                                        left: `${10 + 30 * textIndex}%`,
                                        top: `${20 + 20 * textIndex}vh`
                                    }}
                                >

                                    <img
                                        src={textItem.textImage}
                                        style={{
                                            width: '92%',
                                            height: '30vh',
                                            position: 'absolute',
                                            top: '3vh',
                                            left: '4%'
                                        }} />
                                    <a
                                        target="_blank"
                                        style={{
                                            position: 'absolute',
                                            left: '7%',
                                            top: '28vh',
                                            maxWidth: '90%',
                                            color: 'rgb(255, 255, 255)'
                                        }}
                                        href={textItem.textUrl}>
                                        {textItem.textUrl}
                                    </a>
                                    <div
                                        style={{
                                            border: '1px',
                                            position: 'absolute',
                                            left: '5%',
                                            top: '35vh',
                                            color: 'rgb(255, 128, 128)',
                                            fontSize: '19px',
                                            fontFamily: 'Corbel'
                                        }}>
                                        {textItem.textName}
                                    </div>
                                    <div
                                        className="blog-detail"
                                        dangerouslySetInnerHTML={{ __html: textItem.textContent }}
                                        style={{
                                            position: 'absolute',
                                            top: '42vh',
                                            width: '92%',
                                            minHeight: '29vh',
                                            maxHeight: '30vh',
                                            overflowY: 'scroll',
                                            left: '4%'
                                        }} />
                                </Card>
                            </Draggable>)
                    }))
                : (<></>)
            }

            {/* ====================================== To Show Instant Embed Windows ======================== */}

            {allInstantData.length > 0 ?
                (
                    allInstantData.map((instantItem: any, instantIndex: any) => {
                        return (
                            <Draggable
                                onStop={() => setSelectedItem(100 + instantIndex)}
                                onDrag={() => setSelectedItem(100 + instantIndex)}
                            >
                                <Card
                                    key={instantIndex + 100}
                                    className={`${selectedItem == (100 + instantIndex) && 'forDrag'}`}
                                    style={{
                                        position: 'absolute',
                                        width: '32%',
                                        height: '65vh',
                                        left: `${10 + 30 * instantIndex}%`,
                                        top: `${20 + 20 * instantIndex}vh`,
                                    }} >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '2%',
                                            top: '0.5vh',
                                            display: 'flex',
                                            width: '100%'
                                        }}>
                                        <ShareOutlinedIcon />
                                        <h6
                                            style={{
                                                position: 'absolute',
                                                left: '30%'
                                            }}>
                                            {instantItem.instantTitle}
                                        </h6>
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '95%',
                                            height: '60vh',
                                            left: '2.5%',
                                            top: '5vh'
                                        }}>
                                        <iframe
                                            src={instantItem.instantUrl}
                                            title={instantItem.instantTitle}
                                            width="100%"
                                            height="100%" />
                                    </div>
                                </Card>
                            </Draggable>
                        )
                    }
                    ))

                : (<></>)
            }


            {/* ====================================== To Show Links Windows ======================== */}
            {allLinksData.normal.length > 0 ? (
                <Draggable
                    onStop={() => setSelectedItem(200)}
                    onDrag={() => setSelectedItem(200)}
                >
                    {/* < Resizable height = { } */}
                    <Card
                        className={`${selectedItem == 200 && 'forDrag'}`}
                        style={{
                            position: 'absolute',
                            width: '21%',
                            minHeight: '20vh',
                            maxHeight: '60vh',
                            left: '40%',
                            top: '30%'
                        }}>
                        <List
                            sx={{
                                width: '100%',
                                maxHeight: '50vh',
                                bgcolor: 'background.paper',
                                overflowY: 'scroll'
                            }}>
                            {allLinksData.normal.map((linkItem: any, linkIndex: any) => {
                                return (
                                    <ListItem>
                                        <HtmlTooltip title={<React.Fragment>
                                            Connect to <em>{linkItem.linkUrl}</em>.
                                        </React.Fragment>}>
                                            <a
                                                target="_blank"
                                                href={linkItem.linkUrl}>
                                                <UrlListItems>{linkItem.linkName}</UrlListItems>
                                            </a>
                                        </HtmlTooltip>
                                    </ListItem>)
                            })}
                        </List>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    Connect to
                                    <em>
                                        {allLinksData.social.email}
                                    </em>.
                                </React.Fragment>}>
                            <Button
                                target="_blank"
                                href={allLinksData.social.email} >
                                <GoogleSquareFilled
                                    style={{
                                        color: 'action.active',
                                        fontSize: '22px'
                                    }} />
                            </Button>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    Connect to
                                    <em>
                                        {allLinksData.social.facebook}
                                    </em>.
                                </React.Fragment>}>
                            <Button
                                target="_blank"
                                href={allLinksData.social.facebook} >
                                <FacebookFilled
                                    style={{
                                        color: 'action.active',
                                        fontSize: '22px'
                                    }} />
                            </Button>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    Connect to
                                    <em>
                                        {allLinksData.social.twitter}
                                    </em>.
                                </React.Fragment>}>
                            <Button
                                target="_blank"
                                href={allLinksData.social.twitter} >
                                <TwitterOutlined
                                    style={{
                                        color: 'action.active',
                                        fontSize: '22px'
                                    }} />
                            </Button>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    Connect to
                                    <em>
                                        {allLinksData.social.instagram}
                                    </em>.
                                </React.Fragment>}>
                            <Button
                                target="_blank"
                                href={allLinksData.social.instagram} >
                                <InstagramFilled
                                    style={{
                                        color: 'action.active',
                                        fontSize: '22px'
                                    }} />
                            </Button>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    Connect to
                                    <em>
                                        {allLinksData.social.linkedin}
                                    </em>.
                                </React.Fragment>}>
                            <Button
                                target="_blank"
                                href={allLinksData.social.linkedin} >
                                <LinkedinFilled
                                    style={{
                                        color: 'action.active',
                                        fontSize: '22px'
                                    }} />
                            </Button>
                        </HtmlTooltip>
                    </Card>
                </Draggable>
            ) : (<></>)
            }

            {/* ====================================== To Show Gallery Windows ======================== */}

            {allGalleryData?.length > 0 ?
                (
                    allGalleryData.map((galleryItem: any, galleryIndex: any) => {
                        return (
                            <Draggable
                                onStop={() => setSelectedItem(galleryIndex + 300)}
                                onDrag={() => setSelectedItem(galleryIndex + 300)}
                            >

                                <Card key={galleryIndex + 300}
                                    className={`${(galleryIndex + 300) == selectedItem && 'forDrag'}`}
                                    style={{
                                        position: 'absolute',
                                        width: '32%',
                                        height: '67vh',
                                        left: `${10 + 30 * galleryIndex}%`,
                                        top: `${20 + 20 * galleryIndex}vh`
                                    }}>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '2%',
                                            top: '0.5vh',
                                            display: 'flex',
                                            width: '100%'
                                        }}>
                                        <CollectionsOutlinedIcon />
                                        <h6
                                            style={{
                                                position: 'absolute',
                                                left: '40%'
                                            }}>
                                            {galleryItem.galleryName}
                                        </h6>
                                    </div>
                                    {galleryItem.uploadedImages?.length > 0 ?
                                        (<div
                                            id={"demo" + galleryIndex}
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                            style={{
                                                position: 'absolute',
                                                width: '95%',
                                                height: '60vh'
                                            }}>

                                            <div
                                                className="carousel-indicators"
                                                style={{
                                                    position: 'absolute',
                                                    left: '10%'
                                                }}>
                                                {galleryItem.uploadedImages.map((
                                                    imageItem: any, imageIndex: any) => {
                                                    return (<button
                                                        type="button"
                                                        data-bs-target={"#demo" + galleryIndex}
                                                        data-bs-slide-to={"" + imageIndex}
                                                        className={
                                                            imageIndex === 0 ? "active" : ""
                                                        }>
                                                    </button>)
                                                })}
                                            </div>

                                            {/* <div className="carousel-inner" style={ galleryItem.galleryImageFit === 'Solid' ? {...imageFitSolid, position: 'absolute', backgroundColor: `${galleryItem.galleryBackgrond}`} : {...imageFitBlurred, position: 'absolute', backgroundColor: `${galleryItem.galleryBackgrond}`} }> */}
                                            <div
                                                className="carousel-inner"
                                                style={{
                                                    backgroundColor: `${galleryItem.galleryBackgrond}`,
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '60vh',
                                                    top: '5vh',
                                                    left: '2.5%'
                                                }}>

                                                {galleryItem.uploadedImages.map((
                                                    imageItem: any, imageIndex: any) => {
                                                    return (
                                                        <div
                                                            className={
                                                                imageIndex === 0 ?
                                                                    "carousel-item active" :
                                                                    "carousel-item"
                                                            }
                                                            data-bs-interval={
                                                                galleryItem.galleryFlowTime === '' ?
                                                                    false :
                                                                    galleryItem.galleryFlowTime * 1000
                                                            }>

                                                            <img
                                                                src={imageItem.url}
                                                                alt={imageItem.name}
                                                                className="d-block"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '60vh'
                                                                }}
                                                            />
                                                            <div
                                                                className="carousel-caption"
                                                                style={{
                                                                    position: 'absolute',
                                                                    left: '12%',
                                                                    top: '20vh'
                                                                }}>
                                                                <h3
                                                                    style={{
                                                                        color: 'rgb(255, 255, 255)'
                                                                    }} >
                                                                    {imageItem.name}
                                                                </h3>
                                                                <p>
                                                                    {imageItem.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>

                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target={"#demo" + galleryIndex}
                                                data-bs-slide="prev"
                                                style={{
                                                    position: 'absolute',
                                                    left: '5%'
                                                }}>
                                                <span
                                                    className="carousel-control-prev-icon">
                                                </span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target={"#demo" + galleryIndex}
                                                data-bs-slide="next"
                                                style={{
                                                    position: 'absolute',
                                                    right: '0%'
                                                }}>
                                                <span
                                                    className="carousel-control-next-icon">

                                                </span>
                                            </button>
                                        </div>)
                                        : (<></>)
                                    }
                                </Card>
                            </Draggable>)
                    })
                )
                : (<></>)}

            {/* ====================================== To Show Image Windows ======================== */}

            {allOneImageData?.length > 0 ?
                (
                    allOneImageData.map((imageItem: any, imageIndex: any) => {
                        return (
                            <Draggable
                                onStop={() => setSelectedItem(imageIndex + 400)}
                                onDrag={() => setSelectedItem(imageIndex + 400)}>
                                <Card
                                    key={imageIndex + 400}
                                    className={`${(imageIndex + 400) == selectedItem && 'forDrag'}`}
                                    style={{
                                        position: 'absolute',
                                        width: '32%',
                                        height: '67vh',
                                        left: `${10 + 30 * imageIndex}%`, top: `${20 + 20 * imageIndex}vh`
                                    }}

                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '2%',
                                            top: '0.5vh',
                                            display: 'flex',
                                            width: '100%'
                                        }}>
                                        <ImageOutlinedIcon />
                                        <h6
                                            style={{
                                                position: 'absolute',
                                                left: '35%'
                                            }}>
                                            {imageItem.imageName}
                                        </h6>
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '95%',
                                            height: '60vh',
                                            left: '2.5%',
                                            top: '5vh'
                                        }}>
                                        <img
                                            src={imageItem.imageUrl}
                                            alt={imageItem.imageName}
                                            style={{
                                                width: '100%',
                                                height: '60vh'
                                            }} />
                                        <a
                                            target="_blank"
                                            style={{
                                                position: 'absolute',
                                                left: '5%',
                                                bottom: '5vh',
                                                maxWidth: '90%',
                                                color: 'rgb(255, 255, 255)'
                                            }}
                                            href={imageItem.optionalUrl}>
                                            {imageItem.optionalUrl}
                                        </a>
                                    </div>
                                </Card>
                            </Draggable>
                        )
                    }
                    ))

                : (<></>)
            }

            {/* ====================================== To Show Audio Windows ======================== */}

            {allAudioData?.length > 0 ?
                (
                    allAudioData.map((audioItem: any, audioIndex: any) => {
                        return (
                            <Draggable
                                onStop={() => setSelectedItem(audioIndex + 500)}
                                onDrag={() => setSelectedItem(audioIndex + 500)}
                            >

                                <Card
                                    key={audioIndex + 500}
                                    className={`${(audioIndex + 500) == selectedItem && 'forDrag'}`}
                                    style={{
                                        position: 'absolute',
                                        width: '32%',
                                        height: '18vh',
                                        left: `${10 + 30 * audioIndex}%`,
                                        top: `${20 + 20 * audioIndex}vh`
                                    }}>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '2%',
                                            top: '0.5vh',
                                            display: 'flex',
                                            width: '100%'
                                        }}>
                                        <AudioFileOutlinedIcon />
                                        <h6
                                            style={{
                                                position: 'absolute',
                                                left: '30%'
                                            }}>
                                            {audioItem.audioName}
                                        </h6>
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '95%',
                                            height: '15vh',
                                            left: '2.5%',
                                            top: '5vh'
                                        }}>
                                        {audioItem.optionalDescription !== '' ?
                                            (<HtmlTooltip
                                                title={<React.Fragment>
                                                    <Typography
                                                        color="inherit">
                                                        Detail Description
                                                    </Typography>
                                                    {audioItem.optionalDescription}
                                                </React.Fragment>}>
                                                <img
                                                    src="/images/AudioPicture.png"
                                                    style={{
                                                        width: '15%',
                                                        height: '10vh',
                                                        borderRadius: '5px',
                                                        position: 'absolute',
                                                        top: '1vh',
                                                        cursor: 'pointer'
                                                    }} />
                                            </HtmlTooltip>)
                                            : (<img
                                                src="/images/AudioPicture.png"
                                                style={{
                                                    width: '15%',
                                                    height: '10vh',
                                                    borderRadius: '5px',
                                                    position: 'absolute',
                                                    top: '1vh'
                                                }} />)}
                                        <ReactAudioPlayer
                                            src={audioItem.audioUrl}
                                            controls
                                            style={{
                                                width: '82%',
                                                position: 'absolute',
                                                top: '2vh',
                                                left: '18%'
                                            }} />
                                    </div>
                                </Card>
                            </Draggable>
                        )
                    }
                    ))

                : (<></>)
            }

            {/* ====================================== To Show Video Windows ======================== */}

            {allVideoData?.length > 0 ?
                (
                    allVideoData.map((videoItem: any, videoIndex: any) => {
                        return (
                            <Draggable
                                onStop={() => setSelectedItem(videoIndex + 600)}
                                onDrag={() => setSelectedItem(videoIndex + 600)}
                            >

                                <Card
                                    key={videoIndex + 600}
                                    className={`${(videoIndex + 600) == selectedItem && 'forDrag'}`}
                                    style={{
                                        position: 'absolute',
                                        width: '50%',
                                        minHeight: '57vh',
                                        left: `${10 + 30 * videoIndex}%`,
                                        top: `${20 + 20 * videoIndex}vh`
                                    }}>
                                    <div style={{ position: 'absolute', left: '2%', top: '0.5vh', display: 'flex', width: '100%' }}>
                                        <VoiceChatOutlinedIcon />
                                        <h6 style={{ position: 'absolute', left: '40%' }}> {videoItem.videoName} </h6>
                                    </div>
                                    <div style={{ position: 'absolute', width: '95%', height: '60vh', left: '2.5%', top: '5vh' }}>
                                        <ReactPlayer
                                            url={videoItem.videoUrl}
                                            className="react-player"
                                            width="100%"
                                            controls={true}
                                        />
                                    </div>
                                </Card>
                            </Draggable>
                        )
                    }
                    ))

                : (<></>)
            }

            {/* ===================== To Show Edit Page Panel ================================= */}

            <Modal
                open={editPage}
                onClose={onCloseEditPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={edit_Page_ModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        Edit Page
                        <Fab
                            sx={{ width: '50%', ml: 20 }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onSaveEditPage}
                        >
                            <DoneIcon
                                sx={{ mr: 1 }} />
                            Save
                        </Fab>

                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
                        <Backdrop
                            sx={{
                                color: '#fff',
                                zIndex: (theme) => theme.zIndex.drawer + 1
                            }}
                            open={uploadingNow}
                        >
                            <CircularProgress
                                color="inherit" />
                        </Backdrop>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                width: '98%',
                                mb: 3
                            }}>
                            <DriveFileRenameOutlineIcon
                                sx={{
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="page-name"
                                label="Name"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handlePageNameChange}
                                value={pageName} />
                        </Box>
                        <Card
                            style={{
                                marginBottom: '3vh',
                                textIndent: '2%'
                            }}>
                            <strong>URL: </strong>
                            {window.location.pathname + window.location.search}
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        window.location.pathname + window.location.search);
                                    handleSuccessClick();
                                }}>
                                <ContentCopyIcon />
                            </Button>
                        </Card>
                        <FileUploader
                            multiple={false}
                            handleChange={handleEditImage}
                            name="file"
                            types={uploadImageFileTypes}
                        />
                        <p
                            style={{
                                color: 'action.active',
                                marginTop: '1vh'
                            }}>
                            {thumbnailFile ?
                                `File name: ${thumbnailFile.name}` :
                                "No files uploaded yet"}
                        </p>
                        <TextField
                            id="standard-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            defaultValue="" 
                            variant="standard"
                            sx={{ width: '98%' }}
                            onChange={handlePageDescriptionChange}
                            value={pageDescription}
                        />
                    </Typography>
                </Box>
            </Modal>



            {/* ===================== To Show Bottom Navigation 'Add Tile' Bar ================ */}

            {
                addBtnHandle ? (
                    <>
                        <Box
                            sx={{
                                width: '80%',
                                position: 'absolute',
                                left: '10%',
                                bottom: '5vh'
                            }}>
                            <BottomNavigation
                                showLabels
                                value={navActionValue}
                                onChange={(event, newValue) => {
                                    setNavActionValue(newValue);
                                }}
                            >
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Image
                                        </Typography>
                                        You can add images on your site from
                                        <em>{"upload file"}</em>.
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Image'
                                        icon={<ImageOutlinedIcon />}
                                        onClick={onAddImagePressed} />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Gallery
                                        </Typography>
                                        You can add your own gallery with optional
                                        <em>{"beautiful image flow."}</em>
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Gallery'
                                        icon={<CollectionsOutlinedIcon />}
                                        onClick={onAddGalleryPressed} />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Instant Embed
                                        </Typography>
                                        You can add
                                        <em>{"social media posts"}</em>
                                        with link.
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Instant Embed'
                                        icon={<ShareOutlinedIcon />}
                                        onClick={onAddInstantEmbedsPressed} />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Audio
                                        </Typography>
                                        You can add
                                        <em>{"song and voice"}</em>
                                        to the site.
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Audio'
                                        icon={<AudioFileOutlinedIcon />}
                                        onClick={onAddAudioPressed} />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Video
                                        </Typography>
                                        You can add
                                        <em>{"video"}</em>
                                        to the site and enjoy it.
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Video'
                                        icon={<VoiceChatOutlinedIcon />}
                                        onClick={onAddVideoPressed} />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Text
                                        </Typography>
                                        You can add
                                        <em>{"description or writing"}</em>
                                        to the site it.
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Text'
                                        icon={<TextIncreaseOutlinedIcon />}
                                        onClick={onAddTextPressed} />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography
                                            color="inherit">
                                            Add Links
                                        </Typography>
                                        You can add
                                        <em>{"normal and social links"}</em>
                                        to the site it.
                                    </React.Fragment>}>
                                    <BottomNavigationAction
                                        label='Links'
                                        icon={<AddLinkOutlinedIcon />}
                                        onClick={onAddLinksPressed} />
                                </HtmlTooltip>
                            </BottomNavigation>
                        </Box>
                    </>
                ) : (
                    <div>
                        <HtmlTooltip
                            title={<React.Fragment>
                                <Typography
                                    color="inherit">
                                    Add Tile
                                </Typography>
                                Tap here to get started
                                <ForwardIcon color="primary" />
                            </React.Fragment>}>
                            <Fab
                                color="primary"
                                aria-label="add"
                                style={{
                                    position: 'absolute',
                                    right: '5%',
                                    bottom: '25vh'
                                }}
                                onClick={onAddBtnPressed}>
                                <AddIcon />
                            </Fab>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={<React.Fragment>
                                <Typography
                                    color="inherit">
                                    Edit Page
                                </Typography>
                                Edit Page Details
                                <ForwardIcon color="primary" />
                            </React.Fragment>}>
                            <Fab
                                color="default"
                                aria-label="edit"
                                style={{
                                    position: 'absolute',
                                    right: '5%',
                                    bottom: '15vh'
                                }}
                                onClick={onEditPagePressed}>
                                <EditIcon />
                            </Fab>
                        </HtmlTooltip>
                    </div>
                )
            }
            {/* ===================== To Show 'Add Gallery' Modal ====================== */}

            <Modal
                open={addGallery}
                onClose={onCloseGalleryPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={add_Gallery_LinksModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        ADD GALLERY
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onGalleryDonePressed}>
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 3
                            }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onGalleryDeletePressed}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>
                    {/* <h4>Here, you can upload multiple images to make a gallery.</h4> */}
                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
                        <Box sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider'
                                }}>
                                <Tabs
                                    value={galleryMenuValue}
                                    onChange={galleryHandleChange}
                                    aria-label="basic tabs example">
                                    <Tab
                                        label="Images"
                                        {...a11yProps(0)}
                                        sx={{ width: '50%' }} />
                                    <Tab
                                        label="Setting"
                                        {...a11yProps(1)}
                                        sx={{ width: '50%' }} />
                                </Tabs>
                            </Box>


                            <TabPanel
                                value={galleryMenuValue}
                                index={0}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        ml: 2
                                    }}>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '100%',
                                        ml: 0,
                                        my: 1
                                    }}>
                                    <DriveFileRenameOutlineIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 2,
                                            my: 0.5
                                        }} />
                                    <TextField
                                        id="imgage-name"
                                        label="Image Name"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={onGalleryImageNameChange} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '100%',
                                        ml: 0,
                                        marginBottom: '3vh'
                                    }}>
                                    <HistoryEduOutlinedIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 2,
                                            my: 0.5
                                        }} />
                                    <TextField
                                        id="image-description"
                                        label="Image Description"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={onGalleryImageDescriptionChange} />
                                </Box>
                                {galleryImageAvatar?.length > 0 ?
                                    (<Card
                                        style={{
                                            marginTop: '3vh',
                                            maxHeight: '33vh',
                                            overflowY: 'scroll'
                                        }}>
                                        <List
                                            component="nav"
                                            aria-label="main mailbox folders">
                                            {galleryImageAvatar.map((item: any, index: any) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <ListItemAvatar>
                                                            <Avatar src={item.url} />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.name} />
                                                        <Fab
                                                            size="small"
                                                            color="inherit"
                                                            aria-label="deleteImage"
                                                            onClick={() => onDelteImageButton(index)}>
                                                            <ClearIcon />
                                                        </Fab>
                                                    </ListItem>)
                                            })}
                                        </List>
                                    </Card>) : (<></>)
                                }

                                <Fab
                                    sx={{
                                        width: '100%',
                                        ml: 0,
                                        my: 2
                                    }}
                                    variant="extended"
                                    size="medium"
                                    color="warning"
                                    aria-label="add"
                                    onClick={() =>
                                        uploadFileContent(uploadedFile,
                                            galleryImageName,
                                            galleryImageDescription)}
                                    disabled={!uploadBtnEnable}>
                                    <CloudUploadOutlinedIcon
                                        sx={{ mr: 1 }} />
                                    Upload Images
                                </Fab>
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
                            </TabPanel>

                            <TabPanel
                                value={galleryMenuValue}
                                index={1}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%'
                                    }}>
                                    <DriveFileRenameOutlineIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 2,
                                            my: 0.5
                                        }} />
                                    <TextField
                                        id="gallery-name"
                                        label="Gallery Name"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleGalleryNameChange}
                                        value={galleryName} />
                                </Box>
                                <WallpaperIcon
                                    sx={{
                                        color: 'action.active',
                                        my: 4
                                    }} />
                                <FormControl
                                    sx={{
                                        m: 2,
                                        width: '85%',
                                        my: 3
                                    }}
                                    size="small">
                                    <InputLabel
                                        id="demo-select-small">
                                        Image Fit
                                    </InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={imageFitValue}
                                        label="Image Fit"
                                        onChange={imageFitHandleChange}
                                    >
                                        <MenuItem value="Solid" >Solid</MenuItem>
                                        <MenuItem value="Blurred" >Blurred</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%'
                                    }}>

                                    <ColorLensOutlinedIcon
                                        sx={{
                                            color: 'action.active',
                                            my: 0
                                        }} />
                                    <TextField
                                        id="backColorInput"
                                        label="BackgroundColor"
                                        variant="standard"
                                        sx={{
                                            width: '40%',
                                            ml: '5%'
                                        }}
                                        onChange={handleEditBackColorChange}
                                        value={backColor} />
                                    <button
                                        onClick={onColorPickerPressed}
                                        style={{
                                            backgroundColor: `${backColor}`,
                                            width: '7%',
                                            height: '4vh',
                                            marginLeft: '5%'
                                        }}>
                                    </button>
                                    {displayColorPicker ? (
                                        <SketchPicker
                                            color={backColor}
                                            onChange={handleBackColorChange}
                                        />
                                    ) : null}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%'
                                    }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={onAutoPlayChange}
                                                icon={<AssignmentTurnedInOutlinedIcon
                                                    sx={{
                                                        color: 'action.active',
                                                        mr: 1
                                                    }} />}
                                                checkedIcon={<AssignmentTurnedInIcon
                                                    sx={{
                                                        color: 'rgb(255, 90, 90)',
                                                        mr: 1
                                                    }} />}
                                                name="checkedH"
                                                defaultChecked />}
                                        label={
                                            <Typography
                                                variant="subtitle1"
                                                component="h2"
                                                color="action.active"
                                                sx={{ m1: 2 }}>
                                                Autoplay Gallery
                                            </Typography>}
                                        sx={{ ml: -1, my: 3 }}
                                    />
                                </Box>
                                {autoPlayValue ? <>
                                    <AlarmAddOutlinedIcon
                                        sx={{
                                            color: 'action.active',
                                            my: 0
                                        }} />
                                    <FormControl
                                        sx={{
                                            m: 2,
                                            width: '85%',
                                            my: -1
                                        }}
                                        size="small">
                                        <InputLabel
                                            id="demo-select-small">
                                            Slide Timing
                                        </InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={slideTimeValue}
                                            label="Slide Timing"
                                            onChange={slideTimeHandleChange}
                                        >
                                            <MenuItem value={5}>5 seconds</MenuItem>
                                            <MenuItem value={10}>10 seconds</MenuItem>
                                            <MenuItem value={15}>15 seconds</MenuItem>
                                        </Select>
                                    </FormControl>
                                </> : <></>}
                            </TabPanel>
                        </Box>
                    </Typography>
                </Box>
            </Modal >

            {/* ===================== To Show 'Add Image' Modal ======================= */}

            <Modal
                open={addImage}
                onClose={onCloseImagePressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={add_Img_Audio_VideoModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        ADD IMAGE
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onImageDonePressed}>
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab sx={{
                            width: '25%',
                            ml: 3
                        }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onImageDeletePressed}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>

                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
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
                                width: '90%',
                                mb: 3
                            }}>
                            <DriveFileRenameOutlineIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="oneimage-name"
                                label="Image Name"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleOneImageNameChange}
                                value={oneImageName} />
                        </Box>
                        <FileUploader
                            multiple={false}
                            handleChange={handleOneImageUpload}
                            name="file"
                            types={uploadImageFileTypes}
                        />
                        <p
                            style={{
                                color: 'action.active',
                                marginTop: '1vh'
                            }}>
                            {oneImageUploadedFile ?
                                `File name: ${oneImageUploadedFile.name}` :
                                "No files uploaded yet"}
                        </p>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                width: '90%',
                                position: 'absolute',
                                top: '33vh'
                            }}>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={onOptionalLinkChange}
                                    icon={<AssignmentTurnedInOutlinedIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 1
                                        }} />
                                    }
                                    checkedIcon={
                                        <AssignmentTurnedInIcon
                                            sx={{
                                                color: 'rgb(255, 90, 90)',
                                                mr: 1
                                            }} />}
                                    name="checkedH"
                                    defaultChecked />}
                                label={<Typography
                                    variant="subtitle1"
                                    component="h2"
                                    color="action.active"
                                    sx={{ m1: 2 }}>
                                    Add Link To Image
                                </Typography>}
                                sx={{ ml: -1, my: 3 }}
                            />
                        </Box>
                        {showOptionalLink ?
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    width: '90%',
                                    position: 'absolute',
                                    top: '42vh'
                                }}>
                                <LinkOutlinedIcon
                                    sx={{
                                        color: 'action.active',
                                        mr: 2,
                                        my: 0.5
                                    }} />
                                <TextField
                                    id="linkUrl"
                                    label="Enter a URL"
                                    variant="standard"
                                    sx={{ width: '80%' }}
                                    onChange={handleOptionalLinkChange}
                                    value={optionalLinkUrl} />
                            </Box>
                            : <></>}
                    </Typography>
                </Box>
            </Modal>

            {/* ===================== To Show 'Add Audio' Modal =================== */}

            <Modal
                open={addAudio}
                onClose={onCloseAudioPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={add_Img_Audio_VideoModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        ADD AUDIO
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onAudioDonePressed}>
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab sx={{
                            width: '25%',
                            ml: 3
                        }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onAudioDeletePressed}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>

                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
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
                                width: '90%',
                                mb: 3
                            }}>
                            <DriveFileRenameOutlineIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="audio-name"
                                label="Audio Name"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleAudioNameChange}
                                value={audioName} />
                        </Box>
                        <FileUploader
                            multiple={false}
                            handleChange={handleAudioUpload}
                            name="file"
                            types={uploadAudioFileTypes}
                        />
                        <p
                            style={{
                                color: 'action.active',
                                marginTop: '1vh'
                            }}>
                            {audioUploadedFile ?
                                `File name: ${audioUploadedFile.name}` :
                                "No files uploaded yet"}
                        </p>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            width: '90%',
                            position: 'absolute',
                            top: '33vh'
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={onOptionalAudioDescriptionChange}
                                        icon={
                                            <AssignmentTurnedInOutlinedIcon
                                                sx={{
                                                    color: 'action.active',
                                                    mr: 1
                                                }}
                                            />}
                                        checkedIcon={
                                            <AssignmentTurnedInIcon
                                                sx={{
                                                    color: 'rgb(255, 90, 90)',
                                                    mr: 1
                                                }} />}
                                        name="checkedH"
                                        defaultChecked />}
                                label={
                                    <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        color="action.active"
                                        sx={{ m1: 2 }}>
                                        Add Description
                                    </Typography>}
                                sx={{ ml: -1, my: 3 }}
                            />
                        </Box>
                        {showOptionalAudioDescription ?
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    width: '90%',
                                    position: 'absolute',
                                    top: '42vh'
                                }}>
                                <HistoryEduOutlinedIcon
                                    sx={{
                                        color: 'action.active',
                                        mr: 2,
                                        my: 0.5
                                    }} />
                                <TextField
                                    id="audioDescription"
                                    label="Write description"
                                    variant="standard"
                                    sx={{ width: '80%' }}
                                    onChange={handleOptionalAudioDescriptionChange}
                                    value={optionalAudioDescription} />
                            </Box>
                            : <></>}
                    </Typography>
                </Box>
            </Modal>

            {/* ===================== To Show 'Add Video' Modal ================== */}

            <Modal
                open={addVideo}
                onClose={onCloseVideoPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={add_Img_Audio_VideoModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        ADD VIDEO
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onVideoDonePressed}>
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 3
                            }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onVideoDeletePressed}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>

                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
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
                                width: '90%',
                                mb: 3
                            }}>
                            <DriveFileRenameOutlineIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="video-name"
                                label="Video Name"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleVideoNameChange}
                                value={videoName} />
                        </Box>
                        <FileUploader
                            multiple={false}
                            handleChange={handleVideoUpload}
                            name="file"
                            types={uploadVideoFileTypes}
                        />
                        <p
                            style={{
                                color: 'action.active',
                                marginTop: '1vh'
                            }}>
                            {videoUploadedFile ?
                                `File name: ${videoUploadedFile.name}` :
                                "No files uploaded yet"}
                        </p>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                width: '90%',
                                position: 'absolute',
                                top: '33vh'
                            }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={onOptionalVideoDescriptionChange}
                                        icon={
                                            <AssignmentTurnedInOutlinedIcon
                                                sx={{
                                                    color: 'action.active',
                                                    mr: 1
                                                }} />}
                                        checkedIcon={
                                            <AssignmentTurnedInIcon
                                                sx={{
                                                    color: 'rgb(255, 90, 90)',
                                                    mr: 1
                                                }} />}
                                        name="checkedH"
                                        defaultChecked />}
                                label={
                                    <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        color="action.active"
                                        sx={{ m1: 2 }}>
                                        Add Description
                                    </Typography>}
                                sx={{ ml: -1, my: 3 }}
                            />
                        </Box>
                        {showOptionalVideoDescription ?
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    width: '90%',
                                    position: 'absolute',
                                    top: '42vh'
                                }}>
                                <HistoryEduOutlinedIcon
                                    sx={{
                                        color: 'action.active',
                                        mr: 2,
                                        my: 0.5
                                    }} />
                                <TextField
                                    id="audioDescription"
                                    label="Write description"
                                    variant="standard"
                                    sx={{ width: '80%' }}
                                    onChange={handleOptionalVideoDescriptionChange}
                                    value={optionalVideoDescription} />
                            </Box>
                            : <></>}
                    </Typography>
                </Box>
            </Modal>

            {/* ===================== To Show 'Add Links' Modal ================== */}

            <Modal
                open={addLinks}
                onClose={onCloseLinksPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={add_Gallery_LinksModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        ADD LINKS
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onLinksDonePressed} >
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 3
                            }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onLinksDeletePressed}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>

                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
                        <Box sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider'
                                }}>
                                <Tabs
                                    value={linksMenuValue}
                                    onChange={linksMenuHandleChange}
                                    aria-label="basic tabs example">
                                    <Tab
                                        label="Links"
                                        {...a11yProps(0)}
                                        sx={{ width: '50%' }} />
                                    <Tab
                                        label="Social"
                                        {...a11yProps(1)}
                                        sx={{ width: '50%' }} />
                                </Tabs>
                            </Box>

                            <TabPanel
                                value={linksMenuValue}
                                index={0}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 1
                                    }}>
                                    <DriveFileRenameOutlineIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 2,
                                            my: 0.5
                                        }} />
                                    <TextField
                                        id="link-name"
                                        label="Link Name"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleLinkNameChange}
                                        value={normalLinkName} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 0
                                    }}>
                                    <LinkOutlinedIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 2,
                                            my: 0
                                        }} />
                                    <TextField
                                        id="link-value"
                                        label="Enter a URL"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleLinkValueChange}
                                        value={normalLinkValue} />
                                </Box>

                            </TabPanel>
                            <TabPanel
                                value={linksMenuValue}
                                index={1}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 1.5
                                    }}>
                                    <GoogleOutlined
                                        style={{
                                            color: 'action.active',
                                            marginRight: '4%',
                                            fontSize: '22px'
                                        }} />
                                    <TextField
                                        id="email-link"
                                        label="Your Email"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleEmailChange}
                                        value={emailValue} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 1.5
                                    }}>
                                    <InstagramOutlined
                                        style={{
                                            color: 'action.active',
                                            marginRight: '4%',
                                            fontSize: '22px'
                                        }} />
                                    <TextField
                                        id="instagram-link"
                                        label="Instagram"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleInstagramChange}
                                        value={instagramValue} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 1.5
                                    }}>
                                    <TwitterOutlined
                                        style={{
                                            color: 'action.active',
                                            marginRight: '4%',
                                            fontSize: '22px'
                                        }} />
                                    <TextField
                                        id="twitter-link"
                                        label="Twitter"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleTwitterChange}
                                        value={twitterValue} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 1.5
                                    }}>
                                    <LinkedinOutlined
                                        style={{
                                            color: 'action.active',
                                            marginRight: '4%',
                                            fontSize: '22px'
                                        }} />
                                    <TextField
                                        id="linkedin-link"
                                        label="Linkedin"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleLinkedinChange}
                                        value={linkedinValue} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90%',
                                        mb: 1.5
                                    }}>
                                    <FacebookOutlined
                                        style={{
                                            color: 'action.active',
                                            marginRight: '4%',
                                            fontSize: '22px'
                                        }} />
                                    <TextField
                                        id="facebook-link"
                                        label="Facebook"
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        onChange={handleFacebookChange}
                                        value={facebookValue} />
                                </Box>
                            </TabPanel>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            {/* ===================== To Show 'Add Instant Embed' Modal ================== */}

            <Modal
                open={addInstantEmbeds}
                onClose={onCloseInstantEmbedsPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={add_Instant_ModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        INSTANT EMBED
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onInstantEmbedsDonePressed} >
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 3
                            }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onInstantEmbedsDeletePressed} >
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                width: '90%',
                                mb: 3
                            }}>
                            <DriveFileRenameOutlineIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="instant-title"
                                label="Title Label"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleInstantTitleChange}
                                value={instantTitle} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                width: '90%',
                                mb: 3
                            }}>
                            <LinkOutlinedIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="instant-url"
                                label="Link"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleInstantUrlChange}
                                value={instantUrl} />
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            {/* ===================== To Show 'Add Text' Modal ================== */}


            <Modal
                open={addText}
                onClose={onCloseTextPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={add_Text_ModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ ml: 0 }}>
                        ADD TEXT
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 7
                            }}
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={onTextDonePressed} >
                            <DoneIcon sx={{ mr: 1 }} />
                            Done
                        </Fab>
                        <Fab
                            sx={{
                                width: '25%',
                                ml: 3
                            }}
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            onClick={onTextDeletePressed} >
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
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
                                width: '90%',
                                mb: 3
                            }}>
                            <DriveFileRenameOutlineIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="text-name"
                                label="Name"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleTextNameChange}
                                value={textName} />
                        </Box>
                        <FileUploader
                            multiple={false}
                            handleChange={handleTextImageUpload}
                            name="file"
                            types={uploadImageFileTypes}
                        />
                        <p
                            style={{
                                color: 'action.active',
                                marginTop: '1vh'
                            }}>
                            {textImageUploadedFile ?
                                `File name: ${textImageUploadedFile.name}` :
                                "No files uploaded yet"}
                        </p>
                        <ReactQuill
                            // ref={quill}
                            theme="snow"
                            value={content}
                            onChange={changeHandler}
                            modules={modules}
                            formats={formats}
                            style={{
                                maxHeight: '45vh',
                                overflowY: 'scroll'
                            }}
                        />
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            width: '90%',
                            mb: 3
                        }}>
                            <LinkOutlinedIcon
                                sx={{
                                    color: 'action.active',
                                    mr: 2,
                                    my: 0.5
                                }} />
                            <TextField
                                id="text-url"
                                label="Link Url"
                                variant="standard"
                                sx={{ width: '100%' }}
                                onChange={handleTextUrlChange}
                                value={textUrl} />
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={showSelectSiteType}
                onClose={onClosePublishPressed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={publish_Box_ModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        color="common.white"
                        component="h2"
                        sx={{ ml: 0 }}>
                        SELECT SITE TYPE
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ my: 3 }}>
                        <Typography
                            variant="subtitle1"
                            color="common.white"
                            component="h2"
                            sx={{ ml: 0 }}>
                            I want to make this site to
                            <HtmlTooltip
                                title={<React.Fragment>
                                    Public pages are
                                    <em>{"visible"}</em>
                                    to everyone.
                                </React.Fragment>}>
                                <Fab
                                    variant="extended"
                                    size="small"
                                    sx={{
                                        ml: 3,
                                        width: '23%',
                                        mr: 2
                                    }}
                                    onClick={onClickPublicBtn} >
                                    <PublicIcon sx={{ mr: 1 }} />
                                    Public
                                </Fab>
                            </HtmlTooltip>
                            /
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        Private pages are visible to only you and few people
                                        <em>{"who are accepted"}</em>.
                                    </React.Fragment>}>
                                <Fab
                                    variant="extended"
                                    size="small"
                                    sx={{
                                        ml: 3,
                                        width: '23%',
                                        mr: 2
                                    }}
                                    onClick={onClickPrivateBtn} >
                                    <VerifiedUserIcon sx={{ mr: 1 }} />
                                    Private
                                </Fab>
                            </HtmlTooltip>
                            site
                        </Typography>
                    </Typography>
                </Box>
            </Modal>
        </div >
    )
}

export default PublicPage;




// <>
//     <div className='addTileBox' >
//         <button style={{ marginLeft: '10px' }} className='closeButton' onClick={onCloseBtnPressed}> Close </button>
//         <AddIcon style={{ position: 'absolute', left: '22%' }} color='primary' /><span style={{ position: 'absolute', left: '32%' }}>Add Tile</span>
//         <div className='addTileMain'>
//             <button className='pressButtons' >
//                 <img className='pressIcons' src='images/LinkImg.png' />
//                 <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold', fontSize: '14px', position: 'absolute', left: '21%', top: '0.5vh' }}>Links</span>
//                 <span style={{ color: 'rgb(255, 255, 255)', fontSize: '13px', position: 'absolute', left: '21%', top: '3.5vh' }}>Use this title to add a list of link.</span>
//             </button>
//             <button className='pressButtons' style={{ top: '8vh' }} onClick={onAddGalleryPressed}>
//                 <img className='pressIcons' src='images/GalleryImg.png' />
//                 <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold', fontSize: '14px', position: 'absolute', left: '21%', top: '0.5vh' }}>Gallery</span>
//                 <span style={{ color: 'rgb(255, 255, 255)', fontSize: '13px', position: 'absolute', left: '21%', top: '3.5vh' }}>Add multiple images to create a gallery.</span>
//             </button>
//             <button className='pressButtons' style={{ top: '16vh' }}>
//                 <img className='pressIcons' src='images/InstantImg.png' />
//                 <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold', fontSize: '14px', position: 'absolute', left: '21%', top: '0.5vh' }}>Instant Embed</span>
//                 <span style={{ color: 'rgb(255, 255, 255)', fontSize: '13px', position: 'absolute', left: '21%', top: '3.5vh' }}>Add video, music, live stream & more.</span>
//             </button>
//             <button className='pressButtons' style={{ top: '24vh' }}>
//                 <img className='pressIcons' src='images/TextImg.png' />
//                 <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold', fontSize: '14px', position: 'absolute', left: '21%', top: '0.5vh' }}>Text</span>
//                 <span style={{ color: 'rgb(255, 255, 255)', fontSize: '13px', position: 'absolute', left: '21%', top: '3.5vh' }}>Share your story in blog, article etc.</span>
//             </button>
//             <button className='pressButtons' style={{ top: '32vh' }}>
//                 <img className='pressIcons' src='images/NFTImg.png' />
//                 <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold', fontSize: '14px', position: 'absolute', left: '21%', top: '0.5vh' }}>NFT</span>
//                 <span style={{ color: 'rgb(255, 255, 255)', fontSize: '13px', position: 'absolute', left: '21%', top: '3.5vh' }}>Mint new NFT or add an existing one.</span>
//             </button>
//         </div>
//     </div>
// </>
