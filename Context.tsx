import { FunctionComponent } from "react";

import useData, {DataContext} from './useData';

type ContextComponent = FunctionComponent<{children:JSX.Element[]|JSX.Element}>;

const Contexts:ContextComponent = ({children}) => {
    const data = useData();
    
    return (
        <DataContext.Provider value={data}>
            {children}    
        </DataContext.Provider>
    )
}

export default Contexts;