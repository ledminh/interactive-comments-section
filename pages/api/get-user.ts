// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserInfo } from '../../TypesAndInterfaces';

import clientPromise from '../../utils/mongodb';

type ReqData = {
    username: string
}

type ResData = {
    message: string
}| {
    currentUser: UserInfo
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
    const users = client.db("interactive-comment-section").collection('users');
    
    const user = await users.findOne({username: data.username});

    if(user === null)
        res.status(404).json({message: "User not found!"});
    else {
        const currentUser = {
            id: user._id.toString(),
            image: {
                png: user.image.png,
                webp: user.image.webp
            },
            username: user.username
        }

        res.status(200).json({
            currentUser: currentUser
        });
    }





    // const thread = await collection.findOne({_id: new ObjectId(data.threadID)})
    
    // if(thread !== null) {
    //     await collection.deleteMany({
    //         _id: {
    //             $in: (thread.replyIDs as string[]).map(id => new ObjectId(id))
    //         }
    //     });

    //     await collection.deleteOne({_id: thread._id});
    
    //     res.status(204).json({message: 'Delete success!'});
    // }
    // else {
    //     res.status(404).json({message: "Delete unsuccess!"});
    // }


    

    
}
