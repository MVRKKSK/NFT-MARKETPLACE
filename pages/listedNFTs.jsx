import React,{useState , useEffect , useContext} from 'react'
import { NFTCard , Profile } from '../components/index'
import { NFTContext } from '../context/NFTContext'
const ListedNfts = () => {
    const [listedNFTs, setListedNFTs] = useState([])
    const {listNfts} = useContext(NFTContext);
    const type = "fetchListedItems"
    useEffect(() => {
        listNfts(type).then((items) => {setListedNFTs(items)})
    }, [])
    console.log(listedNFTs)
  return (
    <div className=''>
        <Profile />
        <p className=' text-center font-bold text-xl font-poppins mt-4'>Listed NFTs for sale</p>
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
        
    </div>
  )
}

export default ListedNfts