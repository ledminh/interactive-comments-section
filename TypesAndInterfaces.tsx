import { FunctionComponent, Dispatch, SetStateAction } from "react";

type UserInfo = {
    'image': { 
        png: string,
        webp: string
    },
    'username': string
};

type CommentType = {
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
    comments: ThreadType[]
}

export type CommentComponent = FunctionComponent<{ avatarURL: string,authorName: string, createdAt: string, content: string, score: number, replyingTo?: string }>;

export type DataContextType = {
    data: DataType | null,
    setData: Dispatch<SetStateAction<DataType | null >>

}