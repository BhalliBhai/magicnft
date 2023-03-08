import React, { useEffect, useState } from 'react';

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

import Modal from '@mui/material/Modal';

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

import { NFTStorage } from 'nft.storage';
import { FileUploader } from "react-drag-drop-files";

import './index.scss';

import axios from 'axios';

import { IWalletProvider, getWalletProvider } from '../../../../src/services/walletProvider';


import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
//create a connection of devnet



import Myapp from '../../MyApp';

import * as anchor from "@project-serum/anchor";

import IDL from '../../../anchor_mint_sell_nft.json';

import keyPair from '../../../anchor_mint_sell_nft-keypair.json';

const programId = "H4cywKiiWQK9ShnEzQ7e2L3yXMgms2tcmPmPXciZsP5v";


declare const window: any;

const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM5MzIwNTBFODQwYzM4OWNGM2ZlRjRGQzFDODg1RTA4NTFlQ2NjMzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTQzOTcwNTI0NywibmFtZSI6Ik1hZ2ljTkZUeSJ9.XOg1e6ny5njX54-b8I3yrjQmoCGj4FQXj9wgy_oYk94';
const uploadFileTypes = ["JPG", "PNG", "GIF", "SVG", "MP4", "WEBM", "MP3", "WAV", "OGG", "GLB", "GLTF"];



class anchorClient {

    connection: any;
    provider: any;
    program: any;
    wallet: any;
    IDL: any;
    programId: any;

    constructor()  {

        //this code initializes client configs

        this.programId = programId;
        this.IDL = IDL;
        //config = config || solConfigFile.development.config;
        this.connection = new anchor.web3.Connection('https://api.devnet.solana.com', 'confirmed');
        //console.log('\n\nConnected to', this.config.httpUri);
    
        /*
        this.wallet =
            window.solana.isConnected && window.solana?.isPhantom
                ? new WalletAdaptorPhantom()
                : keyPair
                ? new anchor.Wallet(keyPair)
                : new anchor.Wallet(anchor.web3.Keypair.generate());*/

        this.wallet = window.solana;//new anchor.Wallet(walletAddr);


        // maps anchor calls to Phantom direction
        this.provider = new anchor.AnchorProvider(this.connection, this.wallet, {
            preflightCommitment: "processed",
          });
        this.program = new anchor.Program(this.IDL, this.programId, this.provider);
    }

    async mintToken(name: any, symbol: any, metadatauri: any, supply: any) {

        const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        );

        
        const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();


    const metadataAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      ))[0];
      console.log("Metadata initialized", metadataAddress);
      const masterEditionAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
          Buffer.from("edition"),
        ],
        TOKEN_METADATA_PROGRAM_ID
      ))[0];
      console.log("Master edition metadata initialized", masterEditionAddress);

        const tokenAddress = await anchor.utils.token.associatedAddress({
            mint: mintKeypair.publicKey,
            owner: this.wallet.publicKey
        });
        console.log(`New token: ${mintKeypair.publicKey}`);
        
        // Transact with the "mint" function in our on-chain program
        
        await this.program.methods.mint(
            name,
            symbol,
            metadatauri,
            new anchor.BN(supply)
        )
            .accounts({
                masterEdition: masterEditionAddress,
                metadata: metadataAddress,
                mint: mintKeypair.publicKey,
                tokenAccount: tokenAddress,
                mintAuthority: this.wallet.publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
              })
            .signers([mintKeypair])
            .rpc();
            console.log('done minting');
        };
    
};

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

    const [walletAddress, setWalletAddress] = useState<string>('')
    const [openWallet, setOpenWallet] = useState(true);


    const handleFileUpload = (file: any) => {
        setPrimaryDataFile(file);
        uploadNFT(file);
    }

    const uploadNFT = async (uploadFile: any) => {
        //Initialize NFTStorage
        const nftStorage = new NFTStorage({ token: APIKEY });

        try {
            //Upload NFT to IPFS & Filecoin
            setUploadingNow(true);
            const metadata = await nftStorage.store({
                name: nftName,
                symbol: nftName,
                description: nftDescription,
                seller_fee_basis_points: 5,
                external_url: "",
                edition: "",
                background_color: "000000",
                //image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png"
                //name: nftName,
                //description: nftDescription,
                image: uploadFile
            });
            setUploadingNow(false);

            const pathname = metadata.data.image.pathname.split('//')[1];

            const obj2 = {
                name: nftName,
                symbol: "BETA",
                description: nftDescription,
                seller_fee_basis_points: 5,
                external_url: "",
                edition: "",
                background_color: "000000",
                //image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png"
                //name: nftName,
                //description: nftDescription,
                image: 'https://ipfs.io/ipfs/' + pathname
            }

            const fileJsonName = metadata.url.split('//')[1];

            setUploadedNft('https://ipfs.io/ipfs/' + pathname);

            //down below is image name
            //setUploadedNft('https://ipfs.io/ipfs/' + fileJsonName);
            console.log('my uploaded nft', fileJsonName);

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

    /*
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
    }*/

    const handleMintNFT = async () => {

        //construct uri
        const uriObj = {
                name: nftName,
                symbol: "BETA",
                description: nftDescription,
                seller_fee_basis_points: 5,
                external_url: "",
                edition: "",
                background_color: "000000",
                image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png"
        }

        const uri = "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json";

        const newuri = "https://gist.githubusercontent.com/Hyperion101010/25eee0a09a78016d1d14102297d284ca/raw/66b9edc4a2f6e52dae6f3725a4245d90c22ea4df/sample.json"

        const AnchorCode = new anchorClient();
        await AnchorCode.mintToken(nftName, nftName, uploadedNft, 1000);
    }

    
    const getProvider = () => {
        if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          return provider;
         }
        }
    }
    
    const connectWallet = async (): Promise<void> => {
        
        const { solana } = window
        if (solana) {
        const response = await solana.connect()
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
        }
    }


    useEffect( () => {
        ( async() => {
        const { solana } = window
        if (solana) {
        const response = await solana.connect()
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
        }
    })();
    }, []);




    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#2F2F2F' }}>

            {!walletAddress ? 
            (
                <div>
                <Card className='connect-div bg-black' style={{borderRadius: '10px'}}> 
                <Box className='rounded'>
                <Typography className='text-white' id="modal-modal-title" variant="h6" component="h2">
                    Connect to Phantom Wallet!
                </Typography>
                <Button className='bg-dark mt-3' variant="contained" onClick={connectWallet}>Connect</Button>
                </Box>
                </Card>
                </div>
            ) :

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
                {/*<TextField
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
                </Box>*/}
                <Button variant="contained" color="secondary" sx={{ position: 'absolute', left: '73%', top: '55vh'}} onClick={handleMintNFT}> Mint NFT </Button>
            </Card>}
        </div>
    );

}

export default MintNFT;