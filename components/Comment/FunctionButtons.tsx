import IconReply from '../../assets/images/icon-reply.svg';
import IconDelete from '../../assets/images/icon-delete.svg';
import IconEdit from '../../assets/images/icon-edit.svg';

import { FunctionComponent, useState, useContext } from "react";


import { DataContext } from "../../useDataContext";
import { DataContextType } from "../../TypesAndInterfaces";

import styles from './Comment.module.scss';

const FunctionButtons:FunctionComponent<{authorID: string}> = ({authorID}) => {

    const {data} = useContext(DataContext) as DataContextType;

    return (
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
    );
}

export default FunctionButtons;

/*********************************************/

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