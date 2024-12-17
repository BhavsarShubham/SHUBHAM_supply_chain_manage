import "@/styles/globals.css";
import { TrackingProvider } from '../contexts/Tracking';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer"; 


export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <Navbar />
        <Component {...pageProps} />
      </TrackingProvider>
      <Footer />
    </>
  );
}
