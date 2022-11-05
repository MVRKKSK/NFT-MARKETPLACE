import Image from 'next/image'
import React from 'react'

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
    return (
        <div className="min-w-190  minlg:min-w-240 bg-white dark:bg-gradient-to-r from-sky-400 to-cyan-300 border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4">
            <span className=" p-1 w-24 rounded-3xl text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform text-white  bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">Ranked #{rank}</span>
            <div className="my-2 flex justify-center">
                {/* Image section start */}
                <div className="relative w-28 h-28 minlg:w-28 minlg:h-28">
                    <Image
                        src='/creator1.png'
                        layout="fill"
                        objectFit="cover"
                        alt="creatorName"
                        className="rounded-full"
                    />
                </div>
                {/* Image section end */}
            </div>
            <div className="mt-3 minlg:mt-7 text-center flexCenter font-bold flex-col">
                <p className="font-poppins text-nft-black-1 bold text-base">
                    {creatorName}
                </p>
                <p className="mt-1 font-poppins  text-nft-black-1  text-base">
                    {creatorEths && creatorEths.toFixed(2)}
                    <span className="font-normal"> </span>
                </p>
            </div>
            
        </div>
    )
}

export default CreatorCard