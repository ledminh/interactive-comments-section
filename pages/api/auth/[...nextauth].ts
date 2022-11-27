import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongodb"


if (!process.env.GITHUB_ID) {
    throw new Error('Invalid/Missing environment variable: "GITHUB_ID"')
}

if (!process.env.GITHUB_SECRET) {
    throw new Error('Invalid/Missing environment variable: "GITHUB_SECRET"')
}


export type SessionType = Session & {
    user: {
        id: string
    }
}

export const authOptions:NextAuthOptions = {  
    // Configure one or more authentication providers  
    providers: [    
        GithubProvider({      
            clientId: process.env.GITHUB_ID,      
            clientSecret: process.env.GITHUB_SECRET,    
        }),    // ...add more providers here  
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.SECRET,


    callbacks: {
        async session({ session, token, user }):Promise<SessionType> {
            

            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id
                }
            } 
        }
    }


}

export default NextAuth(authOptions)