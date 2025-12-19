"use client";

import { Provider } from "react-redux";
import "./globals.css";
import store from "@/src/app/redux/store";
import { Toaster } from "sonner";
import { SocketProvioder } from "@/src/app/context/socketContext";
import { GlobalContextProvider } from "./context/globalContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`} cz-shortcut-listen="true">
        <Provider store={store}>
          <SocketProvioder>
            <GlobalContextProvider>
              {children}
            </GlobalContextProvider>
          </SocketProvioder>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
