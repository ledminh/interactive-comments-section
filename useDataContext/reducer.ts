import { StateType, ReducerType, ActionType, UserInfo } from "../TypesAndInterfaces";

export const initState:StateType = {loadingState: 'notLoad'};


const reducer:ReducerType = (state:StateType, action:ActionType) =>  {

    switch (action.type) {
        case 'set-data':
            return {
                loadingState: 'loaded',
                data: action.payload
            };
        
        case 'set-threads': 
            if(state.loadingState === 'loaded') return state;

            return {
                loadingState: 'loaded',
                data: {
                    currentUser: state.loadingState === 'loading'? state.data.currentUser: null,
                    comments: action.payload.threads
                }
            }

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
            if(state.loadingState !== 'loading' || state.data.currentUser === null) return state;
            
            {
                const newThreads = state.data.comments.slice();

                

                if(action.payload.commentType === 'THREAD') {
                    const thread = newThreads.find(t => t.id === action.payload.id);

                    if(thread === undefined) return state;
                    
                    if(action.payload.voteType === 'UPVOTE') {
                        if(!thread.upvotes.includes(state.data.currentUser.id)){
                            thread.upvotes.push(state.data.currentUser.id);
                            thread.downvotes = thread.downvotes.filter(id => id !== (state.data.currentUser as UserInfo).id);
                        }
                    }
                    else {
                        if(!thread.downvotes.includes(state.data.currentUser.id)) {
                            thread.downvotes.push(state.data.currentUser.id);
                            thread.upvotes = thread.upvotes.filter(id => id !== (state.data.currentUser as UserInfo).id);
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
                            reply.downvotes = reply.downvotes.filter(id => id !== (state.data.currentUser as UserInfo).id);
                        }
                    }
                    else {
                        if(!reply.downvotes.includes(state.data.currentUser.id)){
                            reply.downvotes.push(state.data.currentUser.id);
                            reply.upvotes = reply.downvotes.filter(id => id !== (state.data.currentUser as UserInfo).id);
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

export default reducer;