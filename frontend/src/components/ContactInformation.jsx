import React, { useEffect } from 'react';
import PT from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchContactInformation} from '../redux/state';
import profilePicture from './me.jpg';

const ContactInformation = () => {
    const dispatch = useDispatch();
    const contactInformation = useSelector((state) => state.contactInformation);

    useEffect(() => {
        console.log('in useEffect contantct', contactInformation);
        if (!contactInformation) {
            console.log('contect f4ecthing');
            fetchContactInformation(dispatch);
        }

    }, []);
    if (!contactInformation) {
        return <noscript />;
    }
    return (
        <div>
            <h2>Contact information</h2>
            <div className="contact-information justify-content-between">
                <div className="contact-information-content">
                    <p><b>Name: </b>{contactInformation.name}</p>
                    <p><b>Location: </b>{contactInformation.location}</p>
                </div>
                <img
                    src={profilePicture}
                    className="contact-information-image"
                    role="presentation"
                    alt={`Illustration of ${contactInformation.name}`}
                />
            </div>
        </div>
    );
};

ContactInformation.propTypes = {
    contactInformation: PT.object
};

export default ContactInformation;
