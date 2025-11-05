import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster richColors position="top-right" /> 
    </>
  );
}
