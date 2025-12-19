import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type globalContextType = {
    userData: {
        username: string,
        avatar: string,
        status: string
    };
}
export const globalContext = createContext<globalContextType>({
    userData: {
        username: "",
        avatar: "",
        status: ""
    }
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState({
        username: "",
        avatar: "",
        status: ""
    });
    useEffect(() => {
        const fetchUser = async () =>
            await axios
                .get("api/currentUser")
                .then((data) => {
                    setUserData(JSON.parse(data.data.userData));
                })
                .catch((err) => console.log(err));
        fetchUser();
    }, []);
    return (
        <globalContext.Provider value={{ userData }}>{children}</globalContext.Provider>
    );
};
export const useGlobalContext = () => {
    const context = useContext(globalContext);
    return context
}