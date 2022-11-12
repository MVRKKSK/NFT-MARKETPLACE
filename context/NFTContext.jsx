import React, { useState, useEffect } from "react"
import web3modal from "web3modal"
import { ethers } from "ethers"
import axios from "axios"

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const nftCurrency = 'ETH';

  // function that checks if metamask is installed and connected
  // runs everytime the page loads
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask first.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No authorized account found');
      alert('Please connect to MetaMask.');
    }
  };

  // useEffect to run checkIfWalletIsConnected function when the page loads
  useEffect(() => {
    checkIfWalletIsConnected();
    console.log(currentAccount)
  }, []);

  // function to connect metamask
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask first.');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet }} >
      {children}
    </NFTContext.Provider>
  )
}
