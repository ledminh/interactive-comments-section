import { FunctionComponent, Dispatch, SetStateAction, Reducer } from "react";


/**************************
 * Data 
 */
type UserInfo = {
    'image': { 
        png: string,
        webp: string
    },
    'username': string
};

export type CommentType = {
    id: number,
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
    addThread: (content:string) => void
    upVote: (id:number) => void,
    downVote: (id:number) => void
}


/***********************************
 * Function/Component interfaces
 */
export type CommentComponent = FunctionComponent<{ id:number, avatarURL: string,authorName: string, createdAt: string, content: string, score: number, replyingTo?: string }>;

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
| {type: 'set-score', payload: {id:number, score: number}};

export type ReducerType = Reducer<StateType, ActionType>;