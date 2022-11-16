// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../utils/mongodb';

type ReqData = {
    content: string, 
    createdAt: string,
    parentThreadID: string,            
    userID: string,
    replyingTo: string
}

type ResData = {
    message: string
} | {
    replyID: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const data:ReqData = JSON.parse(req.body);   

    const client = await clientPromise;
    const db = client.db("interactive-comment-section");
    const comments = db.collection('comments');
    const users = db.collection('users');
    
    const originalUser = await users.findOne({username: data.replyingTo});

    
    
    const doc = await comments.insertOne({
        type: 'REPLY',
        content: data.content,
        createdAt: data.createdAt,
        score: 0,
        replyingToID: originalUser?._id.toString(), 
        authorID: data.userID
    });  
    
    const replyID = doc.insertedId.toString();

    const parentThread = await comments.findOne({
        _id: new ObjectId(data.parentThreadID)
    });

    if(parentThread !== null) {
        parentThread.replyIDs.push(replyID);
        
        comments.replaceOne({_id: new ObjectId(data.parentThreadID)},
            parentThread
        );
    }


    

    res.status(200).json({replyID: replyID});
}
