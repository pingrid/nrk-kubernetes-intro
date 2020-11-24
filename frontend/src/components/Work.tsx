import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchWork} from '../redux/state';
import { IRootState } from '../redux/store';
import { IWork } from '../redux/types';

const Work = () => {
    const dispatch = useDispatch();
    const workList = useSelector((state: IRootState) => state.work);

    useEffect(() => {
        if (!workList) {
            dispatch(fetchWork());
        }
    }, []);
    if (!workList) {
        return <div />;
    }
    const workRows = workList ?
        Object.values(workList).map((work: IWork, inc) => (
            <tr className="table-row justify-content-between" key={`work-row-${inc}`}>
                <td>{work.yearFrom} - {work.yearTo}</td>
                <td>{work.place}</td>
                <td>{work.comment}</td>
            </tr>
        )) :
        <noscript />;

    return (
        <div className="work">
            <h2>Work</h2>
            <table>
                <thead>
                <tr><th>Period</th><th>Where</th><th>Comment</th></tr>
                </thead>
                <tbody>
                {workRows}
                </tbody>
            </table>
        </div>
    );
};

export { Work };
