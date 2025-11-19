import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
