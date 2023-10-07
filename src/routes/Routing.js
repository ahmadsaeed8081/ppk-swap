import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai} from 'wagmi/chains'

const Routing = () => {

  const [_address, set_address] = useState(null);
  const [web3, set_web3] = useState(null);
  const [provider, set_provider] = useState(null);
  
  const [isWalletConnected, set_isWalletConnected] = useState(false);


  const chains = [polygonMumbai]
const projectId = '8b3cd7dcbfb565705532d880d73759f2'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


  return (
    <div>

    <WagmiConfig config={wagmiConfig}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};

export default Routing;
