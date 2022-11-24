import { useSession, signIn, signOut } from "next-auth/react"

import styles from './AuthSection.module.scss';

export default function AuthSection() {  
    const { data: session } = useSession()  
    
    
    const content = session? (
        <>        
            <button onClick={() => signOut()}>Sign out</button>      
        </> 
    ): (
        <>      
            Not signed in <br />      
            <button onClick={() => signIn()}>Sign in</button>    
        </>
    )

    return (
        <div className={styles.AuthSection}>
            {content}
        </div>
    )
}