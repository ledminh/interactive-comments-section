import { FunctionComponent } from "react";

import useDataContext, {DataContext} from './useDataContext';

import useUIContext, {UIContext} from './useUIContext';

import { SessionType } from "./pages/api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";

type ContextComponent = FunctionComponent<{children:JSX.Element[]|JSX.Element}>;



const Contexts:ContextComponent = ({children}) => {
    const {data:session} = useSession();

    const data = useDataContext(session as SessionType | null);
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

