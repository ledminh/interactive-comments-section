import { FunctionComponent, useContext, useEffect } from "react";
import { UIContext, uiControlType } from "../../useUIContext";

import Modal from "./Modal";


const DeleteModal:FunctionComponent = () => {
    
    const uiControl = useContext(UIContext);


    if(uiControl === null) return null;
    
    const {showDeleteModal, setShowDeleteModal} = uiControl; 

    
    const noHandle = () => setShowDeleteModal(false);
    const yesHandle = () => {
        setShowDeleteModal(false);
    }

    return (
        <Modal show={showDeleteModal}>
            <div>Delete comment</div>
            <div>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</div>
            <div>
                <button onClick={noHandle}>
                    NO, CANCEL
                </button>
                <button onClick={yesHandle}>
                    YES, DELETE
                </button>
            </div>            
        </Modal>
    )
}

export default DeleteModal;
