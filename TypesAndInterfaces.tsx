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

interface ReplyType extends CommentType {
    replyingTo: string
}

export interface ThreadType extends CommentType {
    replies: ReplyType[]
}



export type DataType = {
    comments: ThreadType[]
}