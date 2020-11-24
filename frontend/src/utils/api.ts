import { IContact, IEducationList, IWorkList } from '../redux/types';

interface IConfig extends RequestInit {}

const config: IConfig = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
};

export async function fetchContactFromApi(): Promise<IContact> {
    return (await fetch(`/api/me`, config)).json();
}

export async function fetchWorkFromApi(): Promise<IWorkList> {
    return (await fetch(`/api/work`, config)).json();
}

export async function fetchEducationFromApi(): Promise<IEducationList> {
    return (await fetch(`/api/education`, config)).json();
}

