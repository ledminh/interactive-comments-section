import { FunctionComponent, useContext, useState } from "react";

import Image from 'next/image';

import styles from './AddComment.module.scss';
import { DataContext } from "../../useDataContext";
import { AddCommentType, DataContextType } from "../../TypesAndInterfaces";

const AddComment:AddCommentType = ({type, threadID, replyingTo, setShowAddComment}) => {
    
    const [comment, setComment] = useState('');    
    const {addThread, addReply, data} = useContext(DataContext) as DataContextType;
    
    const sendHandle = () => {
        if(comment === '') return;
        
        addThread(comment);
        setComment("");
    }

    const replyHandle = () => {
        if(comment === '') return;
        addReply(threadID, replyingTo, comment);
        setComment("");
        setShowAddComment(false);

    }

    return (
        <div className={styles.AddComment}>
            <textarea 
                className={styles.textArea}
                placeholder="Add a comment ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {
                data
                ?
                <div className={styles.avatar}>
                    <Image 
                        src={data.currentUser.image.png.slice(1)}
                        alt="avatar"
                        width="32"
                        height="32"
                    />
                </div>
                : null
            }

            <button className={styles.button}
                onClick={type === 'THREAD'? sendHandle: replyHandle}>           
                {type === 'REPLY'? 'REPLY' : 'SEND'}
            </button>
        </div>
    )
}

export default AddComment;