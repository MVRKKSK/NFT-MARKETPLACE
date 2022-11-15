import React, { useState, useContext, useEffect } from 'react'
import { Profile, NFTCard } from '../components/index'
import { NFTContext } from '../context/NFTContext'
import Image from 'next/image'
const MyNFTs = () => {
    const [useNft, setUseNft] = useState([])
    const { listNfts } = useContext(NFTContext)
    useEffect(() => {
        listNfts().then((items) => { setUseNft(items) })
    }, [])
    console.log(useNft)
    return (
        <div className=''>
            <div className="pt-12 w-full h-80 relative">
                <div className="container ">
                    <Image src="/creator1.png" alt="" layout='fill' />
                </div>
            </div>
            <div className='relative -top-28 -mb-16'>
                <Profile />
            </div>
            <p className='font-bold text-center pb-8 font-poppins text-xl sm:text-md'>My owned NFTs</p>
            {useNft.length ? (
                <div className="mt-3 mb-3 w-full flex flex-wrap justify-start md:justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <NFTCard
                            key={`nft-${i}`}
                            nft={{
                                i,
                                name: `Nifty NFT ${i}`,
                                price: (10 - i * 0.534).toFixed(2),
                                seller: "0xc...fad8",
                                owner: "0xc...fad8",
                                description: 'cool NFT on Sale',
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className='font-bold text-center pb-8 font-poppins text-xl sm:text-md'>
                    You dont own any NFTs
                </div>
            )
            }
        </div>
    )
}
export default MyNFTs