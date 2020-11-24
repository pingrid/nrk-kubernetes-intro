import { createAsyncAction } from 'typesafe-actions';
import { IContact, IEducationList, IWorkList } from './types';

export const getContactInformation = createAsyncAction(
    'GET_CONTACT_INFORMATION_REQUEST',
    'GET_CONTACT_INFORMATION_SUCCESS',
    'GET_CONTACT_INFORMATION_FAILURE'
)<{}, IContact, Error>();

export const getWork = createAsyncAction(
    'GET_WORK_REQUEST',
    'GET_WORK_SUCCESS',
    'GET_WORK_FAILURE'
)<{}, IWorkList, Error>();

export const getEducation = createAsyncAction(
    'GET_EDUCATION_REQUEST',
    'GET_EDUCATION_SUCCESS',
    'GET_EDUCATION_FAILURE'
)<{}, IEducationList, Error>();
