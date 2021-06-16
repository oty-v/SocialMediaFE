import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';

import { composeWithDevTools } from 'redux-devtools-extension'
import {axiosController} from "../lib/axiosController";

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
    });

    const reducers = combineReducers({
        requests: requestsReducer,
    });

    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...requestsMiddleware)),
    );

    return { store, requestsPromise };
};