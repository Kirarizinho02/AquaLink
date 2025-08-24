import { createContext } from "react";
import type { ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext({});

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = (props: AppContextProviderProps) => {
    return (
        <appContext.Provider value={{}}>
            { props.children }
        </appContext.Provider>
    );
}

