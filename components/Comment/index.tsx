
import styles from './Comment.module.scss';
import Image from "next/image";


import iconPlus from '../../assets/images/icon-plus.svg';
import iconMinus from '../../assets/images/icon-minus.svg';
import iconReply from '../../assets/images/icon-reply.svg';

import { CommentComponent } from "../../TypesAndInterfaces";


const Comment:CommentComponent = ({avatarURL, authorName, createdAt, content, score, replyingTo}) => {


    return (
        <div className={styles.Comment}>
            <div className={styles.meta}>
                <div className={styles.avatar}>
                    <Image 
                        src={avatarURL.slice(1)}
                        alt={authorName + "'s avatar"}
                        width="32"
                        height="32"
                    />
                </div>
                <span className={styles.authorName}>{authorName}</span>
                <span className={styles.createdAt}>{createdAt}</span>
            </div>
            <div className={styles.content}>
                {
                    content
                }
            </div>
            <div className={styles.footer}>
                <div className={styles.score}>
                    <button>
                        <Image
                            src={iconPlus}
                            alt="add score"
                        />
                    </button>
                    <span>{score}</span>
                    <button>
                        <Image
                            src={iconMinus}
                            alt="minus score"
                        />
                    </button>
                </div>
                <div className={styles.functions}>
                    <div className={styles.reply}>
                        <div className={styles.replyIcon}>
                            <Image 
                                src={iconReply}
                                alt="Reply icon"
                            />
                        </div>
                        <span>Reply</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Comment;