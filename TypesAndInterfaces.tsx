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
    setScore: ((type:'THREAD'|'REPLY', id:string, score:number, parentID?:string) => void),
    setCommentToDelete: (commentToDelete:CommentToDeleteType) => void,
    deleteComment: () => void,
    addReply: (threadID:string, replyingTo:string, content:string) => void
    
}

export type CommentToDeleteType = {
    commentType: 'THREAD' | 'REPLY', 
    threadID: string,
    replyID?: string
}


/***********************************
 * Function/Component interfaces
 */
export type CommentComponent = FunctionComponent<{ type: 'THREAD'|'REPLY', parentID?:string, id:string, avatarURL: string,authorName: string, authorID:string, createdAt: string, content: string, score: number, replyingTo?: string }>;

export type ModalComponent = FunctionComponent<{show:boolean, onClose?: () => void, children:JSX.Element[]|JSX.Element}>;

export type FunctionButtonsType = FunctionComponent<{authorID: string, commentType:'THREAD'|'REPLY', threadID: string, replyID:string, setShowAddComment: (s:boolean) => void}>;

export type AddCommentType = FunctionComponent<{type:'THREAD'}> | FunctionComponent<{type:'REPLY', threadID:string, replyingTo:string, setShowAddComment: (s:boolean) => void}>;


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
| {type: 'set-score/thread', payload: {id:string, score: number}}
| {type: 'set-score/reply', payload: {id:string, score: number, parentID: string}}
| {type: 'delete/thread', payload: {threadID:string}}
| {type: 'delete/reply', payload: {threadID:string, replyID:string}}
| {type: 'add-reply', payload: {threadID: string, reply: ReplyType}};

export type ReducerType = Reducer<StateType, ActionType>;