import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import AuthReducer from "./reducers/AuthReducer";
import UsersListReducer from "./reducers/UsersListReducer";
import PostsListReducer from "./reducers/PostsListReducer";
import CommentsListReducer from "./reducers/CommentsListReducer";

const reducers = combineReducers({auth: AuthReducer, users: UsersListReducer, posts: PostsListReducer, comments: CommentsListReducer});

let store

function initStore(initialState) {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        store = undefined
    }
    if (typeof window === 'undefined') return _store
    if (!store) store = _store
    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}