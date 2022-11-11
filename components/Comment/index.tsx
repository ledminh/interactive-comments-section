
import styles from './Comment.module.scss';
import Image from "next/image";




import { CommentComponent, DataContextType } from "../../TypesAndInterfaces";
import { FunctionComponent, useContext, useRef, useState } from 'react';

import timeConvert from '../../utils/timeConvert';
import { DataContext } from '../../useDataContext';
import FunctionButtons from './FunctionButtons';
import Score from './Score';
import AddComment from '../AddComment';


const Comment:CommentComponent = ({type, id, parentID, avatarURL, authorName, authorID, createdAt, content, score, replyingTo}) => {

    const {data} = useContext(DataContext) as DataContextType;
    const [showAddComment, setShowAddComment] = useState(false);

    const textArea = useRef<HTMLTextAreaElement>(null);
    const [textAreaValue, setTextAreaValue] = useState(content);
    const [showTextArea, _setShowTextArea] = useState(false);

    const setShowTextArea = () => {
        textArea.current?.focus();
        _setShowTextArea(true);
    }



    return (
        <>
            <div className={styles.Comment}>
                <div className={styles.meta}>
                    <Avatar 
                        avatarURL={avatarURL}  
                        authorName={authorName}
                    />
                    <AuthorName authorName={authorName}/>
                    <You show={data?.currentUser.id === authorID} />
                    <CreatedAt createdAt={createdAt} />
                </div>
                
                {
                    showTextArea?
                    <textarea 
                        className={styles.textArea}
                        value={textAreaValue}
                        ref={textArea}
                        onChange={(e) => setTextAreaValue(e.target.value)}
                    />: <Content 
                            replyingTo={replyingTo}
                            content={content}
                            />
                }

                <div className={styles.footer}>
                    <Score 
                        type={type} 
                        id={id} 
                        parentID={parentID} 
                        score={score} 
                        />
                    <FunctionButtons 
                        authorID={authorID}
                        commentType={type} 
                        threadID={type === 'THREAD'? id : parentID as string}  
                        replyID={id}
                        setShowAddComment={setShowAddComment}
                        setShowTextArea={setShowTextArea}
                        />
                </div>
            </div>

            <></>
            
            <div className={styles.Comment_fullscreen}>
                <div className={styles.side}>
                    <Score 
                        type={type} 
                        id={id} 
                        parentID={parentID} 
                        score={score} 
                        />
                </div>
                <div className={styles.main}>
                    <div className={styles.meta}>
                        <Avatar 
                            avatarURL={avatarURL}  
                            authorName={authorName}
                        />
                        <AuthorName authorName={authorName}/>
                        <You show={data?.currentUser.id === authorID} />
                        <CreatedAt createdAt={createdAt} />
                        <FunctionButtons 
                            authorID={authorID}
                            commentType={type} 
                            threadID={type === 'THREAD'? id : parentID as string}  
                            replyID={id}
                            setShowAddComment={setShowAddComment}
                            setShowTextArea={setShowTextArea}
                            />
                            
                    </div>
                    {
                        showTextArea?
                        <textarea 
                            className={styles.textArea}
                            value={textAreaValue}
                            ref={textArea}
                            onChange={(e) => setTextAreaValue(e.target.value)}
                        />: <Content 
                                replyingTo={replyingTo}
                                content={content}
                                />
                    }                   
                </div>
            </div>
            {
                showAddComment? 
                <AddComment
                    type='REPLY'
                    threadID={type === 'THREAD'? id : parentID as string}
                    replyingTo={authorName}
                    setShowAddComment={setShowAddComment}
                /> : null
            }

        </>
    )

}

export default Comment;


/**************************************/


const Avatar:FunctionComponent<{avatarURL:string, authorName:string}> = ({avatarURL, authorName}) => {

    return (
        <div className={styles.avatar}>
            <Image 
                src={avatarURL.slice(1)}
                alt={authorName + "'s avatar"}
                width="32"
                height="32"
            />
        </div>
    );
}


const AuthorName:FunctionComponent<{authorName:string}> = ({authorName}) => {

    return (
        <span className={styles.authorName}>
            {authorName}
        </span>
    )
}

const You:FunctionComponent<{show:boolean}> = ({show}) => {
    if(show) return <span className={styles.you}>you</span>;
    else return null;
}


const CreatedAt:FunctionComponent<{createdAt: string}> = ({createdAt}) => {

    return (
        <span className={styles.createdAt}>
            {timeConvert(Date.parse(createdAt))}
        </span>
    )
}

const Content:FunctionComponent<{content:string, replyingTo:string|undefined}> = ({content, replyingTo}) => {

    return (
        <div className={styles.content}>
            <span className={styles.replyingTo}>{replyingTo? '@' + replyingTo + ' ' : ''}</span>
            <span>{content}</span>
        </div>
    );
} 