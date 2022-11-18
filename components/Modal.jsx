import Image from 'next/image';
import React, { useState } from 'react'
import { useTheme } from 'next-themes';


const Modal = (props) => {
    const { theme } = useTheme();
    const [showModal, setShowModal] = useState(props.state);
    const setStateModal = (data) => {
        props.func(data)
    }
    return (
        <div className="flex w-3/4 flex-col  p-6 dark:bg-white rounded-2xl bg-gray-700  z-10 absolute top-24 -left-1/3 justify-center items-center">
            <p className='font-bold dark:text-black text-white text-center pt-4 pb-4 font-poppins text-xl sm:text-md '>Checkout with Wallet</p>
            {showModal ? (
                <div>
                    <div className="flex flex-col p-4 dark:bg-white bg-gray-700  rounded-lg shadow-xl h-auto ">
                        <div className="">
                            <p className='font-semibold mb-4 px-4 dark:text-black text-white font-poppins text-sm sm:text-sm'>Purchase the NFT with Metamask</p>
                        </div>
                        <div className="flex flex-row items-start">
                            <div className="">

                                <h2 className="text-base mt-2 mx-4 font-poppins dark:text-black text-white font-semibold">
                                    you are buying this nft from 0xce....acd
                                </h2>
                                <p className="text-base mt-2 mx-4 font-poppins dark:text-black text-white font-semibold">Monkee NFT</p>
                            </div>
                            <div className="relative justify-start w-64 h-32 minlg:w-6 minlg:h-6 cursor-pointer">
                                <Image
                                    src="/creator1.png"
                                    layout="fill"
                                    className="rounded-2xl m-4"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-md font-semibold font-poppins sm:text-sm p-2  dark:text-black text-white'>Summary</p>

                        <div className='flex flex-row cursor-pointer items-center p-2 dark:border-black border-white bg-gray-400 rounded-xl'>
                            <div className='relative w-16 h-16 '>
                                <Image
                                    src="/creator1.png"
                                    layout="fill"
                                    className="rounded-2xl m-4"
                                />
                            </div>
                            <button className=' text-md ml-20 outline-none sm:text-md font-semibold text-white font-poppins'>Purchase the NFT for 0.122 ETH</button>
                        </div>
                    </div>
                    <button
                        className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
                        onClick={() => {
                            setShowModal(false)
                            setStateModal(false)
                        }}
                    >
                        Close
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default Modal