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
    user: UserInfo,
    upvotes: string[],
    downvotes: string[]
};

export interface ReplyType extends CommentType {
    replyingTo: string
}

export interface ThreadType extends CommentType {
    replies: ReplyType[]
}



export type DataType = {
    comments: ThreadType[] | [],
    currentUser: UserInfo | null
}

/******************
 * DataContext
 */

export type DataContextType = {
    state: StateType,
    reset: () => void,
    setLoading: () => void,
    addThread: (content:string) => void,
    vote: (voteType: 'UPVOTE' | 'DOWNVOTE', commentType: 'THREAD' | 'REPLY', id:string, parentID?:string) => void,
    setCommentToDelete: (commentToDelete:CommentToDeleteType) => void,
    deleteComment: () => void,
    addReply: (threadID:string, replyingTo:string, content:string) => void,
    setContent: (type:'THREAD'|'REPLY', id:string, content:string, parentID?:string) => void    
}

export type CommentToDeleteType = {
    commentType: 'THREAD' | 'REPLY', 
    threadID: string,
    replyID?: string
}


/***********************************
 * Function/Component interfaces
 */
export type CommentComponent = FunctionComponent<{ type: 'THREAD'|'REPLY', parentID?:string, id:string, avatarURL: string,authorName: string, authorID:string, createdAt: string, content: string, score: number, upvote: boolean, downvote: boolean, replyingTo?: string }>;

export type ModalComponent = FunctionComponent<{show:boolean, onClose?: () => void, children:JSX.Element[]|JSX.Element}>;

export type FunctionButtonsType = FunctionComponent<{authorID: string, commentType:'THREAD'|'REPLY', threadID: string, replyID:string, setShowAddComment: (s:boolean) => void, showAddComment:boolean, setShowTextArea: (s:boolean) => void}>;

export type AddCommentType = FunctionComponent<{type:'THREAD'|'REPLY', threadID?:string, replyingTo?:string, setShowAddComment?: (s:boolean) => void}>;


/********************
 *  useReducer
 */
 
export type StateType = {loadingState: 'notLoad'} 
| {
    loadingState: 'loaded' | 'loading',
    data: DataType
}

export type ActionType = {type:'set-data', payload: DataType}
| {type: 'set-threads', payload: {threads: ThreadType[]}}
| {type: 'reset'}
| {type: 'loading'}
| {type: 'set-current-user', payload: {currentUser:UserInfo}}
| {type: 'set-content/thread', payload: {id: string, content: string}}
| {type: 'set-content/reply', payload: {id:string, content:string, parentID:string}}
| {type: 'vote', payload: {voteType: 'UPVOTE' | 'DOWNVOTE', commentType: 'THREAD' | 'REPLY', id:string, parentID?:string }};

export type ReducerType = Reducer<StateType, ActionType>;