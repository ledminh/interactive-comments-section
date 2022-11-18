// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ThreadType, UserInfo, ReplyType, DataType } from '../../TypesAndInterfaces';

import clientPromise from '../../utils/mongodb';


type ResData = {
    message: string
} | DataType

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {

    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }

    const data = await loadData();
    
    
    res.status(200).json(data);
}


const loadData = async () => {
    /************************************** */ 
    //Setup data
    const client = await clientPromise;
    const db = client.db("interactive-comment-section");
    

    /************************************** */
    // Load data
    const comments = await db
        .collection("comments")
        .find().toArray();
    
        
    const users = await db
        .collection("users")
        .find().toArray();

    /************************************** */
    //Prepare data
    
        //usersObj
    const usersObj:{[key:string]: UserInfo} = {};
    users.forEach(u => usersObj[u._id.toString()] = {
        id: u._id.toString(),
        image: {
            png: u.image.png,
            webp: u.image.webp
        },
        username: u.username
    });
    
        //repliessObj
    const repliesObj:{[key:string]: ReplyType} = {};
    
    comments.forEach(com => {
        if(com.type === 'REPLY') {
            repliesObj[com._id.toString()] = {
            id: com._id.toString(),
            content: com.content,
            createdAt: com.createdAt,
            replyingTo: usersObj[com.replyingToID].username,
            user: usersObj[com.authorID],
            upvotes: com.upvotes,
            downvotes: com.downvotes
            }
        }

    });


        // threads array
    const threads:ThreadType[] = [];
    
    comments.forEach((comment) => {
        if(comment.type === 'THREAD'){
    
            const thread:ThreadType = {
                id: comment._id.toString(),
                content: comment.content,
                createdAt: comment.createdAt,
                
                user: usersObj[comment.authorID],
                
                replies: (comment.replyIDs as string[]).filter(id => id !== '').map(id => repliesObj[id]),
                upvotes: comment.upvotes,
                downvotes: comment.downvotes
                
            }
        
            threads.push(thread);
        }
    });

    return {
        comments: threads,
        currentUser: {
            id: '636969580c2f2107e31bf931',
            "image": { 
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        }
    }
}