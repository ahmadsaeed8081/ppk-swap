import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount, useDisconnect } from 'wagmi'


import { useWeb3Modal } from '@web3modal/react'
const Header = () => {

  const { open, close } = useWeb3Modal()
  const { address, isConnected,isDisconnected } = useAccount()

  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="logo-img flex items-center justify-center">
            <Link to="/">
              <img src="../images/logo.svg" className="logo" />
            </Link>
          </div>
        </div>
        <div className="right flex items-center justify-end" onClick={() => open()}>
          <button className="btn-connect button">{isConnected?address.slice(0,5)+"..."+address.slice(38,42): "Connect Wallet" }</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
