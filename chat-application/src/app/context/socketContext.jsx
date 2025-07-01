"use client"
import { io } from "socket.io-client";
import React from "react"
const { createContext, useState, useEffect } = require("react");

export const socketContext = createContext();

export const SocketProvioder= ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io("https://socket-server-8ta2.vercel.app/", {
            withCredentials: true,
        });
        console.log("socket", socket)
        setSocket(socket)
    }, [])
    return (
        <socketContext.Provider value={socket} >
            {children}
        </socketContext.Provider>
    )
}