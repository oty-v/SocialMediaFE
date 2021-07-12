import { createStore, applyMiddleware, combineReducers } from 'redux'
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {axiosController} from "../lib/axiosController";
import {onError} from "./interceptors";

export const configureStore = (initialState = undefined) => {
    const ssr = !initialState;

    const {
        requestsReducer,
        requestsMiddleware,
        requestsPromise,
    } = handleRequests({
        driver: createDriver(axiosController.instance),
        ssr: ssr ? 'server' : 'client',
        cache: true,
        onError,
    });

    const reducers = combineReducers({
        requests: requestsReducer,
    });

    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware,...requestsMiddleware)),
    );

    return { store, requestsPromise };
};