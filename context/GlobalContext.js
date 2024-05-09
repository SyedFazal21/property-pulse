'use client';
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({children}) {
    const [count, setCount] = useState(0);

    return (
        <GlobalContext.Provider value={{
            count,
            setCount
        }} >
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}