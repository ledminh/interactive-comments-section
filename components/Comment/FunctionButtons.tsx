import IconReply from '../../assets/images/icon-reply.svg';
import IconDelete from '../../assets/images/icon-delete.svg';
import IconEdit from '../../assets/images/icon-edit.svg';

import { FunctionComponent, useState, useContext } from "react";


import { DataContext } from "../../useDataContext";
import { DataContextType, FunctionButtonsType } from "../../TypesAndInterfaces";

import styles from './Comment.module.scss';
import { UIContext, uiControlType } from '../../useUIContext';


const FunctionButtons:FunctionButtonsType = ({authorID, commentType, threadID, replyID, setShowAddComment, showAddComment, setShowTextArea}) => {

    const {data, setCommentToDelete} = useContext(DataContext) as DataContextType;
    const {setShowDeleteModal} = useContext(UIContext) as uiControlType;

    const deleteHandle = () => {
        setCommentToDelete({commentType: commentType, 
                            threadID: threadID, 
                            replyID: commentType === 'REPLY'? replyID: undefined});        
        
        setShowDeleteModal(true);
    }

    const replyHandle = () => {
        setShowAddComment(!showAddComment);
    }

    const editHandle = () => {
        setShowTextArea(true);
    }

    return (
        <div className={styles.functions}>
            {
                data?.currentUser.id === authorID ?
                <>
                    <FunctionButton type = 'DELETE' onClick={() => deleteHandle()}/>
                    <FunctionButton type = 'EDIT' onClick={editHandle}/>
                </>
                : <FunctionButton type = 'REPLY' onClick={replyHandle}/>
            }
        </div>
    );
}

export default FunctionButtons;

/*********************************************/

type FunctionButtonType = FunctionComponent<{type: 'REPLY' | 'DELETE' | 'EDIT', onClick: () => void}>; 

const FunctionButton:FunctionButtonType = ({type, onClick, ...props}) => {
    const [hover, setHover] = useState(false);

    let styleName = type === 'REPLY'? 'reply': type === 'DELETE'? 'delete': 'edit',
        onHoverColor = type === 'REPLY'? '#C5C6EF': type === 'DELETE'? '#FFB8BB': '#C5C6EF',
        color = type === 'REPLY'? '#5357B6': type === 'DELETE'? '#ED6368': '#5357B6',
        text = type === 'REPLY'? 'Reply': type === 'DELETE'? 'Delete': 'Edit';
        

    return (
        <div className={styles[styleName]}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
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