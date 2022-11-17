// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../utils/mongodb';

type ReqData = {
    type: 'THREAD' | 'REPLY',
    content: string,    
    id: string,
    parentID?: string

}

type ResData = {
    message: string
}; 

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
    
    await collection.updateOne({_id: new ObjectId(data.id)}, {
        $set: {
            content: data.content
        }
    });

    res.status(200).json({message: "Update success!"});
    
}
