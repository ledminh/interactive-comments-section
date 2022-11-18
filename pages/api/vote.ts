// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../utils/mongodb';

type ReqData = {
    voteType: 'UPVOTE' | 'DOWNVOTE',
    id: string,
    userID: string
}

type ResData = {
    message: string
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
    

    
    const doc = await collection.findOne({_id: new ObjectId(data.id)});  
    if(doc !== null) {
        
        if(data.voteType === 'UPVOTE') {
            if(!doc.upvotes.includes(data.userID)) {
                const upvotes = [...doc.upvotes, data.userID],
                    downvotes = doc.downvotes.filter((id:string) => id !== data.userID);
                    
                    await collection.findOneAndUpdate({_id: new ObjectId(data.id)}, {
                        $set: {
                            upvotes: upvotes,
                            downvotes: downvotes
                        }
                    });
        
                    res.status(200).json({message: 'Vote success'});
            }
            else {
                res.status(404).json({message: "Vote unsuccess!"});

            }
            
        }
        else {
            if(!doc.downvotes.includes(data.userID)) {
                const downvotes = [...doc.downvotes, data.userID],
                    upvotes = doc.upvotes.filter((id:string) => id !== data.userID);
                    
                    await collection.findOneAndUpdate({_id: new ObjectId(data.id)}, {
                        $set: {
                            upvotes: upvotes,
                            downvotes: downvotes
                        }
                    });
        
                    res.status(200).json({message: 'Vote success'});
            }
            else {
                res.status(404).json({message: "Vote unsuccess!"});

            }

        }

    }
    else {
        res.status(404).json({message: "Vote unsuccess!"});

    }
    
    

    
}
