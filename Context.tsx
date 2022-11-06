import { FunctionComponent } from "react";

import useDataContext, {DataContext} from './useDataContext';

import useUIContext, {UIContext} from './useUIContext';

type ContextComponent = FunctionComponent<{children:JSX.Element[]|JSX.Element}>;



const Contexts:ContextComponent = ({children}) => {
    const data = useDataContext();
    const uiContext = useUIContext();

    return (
        <DataContext.Provider value={data}>
            <UIContext.Provider value={uiContext}>
                {children}    
            </UIContext.Provider>
        </DataContext.Provider>
    )
}

export default Contexts;