import React from "react";
import "../styles/globals.css";
import "../styles/ckeditor.css";
import type { Metadata } from "next";

import "regenerator-runtime/runtime";
import Provider from "@/components/provider/Provider";
import Header from "@/components/header/Header";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "개발자들의 소통공간, 개발로그",
  description: "dogFoot",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/hack-font/3.3.0/web/hack-subset.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${BG_COLOR.background} ${TEXT_COLOR.primary}`}>
        <Provider>
          <div className="h-[94px]" />
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
