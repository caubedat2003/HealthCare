import React from 'react';
import Chatbot from './Chatbot';

function PatientService() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Chatbot Super Pro</h1>
            {/* Các thành phần khác của patient service */}
            <Chatbot />
        </div>
    );
}

export default PatientService;