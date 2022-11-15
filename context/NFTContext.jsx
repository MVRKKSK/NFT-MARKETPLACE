import React, { useState, useEffect } from "react"
import web3Modal from "web3modal"
import { ethers, Signer } from "ethers"
import axios from "axios"
import { Web3Storage } from 'web3.storage';
import { marketAddress, marketAddressABI } from "./constants"

// Construct with token and endpoint
const accessKey = process.env.NEXT_PUBLIC_WEB3STORAGE_ACCESS_KEY
const client = new Web3Storage({ token: accessKey });

const fetchContract = (signer) => new ethers.Contract(marketAddress, marketAddressABI, signer)

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const nftCurrency = 'ETH';
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
  useEffect(() => {
    checkIfWalletIsConnected();
    console.log(currentAccount)
  }, []);
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

  const uploadFile = async (files) => {
    const cid = await client.put(files);
    const url = `https://${cid}.ipfs.w3s.link/${files[0].name}`;
    console.log('stored files with cid:', cid);
    console.log(url);
    return url;
  }

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3modal = new web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // who is making this NFT or sale
    const signer = provider.getSigner();
    // need to convert from number to Wei or Gwei
    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, price, { value: listingPrice.toString()})
    await transaction.wait();
    console.log(transaction)

  }

  const createNFT = async (formValues, fileUrl, fileId) => {
    const { name, description, price } = formValues;
    if (!name || !description || !price || !fileUrl) return;

    const data = new Blob([JSON.stringify({ name, description, image: fileUrl, fileId })], { type: 'application/json' });

    const files = [new File([data], fileId)];
    try {
      const added = await client.put(files);
      console.log(1);
      const url = `https://${added}.ipfs.w3s.link/${fileId}`;
      console.log(2)
      await createSale(url, price);
      // router.push('/');
    } catch (e) {
      console.log('Error uploading file to IPFS', e);
    }
  }

  const fetchNFT = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
      const data = await contract.MarketItems();
      const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const { data: { image, description, name } } = await axios.get(tokenURI)
        const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether')
        return {
          price,
          tokenId: tokenId.toString(),
          name, description, image, seller, owner, tokenURI
        }
      }))
      // console.log(items)
      return items; 
  }

  const listNfts = async(type) => {
    const web3modal = new web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();
    const contract =  fetchContract(signer)
    const data = type === "fetchListedItems" ? await contract.fetchItemsListed() : await contract.fetchMyNfts();
    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, description, name } } = await axios.get(tokenURI)
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether')
      return {
        price,
        tokenId: tokenId.toString(),
        name, description, image, seller, owner, tokenURI
      }
    }))
    // console.log(items)
    return items; 
  }

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, uploadFile, createNFT, fetchNFT , listNfts }} >
      {children}
    </NFTContext.Provider>
  )
}
