import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEducation} from '../redux/state';
import { IRootState } from '../redux/store';
import { IEducation } from '../redux/types';

const Education = () => {
    const dispatch = useDispatch();
    const educationList = useSelector((state: IRootState) => state.education);

    useEffect(() => {
        console.log('getting education');
        dispatch(fetchEducation());
    }, []);

    console.log('educationList. ', educationList);
    if (!educationList) {
        return <noscript />;
    }
    const educationRows = educationList ?
        Object.values(educationList).map((education: IEducation, inc) => (
            <tr className="table-row justify-content-between" key={`education-row-${inc}`}>
                <td>{education.yearFrom} - {education.yearTo}</td>
                <td>{education.place}</td>
                <td>{education.comment}</td>
            </tr>
        )) :
        <noscript />;

    return (
        <div className="education mb-5">
            <h2>Education</h2>
            <table>
                <thead>
                <tr>
                    <th>Period</th>
                    <th>Where</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                {educationRows}
                </tbody>
            </table>
        </div>
    );
};

export { Education };
