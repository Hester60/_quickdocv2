import {createContext} from "react";

const defaultValues = {
    currentPage: null,
    currentProject: null,
}

const ConfigContext = createContext(defaultValues);


const ConfigContextProvider = ({children}) => (
    <ConfigContext.Provider value={defaultValues}>
        {children}
    </ConfigContext.Provider>
);

export default ConfigContextProvider;
