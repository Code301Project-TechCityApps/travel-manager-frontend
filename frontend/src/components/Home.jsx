import React from 'react';
import FlightDetailsForm from './FlightDetailsForm';
import Transportation from './Transportation';


function Home() {
        return (
            <>
            <h1>This is Home Page</h1>
            <p>This section should house the imported travel itinerary</p>
            <FlightDetailsForm />
            <Transportation />
            </>
    )}
    
    export default Home;