import { CreatorCard, Footer, Navbar } from "../components/index"
import images from "../assets/creator1.png"
import Image from "next/image"

export default function Home() {
    return (
        <div className="pt-4" >
            hello
            <div className="flex justify-center sm:px-4 p-12">
                {/* <Banner /> */}
                <div className="relative flex-1 max-w-full flex mt-3">
                    <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none ">
                        {[6, 7, 8, 9, 10].map((i) => (
                            <CreatorCard  key={`creator-${i}`}
                            rank={i}
                            creatorImage={images}
                            creatorName={"0xc...fad8"}
                            creatorEths={10 - i * 0.5}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}