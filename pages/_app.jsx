import { NFTProvider } from '../context/NFTContext';
import { ThemeProvider } from 'next-themes'
import Script from 'next/script';
import { Footer, Navbar } from '../components/index'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
 return(
   <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <Script src="https://kit.fontawesome.com/84aa4608a6.js" crossorigin="anonymous" />
      </ThemeProvider>
    </NFTProvider>
  )
}

export default MyApp