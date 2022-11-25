// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../utils/mongodb';

type ReqData = {
    content: string, 
    createdAt: Date,
    userID: string
}

type ResData = {
    message: string
} | {
    threadID: string
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
    const collection = client.db("interactive-comment-section").collection('comments');
    
    
    const doc = await collection.insertOne({
        type: 'THREAD',
        content: data.content,
        createdAt: data.createdAt,
        upvotes: [],
        downvotes: [],
        authorID: data.userID,
        replyIDs: []
    });  
    

    res.status(200).json({threadID: doc.insertedId.toString()});
}
