import { FunctionComponent, useContext } from "react";
import { UIContext } from "../../useUIContext";

import styles from './DeleteModal.module.scss';

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
            <div className={styles.title}>Delete comment</div>
            <div className={styles.content}>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</div>
            <div className={styles.buttons}>
                <button className={styles.noButton}
                    onClick={noHandle}>
                    NO, CANCEL
                </button>
                <button className={styles.yesButton} 
                    onClick={yesHandle}>
                    YES, DELETE
                </button>
            </div>            
        </Modal>
    )
}

export default DeleteModal;
