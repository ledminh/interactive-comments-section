import { FunctionComponent, useState, useContext } from "react";

import styles from './Comment.module.scss';

import { DataContext } from "../../useDataContext";
import { DataContextType } from "../../TypesAndInterfaces";

import IconPlus from '../../assets/images/icon-plus.svg';
import IconMinus from '../../assets/images/icon-minus.svg';

type ScoreType = FunctionComponent<{type:'THREAD'|'REPLY', id:string, parentID?:string, score:number}>  

const Score:ScoreType = ({type, id, parentID, score}) => {
    const {setScore} = useContext(DataContext) as DataContextType;

    return (
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
    )
}

export default Score;

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