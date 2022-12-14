import { useContext, useState } from "react";

import Image from 'next/image';

import styles from './AddComment.module.scss';
import { DataContext } from "../../useDataContext";
import { AddCommentType, DataContextType } from "../../TypesAndInterfaces";

const AddComment:AddCommentType = ({type, threadID, replyingTo, setShowAddComment}) => {
    
    const [comment, setComment] = useState('');    
    const {addThread, addReply, state} = useContext(DataContext) as DataContextType;
    
    
    const sendHandle = () => {
        if(comment === '') return;
        addThread(comment);
        setComment("");
    }

    const replyHandle = () => {
        if(comment === '') return;
        addReply(threadID as string, replyingTo as string, comment);
        setComment("");
        setShowAddComment? setShowAddComment(false): null;

    }



    return (
        <div className={styles.AddComment}>
            <textarea 
                className={styles.textArea}
                placeholder={type === 'THREAD'? "Add a comment ..." : 'Add a reply ...'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {
                state.loadingState === 'loaded' && state.data.currentUser !== null
                ?
                <div className={styles.avatar}>
                    <Image 
                        src={state.data.currentUser.image}
                        alt="avatar"
                        width="32"
                        height="32"
                    />
                </div>
                : null
            }

            <button className={styles.button}
                onClick={type === 'THREAD'? sendHandle: replyHandle}
                ariel-label={type === 'THREAD'? 'SEND BUTTON': 'REPLY BUTTON'}>           
                {type === 'REPLY'? 'REPLY' : 'SEND'}
            </button>
        </div>
    )
}

export default AddComment;