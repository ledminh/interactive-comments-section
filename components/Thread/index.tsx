import { FunctionComponent, useContext, useEffect } from "react";
import { DataContextType, ThreadType } from "../../TypesAndInterfaces";
import { DataContext } from "../../useDataContext";
import AddComment from "../AddComment";
import Comment from "../Comment";

import styles from './Thread.module.scss';

const Thread:FunctionComponent<{threadData:ThreadType}> = ({threadData}) => {
    const {state} = useContext(DataContext) as DataContextType;

    return (
        state.loadingState === 'notLoad'? null :
        <div className={styles.Thread}>
            <div className={styles.mainComment}>
                <Comment 
                    type='THREAD'
                    id={threadData.id}
                    avatarURL={threadData.user.image}
                    authorName={threadData.user.username}
                    authorID={threadData.user.id}
                    createdAt={threadData.createdAt}
                    content={threadData.content}
                    score={threadData.upvotes.length - threadData.downvotes.length}
                    upvote={state.data.currentUser === null? false : threadData.upvotes.includes(state.data.currentUser.id)}
                    downvote={state.data.currentUser === null? false : threadData.downvotes.includes(state.data.currentUser.id)}
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
                                avatarURL={Rep.user.image}
                                authorName={Rep.user.username}
                                authorID={Rep.user.id}
                                createdAt={Rep.createdAt}
                                content={Rep.content}
                                score={Rep.upvotes.length - Rep.downvotes.length}
                                upvote={state.data.currentUser === null? false :Rep.upvotes.includes(state.data.currentUser.id)}
                                downvote={state.data.currentUser === null? false : Rep.downvotes.includes(state.data.currentUser.id)}
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