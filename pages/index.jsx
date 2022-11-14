import React , {useContext , useState , useEffect} from "react"
import { CreatorCard, Footer, Navbar, NFTCard } from "../components/index"
import images from "../assets/creator1.png"
import Image from "next/image"
import { NFTContext } from "../context/NFTContext"

export default function Home() {
  const {fetchNFT} = useContext(NFTContext)
  const [nftData, setNftData] = useState([])
  useEffect(() => {
    fetchNFT().then((items) => {setNftData(items)})
  }, [])
  console.log(nftData)
  return (
    <div className="pt-4" >
      hello
      <div className="flex justify-center sm:px-4 p-12">
        {/* <Banner /> */}
        <div className="relative flex-1 max-w-full flex mt-3">
          <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none ">
            {[6, 7, 8, 9, 10].map((i) => (
              <CreatorCard key={`creator-${i}`}
                rank={i}
                creatorImage={images}
                creatorName={"0xc...fad8"}
                creatorEths={10 - i * 0.5} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
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