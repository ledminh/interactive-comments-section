import { createContext, useReducer, useState} from "react";

import { DataContextType, StateType, ActionType, DataType, ReducerType, CommentToDeleteType, UserInfo } from "../TypesAndInterfaces";



export const DataContext = createContext<DataContextType|null>(null);


const initState:StateType = {isLoaded: false};


const reducer:ReducerType = (state:StateType, action:ActionType) =>  {

    switch (action.type) {
        case 'set-data':
            return {
                isLoaded: true,
                data: action.payload
            };
        
        case 'set-current-user':
            if(!state.isLoaded) return state;

            return {
                ...state,
                data: {
                    ...state.data,
                    currentUser: action.payload.currentUser
                }
            }
        
        case 'reset': 
            return initState;

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

        case 'vote' :
            if(!state.isLoaded) return state;
            
            {
                const newThreads = state.data.comments.slice();

                

                if(action.payload.commentType === 'THREAD') {
                    const thread = newThreads.find(t => t.id === action.payload.id);

                    if(thread === undefined) return state;
                    
                    if(action.payload.voteType === 'UPVOTE') {
                        if(!thread.upvotes.includes(state.data.currentUser.id)){
                            thread.upvotes.push(state.data.currentUser.id);
                            thread.downvotes = thread.downvotes.filter(id => id !== state.data.currentUser.id);
                        }
                    }
                    else {
                        if(!thread.downvotes.includes(state.data.currentUser.id)) {
                            thread.downvotes.push(state.data.currentUser.id);
                            thread.upvotes = thread.upvotes.filter(id => id !== state.data.currentUser.id);
                        }
                    }
                }
                else {
                    const thread = newThreads.find(t => t.id === action.payload.parentID);

                    if(thread === undefined) return state;

                    const reply = thread.replies.find(rep => rep.id === action.payload.id);

                    if(reply === undefined) return state;

                    if(action.payload.voteType === 'UPVOTE') {
                        if(!reply.upvotes.includes(state.data.currentUser.id)){
                            reply.upvotes.push(state.data.currentUser.id);
                            reply.downvotes = reply.downvotes.filter(id => id !== state.data.currentUser.id);
                        }
                    }
                    else {
                        if(!reply.downvotes.includes(state.data.currentUser.id)){
                            reply.downvotes.push(state.data.currentUser.id);
                            reply.upvotes = reply.downvotes.filter(id => id !== state.data.currentUser.id);
                        }
                    }
                }

                return {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                };
            }

        default:
            throw new Error();
    }

}


const useDataContext: () => DataContextType = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    const [commentToDelete, setCommentToDelete] = useState<CommentToDeleteType|null>(null);
    

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
            .then(()  => reset())
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
            .then(()  => reset());
            
            

        }
    }

    function vote(voteType: 'UPVOTE' | 'DOWNVOTE', commentType: 'THREAD' | 'REPLY', id:string, parentID?:string) {
        if(!state.isLoaded) return;

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
        if(!state.isLoaded || commentToDelete === null) return;

        if(commentToDelete.commentType === 'THREAD'){
            
            fetch("/api/delete-thread",
            {
                method: "POST",
                body: JSON.stringify({
                    threadID: commentToDelete.threadID
                })
            })
            .then(()  => reset())         
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
            .then(()  => reset())
        }
    } 

    function setContent (type:'THREAD'|'REPLY', id:string, content:string, parentID?:string) {
        
        const reqData = {
            id: id,
            content: content
        }
        
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
    const setCurrentUser = (currentUser:UserInfo) => dispatch({type: 'set-current-user', payload: {currentUser: currentUser}})

    return {
        data: state.isLoaded? state.data : null,
        setData,
        reset,
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