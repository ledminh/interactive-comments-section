import { createContext, useReducer} from "react";

import { DataContextType, StateType, ActionType, DataType, ReducerType, CommentType, ThreadType } from "../TypesAndInterfaces";
import generateID from "../utils/generateID";



export const DataContext = createContext<DataContextType|null>(null);


// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }




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

    return {
        data: state.isLoaded? state.data : null,
        setData,
        addThread
    }
}


export default useDataContext;