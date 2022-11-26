import { useSession, signIn, signOut } from "next-auth/react"

import Image from "next/image";

import styles from './AuthSection.module.scss';

import { UserInfo } from "../../TypesAndInterfaces";

export default function AuthSection() {  
    const { data: session } = useSession()  
    
    
    const content = session? (
        <>
            <div>
                <div className={styles.avatar}>
                    <Image 
                        src={session.user.image}
                        alt="avatar"
                        width="70"
                        height="70"
                    />
                </div>
                <div className={styles.username}>{session.user.name}</div>
            </div>        
            <button onClick={() => signOut()}>Sign out</button>      
        </> 
    ): (
        <>      
            <div className={styles.loginIntro}>
                If you have Github account, log in to add comment.
            </div>      
            <button onClick={() => signIn()}>Log in</button>    
        </>
    )

    return (
        <div className={styles.AuthSection}>
            {content}
        </div>
    )
}