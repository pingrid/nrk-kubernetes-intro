import React from 'react';
import ContactInformation from './components/ContactInformation.jsx';
import Education from './components/Education.jsx';
import Work from './components/Work.jsx';
import './index.css';

function App() {
    return (
        <div className="container">
            <h1 className="main-header my-5">Curriculum Vitae</h1>
            <div className="content-bulk">
                <ContactInformation/>
            </div>
            <div className="content-bulk">
                <Education/>
            </div>
            <div className="content-bulk">
                <Work/>
            </div>
        </div>
    );
}

export default App;
