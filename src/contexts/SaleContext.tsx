import { createContext, useState } from "react";

export const SaleContext = createContext(null);

export const SaleProvider = ({ children }) => {

    const [sale, setSale] = useState('673cca59e9d77b8c30b04c12');

    return (
        <SaleContext.Provider value={[sale, setSale]}>
            {children}
        </SaleContext.Provider>
    );

}