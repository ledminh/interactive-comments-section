// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ThreadType } from '../../TypesAndInterfaces';

import clientPromise from '../../utils/mongodb';

type ReqData = {
    threadID: string,
    replyID: string
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
    
    await collection.deleteOne({_id: new ObjectId(data.replyID)});
    
    const thread = await collection.findOne({_id: new ObjectId(data.threadID)});

    if(thread !== null) {

        const newReplyIDs = thread.replyIDs.filter((id: string) => id !== data.replyID);
    
        await collection.updateOne({_id: new ObjectId(data.threadID)}, {
            $set: {
                replyIDs: newReplyIDs
            }
        });

        res.status(200).json({message: "Delete success!"});
    }    
    else {
        res.status(404).json({message: "Delete unsuccess!"});
    }


    

    
}
