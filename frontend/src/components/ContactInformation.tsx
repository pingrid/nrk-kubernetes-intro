import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchContactInformation} from '../redux/state';
import { IRootState } from '../redux/store';

const ContactInformation = () => {
    const dispatch = useDispatch();
    const contactInformation = useSelector((state: IRootState) => state.contactInformation);

    useEffect(() => {
        dispatch(fetchContactInformation());
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
                    src={`${process.env.PUBLIC_URL}/me.jpg`}
                    className="contact-information-image"
                    role="presentation"
                    alt={`Illustration of ${contactInformation.name}`}
                />
            </div>
        </div>
    );
};

export { ContactInformation };
