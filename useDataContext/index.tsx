import { createContext, useEffect, useReducer, useState} from "react";

import { DataContextType, CommentToDeleteType, UserInfo } from "../TypesAndInterfaces";

import reducer, {initState} from "./reducer";

import { useSession } from "next-auth/react";


export const DataContext = createContext<DataContextType|null>(null);

const useDataContext: () => DataContextType = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    const [commentToDelete, setCommentToDelete] = useState<CommentToDeleteType|null>(null);
    
    const { data: session } = useSession();  

    
    useEffect(() => {
        setLoading();
        loadThreads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if(session) {
            fetch('/api/get-user',
            {
                method: "POST",
                body: JSON.stringify({
                    username: session.user.name,
                    email: session.user.email,
                    image: session.user.image
                })
            })
            .then(res => res.json())
            .then(({currentUser}) => {
                setCurrentUser(currentUser);
            })
        }
    }, [session]);




    const loadThreads = () => {
        fetch('/api/get-threads')
        .then(res => res.json())
        .then(threads => dispatch({
            type: 'set-threads',
            payload: {threads: threads}
        })).catch(e => console.log(e));
    }

    /*********************************************************/

    const addThread = (content:string) => {       
        console.log(state);
        
        if(state.loadingState === 'notLoad' || state.data.currentUser === null) return; 
        

        const threadToDatabase = {
            content: content, 
            createdAt: (new Date()).toUTCString(),
            userID: state.data.currentUser.id            
        }
        
        setLoading();

        fetch("/api/add-thread",
        {
            method: "POST",
            body: JSON.stringify(threadToDatabase)
        })
        .then(() => loadThreads());
    }
    
    function addReply (threadID:string, replyingTo:string, content:string) {
        if(state.loadingState === 'notLoad' || state.data.currentUser === null) return; 

        const replyToDatabase = {
            content: content, 
            createdAt: (new Date()).toUTCString(),
            parentThreadID: threadID,            
            userID: state.data.currentUser.id,
            replyingTo: replyingTo
        }
        setLoading();

        fetch("/api/add-reply",
        {
            method: "POST",
            body: JSON.stringify(replyToDatabase)
        })
        .then(() => loadThreads());
        

    }

    function vote(voteType: 'UPVOTE' | 'DOWNVOTE', commentType: 'THREAD' | 'REPLY', id:string, parentID?:string) {
        if(state.loadingState === 'notLoad' || state.data.currentUser === null) return; 

        setLoading();

        fetch('/api/vote',
            {
                method: 'POST',
                body: JSON.stringify({
                    voteType: voteType,
                    id: id,
                    userID: state.data.currentUser.id
                })
            }
        ).then(res => res.json())
        .then(() => {
            dispatch({
                type: 'vote',
                payload: {
                    voteType: voteType,
                    commentType: commentType,
                    id: id,
                    parentID: parentID
                }
            })
        });
            

    }
    
    function deleteComment () {
        if(state.loadingState === 'notLoad' || commentToDelete === null) return;

        setLoading();

        if(commentToDelete.commentType === 'THREAD'){
            
            fetch("/api/delete-thread",
            {
                method: "POST",
                body: JSON.stringify({
                    threadID: commentToDelete.threadID
                })
            })
            .then(()  => loadThreads())         
        }
        else {
            fetch("/api/delete-reply",
            {
                method: "POST",
                body: JSON.stringify({
                    threadID: commentToDelete.threadID,
                    replyID:commentToDelete.replyID as string
                })
            })
            .then(()  => loadThreads())
        }
    } 

    function setContent (type:'THREAD'|'REPLY', id:string, content:string, parentID?:string) {
        
        const reqData = {
            id: id,
            content: content
        }
        
        setLoading();

        fetch("/api/set-content",
        {
            method: "POST",
            body: JSON.stringify(reqData)
        })
        .then(() =>  {
            if(type === 'THREAD') {
                dispatch({
                    type:'set-content/thread', 
                    payload:{id:id, content:content}
                    })
            }
            else {
                dispatch({
                    type: 'set-content/reply', 
                    payload:{id:id, content:content, parentID: parentID as string}})
            }
        });
    }

    const reset = () => dispatch({type: 'reset'});
    const setLoading = () => {
        dispatch({type: 'loading'})
        
    };

    
    const setCurrentUser = (currentUser:UserInfo) => dispatch({type: 'set-current-user', payload: {currentUser: currentUser}})

    return {
        state,
        loadThreads,
        reset,
        setLoading,
        setCurrentUser,
        addThread,
        vote,
        setCommentToDelete,
        deleteComment,
        addReply,
        setContent
    }
}


export default useDataContext;