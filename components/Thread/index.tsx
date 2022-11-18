import { FunctionComponent, useContext } from "react";
import { DataContextType, ThreadType } from "../../TypesAndInterfaces";
import { DataContext } from "../../useDataContext";
import AddComment from "../AddComment";
import Comment from "../Comment";

import styles from './Thread.module.scss';

const Thread:FunctionComponent<{threadData:ThreadType}> = ({threadData}) => {
    const {data} = useContext(DataContext) as DataContextType;

    return (
        data === null? null :
        <div className={styles.Thread}>
            <div className={styles.mainComment}>
                <Comment 
                    type='THREAD'
                    id={threadData.id}
                    avatarURL={threadData.user.image.png}
                    authorName={threadData.user.username}
                    authorID={threadData.user.id}
                    createdAt={threadData.createdAt}
                    content={threadData.content}
                    score={threadData.upvotes.length - threadData.downvotes.length}
                    upvote={threadData.upvotes.includes(data.currentUser.id)}
                    downvote={threadData.downvotes.includes(data.currentUser.id)}
                />
            </div>
            {
                threadData.replies.length !== 0 ?
                <div className={styles.replies}>
                    {
                        threadData.replies.map(Rep => (
                            <Comment 
                                key={Rep.createdAt + '-' + Rep.id}
                                type='REPLY'
                                id={Rep.id}
                                parentID={threadData.id}
                                avatarURL={Rep.user.image.png}
                                authorName={Rep.user.username}
                                authorID={Rep.user.id}
                                createdAt={Rep.createdAt}
                                content={Rep.content}
                                score={Rep.upvotes.length - Rep.downvotes.length}
                                upvote={Rep.upvotes.includes(data.currentUser.id)}
                                downvote={Rep.downvotes.includes(data.currentUser.id)}
                                replyingTo={Rep.replyingTo}
                            />
                        ))
                    }
                </div>
                :null
            }

        </div>
    );
}


export default Thread;