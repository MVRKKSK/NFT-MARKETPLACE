import React, { useState, useEffect, useContext } from 'react'
import { NFTContext } from '../context/NFTContext'
import { Modal } from '../components/index'
import Image from 'next/image'

const NftDetails = ({ Nft }) => {
  const { currentAccount } = useContext(NFTContext);

  const [modal, setModal] = useState(false)
  const ModalChild = (data) => {
    setModal(data);
  }
  return (
    <div>
      <div className='flex xl:flex-col justify-center min-h-screen'>
        <div className="relative flexCenter sm:px-4 p-12  flex-1">
          <div className="relative w-557 minmd:w-2/3 border-4 rounded dark:border-white border-nft-gray-1 minmd:h-2/3 sm:w-full sm:h-300 h-557">
            <Image src="/creator1.png" alt="" className='rounded hover:scale-125 duration-500' layout='fill' objectFit='cover' />
          </div>
        </div>
        <div className="relative flex-row items-center justify-center mt-20 flex-1">
          <p className='font-bold text-center dark:text-white text-nft-black text-xl sm:text-md font-poppins'>About NFT</p>
          <div className='flex flex-row items-center'>
            <div className="relative w-12 border-4 rounded-full border-nft-gray-1 dark:border-white h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image src="/creator1.png" alt="" className='rounded-full' layout='fill' objectFit='cover' />
            </div>
            <div>
              <p className='text-sm font-poppins'>creatorName</p>
            </div>
          </div>
          <div className='xl:pl-4 xl:pr-0 '>
            <p className='pt-4 font-poppins text-xl sm:text-md font-bold'>Details</p>
            <p className='p-3 xl:pr-4 rounded-xl border-slate-500 mr-4 mt-4 dark:border-white border-2 text-md sm:text-sm font-poppins w-95 text-justify pr-6 pt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae consectetur neque. In semper, leo eu condimentum eleifend, justo nunc tristique lectus, elementum vestibulum metus augue eget quam. Sed sed felis velit. Nunc nunc diam, iaculis non vehicula non, auctor sit amet augue. Nullam elementum id lorem ac consectetur. Ut dignissim velit nisl, a ullamcorper purus dignissim placerat. Maecenas sed urna non dolor tempus mattis a commodo lacus. Praesent laoreet velit sed finibus accumsan.</p>
          </div>
          <p className='text-md font mt-3 mb-3 sm:text-sm font-poppins dark:text-white text-gray-700'>Current Price</p>
          <p className='font-poppins font-bold text-2xl md:text-md dark:text-white text-gray-700 '>0.122 ETH</p>
          <button className='mt-6 border font-bold text-black outline-none pr-6 pl-6 pt-2 pb-2  rounded-xl bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 ' onClick={() => { setModal(true) }}>Buy Now</button>
          {modal ? <Modal state="true" func={ModalChild} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export default NftDetails