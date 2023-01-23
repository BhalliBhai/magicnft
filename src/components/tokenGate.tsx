import React, { useState, useEffect } from 'react';

import { clusterApiUrl } from "@solana/web3.js";

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
import { Switch } from '@material-ui/core';

import { FileUploader } from "react-drag-drop-files";
import { NFTStorage } from 'nft.storage';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";

import Draggable from 'react-draggable'; // The default
import ReactQuill from 'react-quill';


import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";


import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
//create a connection of devnet


import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

//@ts-ignore

import './PublicPage/index.css';
import { styled } from '@mui/material/styles';
import { SketchPicker } from 'react-color';

declare const window: any;

// import { Container, Draggable } from 'react-smooth-dnd';

// This is your APIKEY of the NFT storage. When you access NFT Storage, create new user and get new API KEY for save the datas

const label = { inputProps: { 'aria-label': 'Switch demo' } };

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

const TokenGateComponent = ({children} : any) => {

    const [pageName, setPageName] = useState('Untitled Page');
    const [siteID, setSiteID] = useState('');
    const [pageStatus, setPageStatus] = useState('');
    const [showSelectSiteType, setShowSelectSiteType] = useState(false);
    const [publishUploadingNow, setPublishUploadingNow] = useState(false);


    const [pageInfo, setPageInfo] = useState<any>();
    const [editPage, setEditPage] = useState(false);
    const [pageDescription, setPageDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState<any>('');
    const [uploadedThumbImage, setUploadedThumbImage] = useState('');
    
    const [tokenGate, settokenGate] = useState(false);
    const [chainIds, setChainIds] = useState<any>([]);
    const [walletChainIds, setWalletChainIds] = useState<any>([]);
    const [walletAddress, setWalletAddress] = useState<string>('')


    const [siteData, setsiteData] = useState<any>();


    
    const [nftData, setNftData] = useState<any>();
    const [loading, setLoading] = useState(false);

    const [isTokenGateVerified, setisTokenGateVerified] = useState(false);

    let listView;

    const getProvider = () => {
        if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          return provider;
         }
        }
    }

    const createConnectionConfig = (obj: any) => {
        return new Connection(obj);
    }

    const getAllNftData = async () => {
        try {
            const connect = createConnectionConfig(clusterApiUrl("devnet"));
            const provider = getProvider();
            let ownerToken = provider.publicKey;
            const result = isValidSolanaAddress(ownerToken);
            console.log("result", result);
    const nfts = await getParsedNftAccountsByOwner({
              publicAddress: ownerToken,
              connection: connect,
            });
            return nfts;
          
        } catch (error) {
          console.log(error);
        }
    }

    const getNftTokenData = async () => {
        try {
          const nftData: any = await getAllNftData();

          console.log('nft Data', nftData);

          //var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    
          //let arr = [];
          //let n = data.length;
          //for (let i = 0; i < n; i++) {
          //  console.log(data[i].data.uri);
          //  let val = await axios.get(data[i].data.uri);
          //  arr.push(val);
          //}
          return nftData;
        } catch (error) {
          console.log(error);
        }
    }

    /*
    useEffect(() => {
        async function data() {
          const res = await getAllNftData();
          setNftData(res);
          setLoading(true);
        }
        data();
      }, []);
      */

    
    const connectWallet = async (): Promise<void> => {
        
        const { solana } = window
        if (solana) {
        const response = await solana.connect()
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
        }

        const res = await getAllNftData();

        let ans: any = [];

        res?.map( (ele: any) => {
            ans.push(ele.mint)
            setWalletChainIds(ans);
        });

        console.log('res', res);

        //const AnchorCode = new anchorClient();
        //await AnchorCode.mintToken();
    }
    


const renderNotConnected = () : JSX.Element => (
    <button
    onClick={connectWallet}
    >
        Connect to Wallet!
    </button>
)

/////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        (async () => {
            const res = await axios.get('/creatorsite/siteinfo');
            console.log('getting public sites', res);
            const siteData = res.data.filter(
                (item: any) => item.siteUrl === window.location.search.split('=')[1]
            );

            setsiteData(siteData);

            setSiteID(siteData[0]._id);
            if (siteData[0].published === true) {

                settokenGate(siteData[0].tokenGate);
                setChainIds(siteData[0].chainIds);

                setPageDescription(siteData[0].siteDescription);
                
                setPageName(siteData[0].siteName);
            }
            else if (siteData[0].published === false) {
                setPageStatus('Draft');
            }




            /*
            listView = chainIds.map( (ele: any) => {
                console.log('each ele', ele);
                <li> NFT contract {ele}</li>
            });*/


        })();
    }, []);

    //useEffect(async () => {
//
    //}, []);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

    const location = useLocation();

    //console.log('my sitedata', siteData, chainIds);

    console.log('list view', chainIds);    

    let isverified = false;

    chainIds.forEach( (element: any) => {
        if( walletChainIds.includes(element)){
            setisTokenGateVerified(true);
            console.log('match found', element);
            return (<h1>Verified</h1>);
        }
    });

    //if(siteData[0].tokenGate === true){
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
            <div className='publishPanel'>
                <PublishHeader>
                    {pageInfo ? pageInfo.name : pageName}
                    <span style={{ fontSize: '14px' }}> ({pageStatus}) </span>
                </PublishHeader>
            </div>
            <Card
                
                                    style={{
                                        position: 'absolute',
                                        width: '50%',
                                        height: '50%',
                                        left: '50%',
                                        top: '50%'
                                    }}
                                >
                                <div>
                                    This is a token gated website!
                                </div>
                                <div>
        <h1>Solana NFT</h1>
        <div>{!walletAddress && renderNotConnected()}</div>
        </div>
                                <ul>
                                    <h1>{chainIds}</h1>
                                </ul>
                                <ul>
                                    <h1>{walletChainIds}</h1>
                                </ul>

                                </Card>
        </div >
    )
            //}
            //else{
            //    return (<Navigate to='/public' replace state={{ path: location.pathname }} />)
            //}
}

export default TokenGateComponent;


