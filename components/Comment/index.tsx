
import styles from './Comment.module.scss';
import Image from "next/image";


import IconPlus from '../../assets/images/icon-plus.svg';
import IconMinus from '../../assets/images/icon-minus.svg';
import IconReply from '../../assets/images/icon-reply.svg';

import { CommentComponent } from "../../TypesAndInterfaces";
import { FunctionComponent, useEffect, useState } from 'react';

import timeConvert from '../../utils/timeConvert';


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
                <span className={styles.authorName}>
                    {authorName}
                </span>
                <span className={styles.createdAt}>
                    {timeConvert(Date.parse(createdAt))}
                </span>
            </div>
            <div className={styles.content}>
                {content}
            </div>
            <div className={styles.footer}>
                <div className={styles.score}>
                    <Button type="PLUS"/>
                    <span>{score}</span>
                    <Button type="MINUS"/>
                </div>
                <div className={styles.functions}>
                    <Reply />
                </div>
            </div>
        </div>
    )

}

export default Comment;


/**************************************/

const Button:FunctionComponent<{type:"PLUS"|"MINUS"}> = ({type, ...props}) => {
    const [hover, setHover] = useState(false);


    return (
        <button
            {...props}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >
            {
                type === 'PLUS'? 
                    <IconPlus
                        fill={hover? '#5357B6' : '#C5C6EF'}
                    /> : 
                    <IconMinus
                        fill={hover? '#5357B6' : '#C5C6EF'}
                    /> 
            }
        </button>
    )
}

const Reply:FunctionComponent = (props) => {
    const [hover, setHover] = useState(false);

    return (
        <div className={styles.reply}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...props}
        >
            <IconReply
                fill={hover? '#C5C6EF': '#5357B6'}
            />
            <span>Reply</span>
        </div>
    )
}