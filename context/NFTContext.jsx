import React, { useState, useEffect } from "react"
import web3modal from "web3modal"
import { ethers } from "ethers"
import axios from "axios"

export const NFTContext = React.createContext();

export const NftProvider = ({ children }) => {
    const [checkaccount, setCheckaccount] = useState()
    const checkWalletConnection = async () => {
        if (!window.ethereum) return (alert("You have not installed metamask please install it for wallet connection"))
        const accounts = await window.ethereum.request("eth_accounts")
        accounts.length ? setCheckaccount(accounts[0]) : console.log("account not connected")
        console.log(accounts)
    }

    useEffect(() => {
      checkWalletConnection();
    }, [])
    
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
    const nftCurrency = 'ETH'
    return (
        <NFTContext.provider value={{nftCurrency , connectWallet}} >
            {children}
        </NFTContext.provider>
    )
}
