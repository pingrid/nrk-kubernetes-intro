import React, { useEffect } from 'react';
import PT from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEducation} from '../redux/state';

const Education = () => {
    const dispatch = useDispatch();
    const education = useSelector((state) => state.education);

    useEffect(() => {
        if (!education) {
            fetchEducation(dispatch);
        }

    }, []);
    if (!education) {
        return <noscript />;
    }
    const educationRows = education ?
        Object.values(education).map((elm, inc) => (
            <tr className="table-row justify-content-between" key={`education-row-${inc}`}>
                <td>{elm.yearFrom} - {elm.yearTo}</td>
                <td>{elm.place}</td>
                <td>{elm.comment}</td>
            </tr>
            )) :
            <norcript />;

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

Education.propTypes = {
    education: PT.arrayOf(PT.object)
};

export default Education;
