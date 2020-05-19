import 'whatwg-fetch';
import { CONTACT_INFORMATION_SUCCESS } from './actions';
import { WORK_DATA_SUCCESS } from './actions';
import { EDUCATION_DATA_SUCCESS } from './actions';

const dataSetsInitialState = {
    contactInformation: undefined,
    work: undefined,
    education: undefined
};

export default (state = dataSetsInitialState, action) => {
    switch (action.type) {
        case CONTACT_INFORMATION_SUCCESS:
            return { ...state, contactInformation: action.result };
        case WORK_DATA_SUCCESS:
            return { ...state, work: action.result };
        case EDUCATION_DATA_SUCCESS:
            return { ...state, education: action.result };
        default:
            return state
    }
};

const config = {
    method: 'GET',
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json"
    }
};

export const fetchContactInformation = (dispatch) =>
     fetch(`/api/me`, config)
        .then(response => {
            if (response.status < 200 && response.status > 300) {
                throw new Error('oh noses');
            }
            return response.json();
        })
        .then(json => dispatch({type: CONTACT_INFORMATION_SUCCESS, result: json}))
        .catch(error => console.log(error));


export function fetchWork(dispatch) {
    fetch(`/api/work`, config)
        .then(response => {
            if (!response.ok) {
                throw new Error(`oh noses ${response.status}`);
            }
            return response.json()
        })
        .then(json => dispatch({type: WORK_DATA_SUCCESS, result: json}))
        .catch(error => console.log(error));
}

export const fetchEducation = (dispatch) =>
    fetch(`/api/education`, config)
        .then(response => {
                if (response.status >= 400) {
                    throw new Error();
                }
                return response.json();
            })
        .then(json => dispatch({ type: EDUCATION_DATA_SUCCESS, result: json }))
        .catch(error => console.log(error));
