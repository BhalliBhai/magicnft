import { useState } from "react";
import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork";
import { CHAIN_CONFIG_TYPE } from "./config/chainConfig";
import { Web3AuthProvider } from "./services/web3auth";

import styles from "./styles/Home.module.css";

import Setting from "./components/Setting";
import MainPage from "./components/MainPage";
import CreatorPage from './components/CreatorPage';
import AdminPage from "./components/AdminPage";
import VerifyPage from './components/VerifyPage';

import DashBoard from './components/SubMenus/Dashboard';
import Profile from './components/SubMenus/Profile';
import Pages from './components/SubMenus/Pages';
import ManageNFT from './components/SubMenus/ManageNFT';
import MintNFT from './components/SubMenus/MintNFT';

import PublicPage from './components/PublicPage';

import TokenGateComponent from "./components/tokenGate";

import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";


import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
//create a connection of devnet


import 'antd/dist/antd.css';
import "./App.css";


import axios from 'axios';


const MainFunc = () => {
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("solana");

  return (
    <div className={styles.mainBackground}>
      <div className={styles.container}>
        <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
          <Setting setNetwork={setWeb3AuthNetwork} setChain={setChain} />
          <MainPage />
        </Web3AuthProvider>
      </div>
    </div>);
}

function RequireAuth({ children }: any) {
  const authed = localStorage.getItem('logged');
  const isCreator = localStorage.getItem('isCreator');
  const location = useLocation();

  return (authed === 'true' && isCreator === 'true') ? (children) : (<Navigate to='/' replace state={{ path: location.pathname }} />);
}

function AdminRequireAuth({ children }: any) {
  const isAdmin = localStorage.getItem('isAdmin');
  const location = useLocation();

  return (isAdmin === 'true') ? (children) : (<Navigate to='/' replace state={{ path: location.pathname }} />);
}

function PublicRequireAuth({ children }: any) {
  const authed = localStorage.getItem('logged');
  const location = useLocation();
  return (authed === 'true') ? (children) : (<Navigate to='/' replace state={{ path: location.pathname }} />);
  
}



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainFunc />} />
        <Route path="/admin" element={<AdminRequireAuth><AdminPage /></AdminRequireAuth>} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/home" element={<RequireAuth><CreatorPage /></RequireAuth>}>
          <Route index element={<RequireAuth><CreatorPage /></RequireAuth>} />
          <Route path="/home/dashboard" element={<RequireAuth><DashBoard /></RequireAuth>} />
          <Route path="/home/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/home/pages" element={<RequireAuth><Pages /></RequireAuth>} />
          <Route path="/home/managenft" element={<ManageNFT />} />
          <Route path="/home/mintnft" element={<MintNFT />} />
        </Route>
        <Route path="/public" element={<PublicRequireAuth><PublicPage /></PublicRequireAuth>} />
        <Route path="/verifyNFT" element={<PublicRequireAuth><TokenGateComponent/></PublicRequireAuth>} />
      </Routes> 
    </BrowserRouter>
  );
}


export default App;
