import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

if (!process.env.GITHUB_ID) {
    throw new Error('Invalid/Missing environment variable: "GITHUB_ID"')
}

if (!process.env.GITHUB_SECRET) {
    throw new Error('Invalid/Missing environment variable: "GITHUB_SECRET"')
}


export const authOptions = {  
    // Configure one or more authentication providers  
    providers: [    
        GithubProvider({      
            clientId: process.env.GITHUB_ID,      
            clientSecret: process.env.GITHUB_SECRET,    
        }),    // ...add more providers here  
    ],

    
}

export default NextAuth(authOptions)