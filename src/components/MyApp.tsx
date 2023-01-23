import React, { useEffect, useState, useMemo} from "react";

import * as anchor from "@project-serum/anchor";

//import { Provider, Wallet } from "@project-serum/anchor";

import { clusterApiUrl } from "@solana/web3.js";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";


import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
//create a connection of devnet

import axios from 'axios';

import IDL from '../anchor_mint_sell_nft.json';

import keyPair from '../anchor_mint_sell_nft-keypair.json';

const programId = "H4cywKiiWQK9ShnEzQ7e2L3yXMgms2tcmPmPXciZsP5v";

declare const window: any;


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

    async mintToken() {

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
             "Youtube nft123",
            "MbbNft1123",
            "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json",
            new anchor.BN(1000)
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





const getDevPgmId = () => {
    // get the program ID from the solblog-keyfile.json
    let pgmKeypair = anchor.web3.Keypair.fromSecretKey(
        new Uint8Array(keyPair)
    )
    return new anchor.web3.PublicKey(pgmKeypair.publicKey) // Address of the deployed program
}




const Myapp: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string>('')
    
    const [nftData, setNftData] = useState<any>();
    const [loading, setLoading] = useState(false);


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

        const res = await getAllNftData();
        console.log('res', res);

        //const AnchorCode = new anchorClient();
        //await AnchorCode.mintToken();
    }
    
    const checkIfWalletPresent =async (): Promise<void> => {
        try {
            const { solana } = window;
            if( solana && solana.isPhantom){
                console.log('Phantom wallet found!');
    
                const response = await solana.connect({ onlyIfTrusted: false});
    
                setWalletAddress(response.publicKey.toString());
            }else{
                alert('No wallet found');
            }
        } catch (error) {
            console.log('error', error);
        }    
    }
    
    
    const renderNotConnected = () : JSX.Element => (
        <button
        onClick={connectWallet}
        >
            Connect to Wallet!
        </button>
    )
    
    return (
        <div>
        <h1>Solana NFT</h1>
        <div>{!walletAddress && renderNotConnected()}</div>
        </div>
        )
    };








export default Myapp;