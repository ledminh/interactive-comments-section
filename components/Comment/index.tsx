
import styles from './Comment.module.scss';
import Image from "next/image";


import IconPlus from '../../assets/images/icon-plus.svg';
import IconMinus from '../../assets/images/icon-minus.svg';
import IconReply from '../../assets/images/icon-reply.svg';

import { CommentComponent, DataContextType } from "../../TypesAndInterfaces";
import { FunctionComponent, useContext, useState, useEffect } from 'react';

import timeConvert from '../../utils/timeConvert';
import { DataContext } from '../../useDataContext';


const Comment:CommentComponent = ({type, id, parentID, avatarURL, authorName, authorID, createdAt, content, score, replyingTo}) => {

    const {data, setScore} = useContext(DataContext) as DataContextType;

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
                {
                    data?.currentUser.id === authorID ?
                    <span className={styles.you}>you</span>
                    : null
                }
                <span className={styles.createdAt}>
                    {timeConvert(Date.parse(createdAt))}
                </span>
            </div>
            <div className={styles.content}>
                {content}
            </div>
            <div className={styles.footer}>
                <div className={styles.score}>
                    <Button type="PLUS"
                        onClick={() => {
                            setScore(type, id, score + 1, parentID);
                        }}
                    />
                    <span>{score}</span>
                    <Button type="MINUS"
                        onClick={() => {
                            if(score === 0) return;
                            
                            setScore(type, id, score - 1, parentID);
                        }}
                    />
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

type PlusMinusButtonType = FunctionComponent<{type:"PLUS"|"MINUS", onClick: () => void}>; 

const Button:PlusMinusButtonType = ({type, ...props}) => {
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