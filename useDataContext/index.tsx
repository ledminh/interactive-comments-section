import { useRouter } from "next/router";
import { createContext, useReducer, useState} from "react";
import { idText } from "typescript";
import { threadId } from "worker_threads";

import { DataContextType, StateType, ActionType, DataType, ReducerType, ThreadType, ReplyType, CommentToDeleteType } from "../TypesAndInterfaces";
import generateID from "../utils/generateID";



export const DataContext = createContext<DataContextType|null>(null);


const initState:StateType = {isLoaded: false};


const reducer:ReducerType = (state:StateType, action:ActionType) =>  {

    switch (action.type) {
        case 'set-data':
            return {
                isLoaded: true,
                data: action.payload
            };
        
        case 'set-content/thread':
            if(!state.isLoaded) return state;

            {
                const newThreads = state.data.comments.slice();
                const thread = newThreads.find(t => t.id === action.payload.id);

                if(thread === undefined) return state;

                thread.content = action.payload.content;

                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                };

                return newState;
            }
        
        case 'set-content/reply':
            if(!state.isLoaded) return state;

            {
                const newThreads = state.data.comments.slice();
                const thread = newThreads.find(t => t.id === action.payload.parentID);

                if(thread === undefined) return state;

                const reply = thread.replies.find(r => r.id === action.payload.id);

                if(reply === undefined) return state;


                reply.content = action.payload.content;

                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                };

                return newState;
            }
        

        case 'set-score/thread':
            if(!state.isLoaded)
                return state;
            {
                const newThreads = state.data.comments.slice();
    
                const thread = newThreads.find(t => t.id === action.payload.id);
                
                (thread as ThreadType).score = action.payload.score;

                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                }

                return newState;
            }
        
        case 'set-score/reply':
            if(!state.isLoaded)
                return state;
            {
                const newThreads = state.data.comments.slice();

                const thread = newThreads.find(t => t.id === action.payload.parentID);
                
                const reply = (thread as ThreadType).replies.find(rep => rep.id === action.payload.id);
                
                (reply as ReplyType).score = action.payload.score; 

                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                }

                return newState;
            }
        
        case 'delete/thread': 
            if(!state.isLoaded) return state;

            {

                const newThreads = state.data.comments.filter(t => t.id !== action.payload.threadID);

                return {
                    ...state,
                    data : {
                        ...state.data,
                        comments: newThreads
                    }
                }

            }


        case 'delete/reply':
            if(!state.isLoaded) return state;

            {
                const newThreads = state.data.comments.slice();

                const thread  = newThreads.find(t => t.id === action.payload.threadID);

                if(thread !== undefined){
                    thread.replies = thread.replies.filter(r => r.id !== action.payload.replyID);
                    return {
                        ...state,
                        data: {
                            ...state.data,
                            comments: newThreads
                        }
                    }
                }

                return state
            }
        
        default:
            throw new Error();
    }

}


const useDataContext: () => DataContextType = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    const [commentToDelete, setCommentToDelete] = useState<CommentToDeleteType|null>(null);
    
    const router = useRouter();

    /*********************************************************/

    const setData = (data:DataType) => dispatch({
        type: 'set-data',
        payload: data
    });

    const addThread = (content:string) => {
        if(state.isLoaded) {
            const threadToDatabase = {
                content: content, 
                createdAt: (new Date()).toUTCString(),
                userID: state.data.currentUser.id            }
            
            fetch("/api/add-thread",
            {
                method: "POST",
                body: JSON.stringify(threadToDatabase)
            })
            .then(res => res.json())
            .then(()  => router.reload())
        }
    }
    
    
    function setScore (type:'THREAD'|'REPLY', id:string, score:number, parentID?:string):void {
        if(!state.isLoaded) return;
        
        if(type === 'THREAD')
            dispatch({type:'set-score/thread', payload:{id:id, score: score}})
        else {
            dispatch({type:'set-score/reply', payload:{id:id, score: score, parentID:parentID as string}})
        }
    }

    
    function deleteComment () {
        if(!state.isLoaded || commentToDelete === null) return;

        if(commentToDelete.commentType === 'THREAD'){
            dispatch({type:'delete/thread', payload:{threadID:commentToDelete.threadID}});
        }
        else {
            dispatch({type:'delete/reply', payload:{threadID:commentToDelete.threadID, replyID:commentToDelete.replyID as string}})
        }
    } 

    function addReply (threadID:string, replyingTo:string, content:string) {

        if(state.isLoaded) {        

            const replyToDatabase = {
                content: content, 
                createdAt: (new Date()).toUTCString(),
                parentThreadID: threadID,            
                userID: state.data.currentUser.id,
                replyingTo: replyingTo
            }
                        
            fetch("/api/add-reply",
            {
                method: "POST",
                body: JSON.stringify(replyToDatabase)
            })
            .then(res => res.json())
            .then(()  => router.reload());
            
            

        }
    }

    function setContent (type:'THREAD'|'REPLY', id:string, content:string, parentID?:string) {
        if(type === 'THREAD') {
            dispatch({type:'set-content/thread', payload:{id:id, content:content}})
        }
        else {
            dispatch({type: 'set-content/reply', payload:{id:id, content:content, parentID: parentID as string}})
        }
    }


    return {
        data: state.isLoaded? state.data : null,
        setData,
        addThread,
        setScore,
        setCommentToDelete,
        deleteComment,
        addReply,
        setContent
    }
}


export default useDataContext;