type UserInfo = {
    image: { 
        png: string,
        webp: string
    },
    username: string
};

export type Comment = {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: UserInfo,
    replies: {
        id: number,
        content: string,
        createdAt: string,
        score: number,
        replyingTo: string,
        user: UserInfo
    }[]
};

export type Data = {
    comments: Comment[]
}