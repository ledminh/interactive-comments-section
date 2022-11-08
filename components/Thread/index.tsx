import { FunctionComponent } from "react";
import { ThreadType } from "../../TypesAndInterfaces";
import Comment from "../Comment";

import styles from './Thread.module.scss';

const Thread:FunctionComponent<{data:ThreadType}> = ({data}) => {

    return (
        <div className={styles.Thread}>
            <div className={styles.mainComment}>
                <Comment 
                    type='THREAD'
                    id={data.id}
                    avatarURL={data.user.image.png}
                    authorName={data.user.username}
                    authorID={data.user.id}
                    createdAt={data.createdAt}
                    content={data.content}
                    score={data.score}
                />
            </div>
            {
                data.replies.length !== 0 ?
                <div className={styles.replies}>
                    {
                        data.replies.map(Rep => (
                            <Comment 
                                key={Rep.content}
                                type='REPLY'
                                id={Rep.id}
                                parentID={data.id}
                                avatarURL={Rep.user.image.png}
                                authorName={Rep.user.username}
                                authorID={Rep.user.id}
                                createdAt={Rep.createdAt}
                                content={Rep.content}
                                score={Rep.score}
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