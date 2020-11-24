import { ActionType } from 'typesafe-actions';
import * as Actions from './actions';

export type IAction = ActionType<typeof Actions>;
export interface IContact {
    name: string;
    location: string;
}

export interface IWork {
    yearFrom: number;
    yearTo: number;
    place: string;
    comment: string;
}

export interface IWorkList {
    work?: IWork[];
}

export interface IEducation {
    yearFrom: number;
    yearTo: number;
    place: string;
    comment: string;
}

export interface IEducationList{
    education: IEducation[]
}
