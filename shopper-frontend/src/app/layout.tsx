'use client';

import localFont from 'next/font/local';
import './globals.css';
import SideBar from '../components/SideBar';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {



  return (

    <AppProvider>
    <html lang="en">
    <head>
      <title>Shopper Full Stack Rides</title>
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-[22rem_1fr] min-h-screen w-full`}
    >
    <div className={" h-lvh flex flex-col item-container justify-center"}>
      <SideBar />
    </div>


    <div className={"h-full w-full"}>
      <Toaster position="top-right" />
      {children}
    </div>
    </body>
    </html>
    </AppProvider>

  );
}
