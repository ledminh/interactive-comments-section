
import styles from './Comment.module.scss';
import Image from "next/image";


import IconPlus from '../../assets/images/icon-plus.svg';
import IconMinus from '../../assets/images/icon-minus.svg';
import IconReply from '../../assets/images/icon-reply.svg';
import IconDelete from '../../assets/images/icon-delete.svg';
import IconEdit from '../../assets/images/icon-edit.svg';


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
                    {
                        data?.currentUser.id === authorID ?
                        <>
                            <FunctionButton type = 'DELETE' />
                            <FunctionButton type = 'EDIT' />
                        </>
                        : <FunctionButton type = 'REPLY' />
                    }
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


type FunctionButtonType = FunctionComponent<{type: 'REPLY' | 'DELETE' | 'EDIT'}>; 

const FunctionButton:FunctionButtonType = ({type, ...props}) => {
    const [hover, setHover] = useState(false);

    let styleName = type === 'REPLY'? 'reply': type === 'DELETE'? 'delete': 'edit',
        onHoverColor = type === 'REPLY'? '#C5C6EF': type === 'DELETE'? '#FFB8BB': '#C5C6EF',
        color = type === 'REPLY'? '#5357B6': type === 'DELETE'? '#ED6368': '#5357B6',
        text = type === 'REPLY'? 'Reply': type === 'DELETE'? 'Delete': 'Edit';
        

    return (
        <div className={styles[styleName]}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...props}
        >
            {
                type === 'REPLY'?
                <IconReply
                    fill={hover? onHoverColor: color}
                />: type === 'DELETE'?
                <IconDelete
                    fill={hover? onHoverColor: color}
                />: <IconEdit
                    fill={hover? onHoverColor: color}
                />
            }
            
            <span>{text}</span>
        </div>
    )
}