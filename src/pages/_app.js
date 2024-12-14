import "@/styles/globals.css";
 import {TrackingProvider} from '../contexts/Tracking';
export default function App({ Component, pageProps }) {
  return(
    <>
    <TrackingProvider>
    <Component {...pageProps} />
    </TrackingProvider>
    </>
  ) 
}
