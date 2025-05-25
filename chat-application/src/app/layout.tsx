"use client";
import { Provider } from "react-redux";
import "./globals.css";
import store from "./redux/store";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={` antialiased`} cz-shortcut-listen="true">
        <Provider store={store}>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
