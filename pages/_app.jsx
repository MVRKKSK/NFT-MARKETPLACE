import { ThemeProvider } from 'next-themes'
import Script from 'next/script';
import { Footer, Navbar } from '../components/index'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return(

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
        )
}

export default MyApp