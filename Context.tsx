import { FunctionComponent } from "react";

import useDataContext, {DataContext} from './useDataContext';
type ContextComponent = FunctionComponent<{children:JSX.Element[]|JSX.Element}>;

const Contexts:ContextComponent = ({children}) => {
    const data = useDataContext();
    
    return (
        <DataContext.Provider value={data}>
            {children}    
        </DataContext.Provider>
    )
}

export default Contexts;