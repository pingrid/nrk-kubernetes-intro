import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './state'
import { StateType } from 'typesafe-actions';

const isLocal = () => window.location.href.includes('localhost');

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type IRootState = StateType<ReturnType<typeof reducer>>;

const create = () => {
    if (isLocal()) {
        // @ts-ignore
        createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    }
    // @ts-ignore
    return createStore(reducer, applyMiddleware(thunk));
};

export default create;
