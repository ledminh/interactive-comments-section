import { FunctionComponent, Dispatch, SetStateAction, Reducer } from "react";


/**************************
 * Data 
 */
export type UserInfo = {
    id: string,
    'image': { 
        png: string,
        webp: string
    },
    'username': string
};

export type CommentType = {
    id: string,
    content: string,
    createdAt: string,
    score: number,
    user: UserInfo,
};

export interface ReplyType extends CommentType {
    replyingTo: string
}

export interface ThreadType extends CommentType {
    replies: ReplyType[]
}



export type DataType = {
    comments: ThreadType[],
    currentUser: UserInfo
}

/******************
 * DataContext
 */

export type DataContextType = {
    data: DataType | null,
    setData: (data:DataType) => void| null,
    addThread: (content:string) => void,
    setScore: ((type:'THREAD'|'REPLY', id:number, score:number, parentID?:number) => void)
    
}


/***********************************
 * Function/Component interfaces
 */
export type CommentComponent = FunctionComponent<{ type: 'THREAD'|'REPLY', parentID?:number, id:number, avatarURL: string,authorName: string, createdAt: string, content: string, score: number, replyingTo?: string }>;

export type ModalComponent = FunctionComponent<{show:boolean, onClose?: () => void, children:JSX.Element[]|JSX.Element}>;

/********************
 *  useReducer
 */
 
export type StateType = {isLoaded: false} 
| {
    isLoaded: true,
    data: DataType
}

export type ActionType = {type:'set-data', payload: DataType}
| {type: 'add-thread', payload: ThreadType}
| {type: 'set-score/thread', payload: {id:number, score: number}}
|{type: 'set-score/reply', payload: {id:number, score: number, parentID: number}};

export type ReducerType = Reducer<StateType, ActionType>;