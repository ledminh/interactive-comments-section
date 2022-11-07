import { createContext, useReducer} from "react";

import { DataContextType, StateType, ActionType, DataType, ReducerType, CommentType, ThreadType } from "../TypesAndInterfaces";
import generateID from "../utils/generateID";



export const DataContext = createContext<DataContextType|null>(null);


const initState:StateType = {isLoaded: false};


const reducer:ReducerType = (state:StateType, action:ActionType) => {

    switch (action.type) {
        case 'set-data':
            return {
                isLoaded: true,
                data: action.payload
            };
        case 'add-thread':
            if(!state.isLoaded)
                return state;
            {
                const newThreads = state.data.comments.slice();
                newThreads.push(action.payload);
    
                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                }            

                return newState;
            }
            
        case 'set-score':
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
        default:
            throw new Error();
    }

}


const useDataContext: () => DataContextType = () => {
    const [state, dispatch] = useReducer(reducer, initState);


    

    /*********************************************************/

    const setData = (data:DataType) => dispatch({
        type: 'set-data',
        payload: data
    });

    const addThread = (content:string) => {
        if(state.isLoaded) {
            const thread:ThreadType = {
                id: generateID(), 
                content: content, 
                createdAt: (new Date()).toUTCString(), 
                score: 0, 
                user: state.data.currentUser,
                replies: []
            }

            dispatch({
                type: 'add-thread',
                payload:thread
            })
        
        
        }
    }

    const upVote = (id:number) => {
        if(!state.isLoaded) return;

        const currentScore = state.data.comments.find(c => c.id === id)?.score;

        if(currentScore === undefined) return;
        dispatch({type: 'set-score', payload: {id:id, score: currentScore + 1}})
    } 

    const downVote = (id:number) => {
        if(!state.isLoaded) return;

        const currentScore = state.data.comments.find(c => c.id === id)?.score;
        
        if(currentScore === undefined || currentScore === 0) return;
        
        dispatch({type: 'set-score', payload: {id:id, score: currentScore - 1}})
    }

    return {
        data: state.isLoaded? state.data : null,
        setData,
        addThread,
        upVote,
        downVote
    }
}


export default useDataContext;