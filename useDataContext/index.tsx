import { createContext, useReducer, useState} from "react";

import { DataContextType, StateType, ActionType, DataType, ReducerType, CommentToDeleteType, UserInfo } from "../TypesAndInterfaces";



export const DataContext = createContext<DataContextType|null>(null);


const initState:StateType = {loadingState: 'notLoad'};


const reducer:ReducerType = (state:StateType, action:ActionType) =>  {

    switch (action.type) {
        case 'set-data':
            return {
                loadingState: 'loaded',
                data: action.payload
            };
        
        case 'set-current-user':
            if(state.loadingState !== 'loading') return state;

            return {
                loadingState: 'loaded',
                data: {
                    ...state.data,
                    currentUser: action.payload.currentUser
                }
            }
        
        case 'loading' :
            if(state.loadingState === 'notLoad') return state;
            
            return {
                ...state,
                loadingState: 'loading',
            }

        case 'reset': 
            return initState;

        case 'set-content/thread':
            if(state.loadingState !== 'loading') return state;

            {
                const newThreads = state.data.comments.slice();
                const thread = newThreads.find(t => t.id === action.payload.id);

                if(thread === undefined) return state;

                thread.content = action.payload.content;

                const newState:StateType = {
                    loadingState: 'loaded',
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                };

                return newState;
            }
        
        case 'set-content/reply':
            if(state.loadingState !== 'loading') return state;

            {
                const newThreads = state.data.comments.slice();
                const thread = newThreads.find(t => t.id === action.payload.parentID);

                if(thread === undefined) return state;

                const reply = thread.replies.find(r => r.id === action.payload.id);

                if(reply === undefined) return state;


                reply.content = action.payload.content;

                const newState:StateType = {
                    loadingState: 'loaded',
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                };

                return newState;
            }     

        case 'vote' :
            if(state.loadingState !== 'loading') return state;
            
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
                    loadingState: 'loaded',
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

    const loadData = () => {
        fetch('/api/get-threads')
        .then(res => res.json())
        .then(threads => {
            const data = {
                comments: threads,
                currentUser: {
                    id: '636969580c2f2107e31bf931',
                    "image": { 
                    "png": "./images/avatars/image-juliusomo.png",
                    "webp": "./images/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                }
            }

            dispatch({
                type: 'set-data',
                payload: data
            });
        })
        .catch(e => console.log(e));

    }


    const addThread = (content:string) => {
        if(state.loadingState === 'notLoad') return; 
        


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
        .then(() => loadData());
    }
    
    function addReply (threadID:string, replyingTo:string, content:string) {
        if(state.loadingState === 'notLoad') return; 

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
        .then(() => loadData());
        

    }

    function vote(voteType: 'UPVOTE' | 'DOWNVOTE', commentType: 'THREAD' | 'REPLY', id:string, parentID?:string) {
        if(state.loadingState === 'notLoad') return; 

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
            .then(()  => loadData())         
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
            .then(()  => loadData())
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
        loadData,
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