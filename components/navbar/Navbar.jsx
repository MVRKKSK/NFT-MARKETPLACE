
import React , { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { NFTContext } from '../../context/NFTContext';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0: return '/';
      case 1: return '/listed-nfts';
      case 2: return '/my-nfts';
      default:
        break;
      }
    };
    // returns the menu items with correct classes and links in a combined component
    return (
      <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {[, 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
        key={i}
        onClick={() => {
          setActive(item);
        }}
        className={`flex p-3 fadeIn cursor-pointer rounded-2xl flex-row items-center font-poppins font-semibold  hover:text-nft-dark dark:hover:text-nft-dark text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-3
        ${active === item
          ? 'dark:text-white text-white'
          : 'dark:text-white text-white'}
          ${isMobile && 'text-4xl my-2'}`}
          >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};


const Navbar = () => {
  
  const {connectWallet , checkaccount} = useContext(NFTContext)
  const { theme, setTheme } = useTheme();
  return (
    <>
      <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-dark-1 border-gray-1">
        <div className="flex flex-1 flex-row justify-start">
          <Link href="/">
            <div
              className="flex md:hidden cursor-pointer"
              onClick={() => { }}
            >
              {/* search bar comes here */}
              <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
                logo comes here
              </p>
              <input className="bg-gradient-to-r from-cyan-500 to-blue-500 outline-none bold placeholder:text-nft-dark flex-inline p-2 rounded-xl  hover:ring-slate-300 dark:highlight-white/5 " placeholder="Search NFTs"
              />
            </div>
          </Link>
          <Link href="/">
            <div className="hidden md:flex">
              logo comes here
            </div>
          </Link>
        </div>
        <div className="flex flex-initial flex-row justify-end">
          {/* dark and light mode */}
          <div className="flex items-center mr-5">
            {/* changes mode using theme provider by NEXT */}
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
              <i className="fas fa-sun" />
              <i className="fas fa-moon" />
              {/* white circle covering the icon not in use. Animiation of ball is in global css */}
              <div className="w-3 h-3 absolute bg-white rounded-full ball" />
            </label>
          </div>
          <div className="flex md:hidden">
            <MenuItems />
          </div>

          <div className="md:hidden flex p-1 w-10 h-10 rounded-full ring-2 ring-ring-blue-500 ">
            fs
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={connectWallet}>
          Button
        </button>
      </nav>
    </>
  )
}

export default Navbar