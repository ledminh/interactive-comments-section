import { useState, createContext } from "react";


type uiControlType = {
    showDeleteModal: boolean,
    setShowDeleteModal: (s:boolean) => void
}


export const UIContext = createContext<uiControlType|null>(null);


const useUIContext = () => {
    //Modals
    const [showDeleteModal, setShowDeleteModal] = useState(false);



    return {
        showDeleteModal,
        setShowDeleteModal,
    }
}


export default useUIContext;