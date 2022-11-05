import { createContext, useState} from "react";

import { DataContextType, DataType } from "../TypesAndInterfaces";


const defaultData:DataContextType = {
    data: null,
    setData: () => {}
}

export const DataContext = createContext<DataContextType>(defaultData);



const useDataContext = () => {
    const [data, setData] = useState<DataType|null>(null);



    /*********************************************************/


    return {
        data,
        setData
    }
}


export default useDataContext;