import React from 'react';
import Transportation from './Transportation';

function Home() {
    return (
        <>
        <h1>This is Home Page</h1>
        <p>This section should house the imported travel itinerary</p>
        {/* <p>This section should house the transportation API</p> */}
        <Transportation/>
        </>
)}

export default Home;