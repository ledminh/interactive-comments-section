import { createContext, useReducer} from "react";

import { DataContextType, StateType, ActionType, DataType, ReducerType } from "../TypesAndInterfaces";


const defaultDataContext:DataContextType = {
    data: null,
    setData: () => {}
}

export const DataContext = createContext<DataContextType>(defaultDataContext);


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
        default:
            throw new Error();
    }

}


const useDataContext = () => {
    const [state, dispatch] = useReducer(reducer, initState);


    

    /*********************************************************/

    const setData = (data:DataType) => dispatch({
        type: 'set-data',
        payload: data
    });

    return {
        data: state.isLoaded? state.data : null,
        setData
    }
}


export default useDataContext;