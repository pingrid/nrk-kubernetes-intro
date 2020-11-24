import 'whatwg-fetch';
import { Action } from 'redux';
import { getType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { getContactInformation, getEducation, getWork } from './actions';
import { IAction } from './types';
import { fetchContactFromApi, fetchEducationFromApi, fetchWorkFromApi } from '../utils/api';
import { IRootState } from './store';

const initialState = {
    contactInformation: undefined,
    work: undefined,
    education: undefined
};

function reducer (state = initialState, action: IAction) {
    switch (action.type) {
        case getType(getContactInformation.success):
            return { ...state, contactInformation: action.payload };
        case getType(getWork.success):
            return { ...state, work: action.payload.work };
        case getType(getEducation.success):
            return { ...state, education: action.payload.education };
        default:
            return state
    }
}

export { reducer };


export function fetchContactInformation(): ThunkAction<void, IRootState, void, Action<string>> {
    console.log('rfetch contact information');
    return async (dispatch) => {
        fetchContactFromApi()
            .then(json => dispatch(getContactInformation.success(json)))
            .catch(error => {
                console.log(error);
                dispatch(getContactInformation.failure(error));
            });
    };
}

export function fetchWork(): ThunkAction<void, IRootState, void, Action<string>> {
    return async (dispatch) => {
        dispatch(getWork.request);
        fetchWorkFromApi()
            .then(json => dispatch(getWork.success(json)))
            .catch(error => {
                console.log(error);
                dispatch(getWork.failure(error));
            });
    };
}

export function fetchEducation(): ThunkAction<void, IRootState, void, Action<string>> {
    return async (dispatch) => {
        fetchEducationFromApi()
            .then(json => dispatch(getEducation.success(json)))
            .catch(error => {
                console.log(error);
                dispatch(getEducation.failure(error));
            });
    }
}
