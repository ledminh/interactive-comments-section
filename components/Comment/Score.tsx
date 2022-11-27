import { FunctionComponent, useState, useContext } from "react";

import styles from './Comment.module.scss';

import { DataContext } from "../../useDataContext";
import { DataContextType } from "../../TypesAndInterfaces";

import IconPlus from '../../assets/images/icon-plus.svg';
import IconMinus from '../../assets/images/icon-minus.svg';

type ScoreType = FunctionComponent<{type:'THREAD'|'REPLY', id:string, parentID?:string, score:number, upvote: boolean, downvote: boolean}>  

const Score:ScoreType = ({type, id, parentID, score, upvote, downvote}) => {
    const {vote, state} = useContext(DataContext) as DataContextType;

    return (
        <div className={styles.score}>
            <Button type="UPVOTE"
                highlight={state.loadingState !== 'notLoad' && state.data.currentUser !== null? upvote: false}
                onClick={() => {
                    if(state.loadingState !== 'notLoad' && state.data.currentUser !== null && !upvote) {
                        vote('UPVOTE', type, id, parentID);
                    }                        
                }}
            />
            <span>{score}</span>
            <Button type="DOWNVOTE"
                highlight={state.loadingState !== 'notLoad' && state.data.currentUser !== null? downvote: false}
                onClick={() => {
                    if(state.loadingState !== 'notLoad' && state.data.currentUser !== null && !downvote) {
                        vote('DOWNVOTE', type, id, parentID);
                    }    
                }}
            />
        </div>
    )
}

export default Score;

/**************************************/

type PlusMinusButtonType = FunctionComponent<{type:"UPVOTE"|"DOWNVOTE", onClick: () => void, highlight: boolean}>; 

const Button:PlusMinusButtonType = ({type, highlight, ...props}) => {
    const [hover, setHover] = useState(false);


    return (
        <button
            {...props}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ariel-label={type === 'UPVOTE'? 'vote down' : 'vote up'}
            >
            {
                type === 'UPVOTE'? 
                    <IconPlus
                        fill={hover || highlight? '#5357B6' : '#C5C6EF'}
                    /> : 
                    <IconMinus
                        fill={hover || highlight? '#5357B6' : '#C5C6EF'}
                    /> 
            }
        </button>
    )
}