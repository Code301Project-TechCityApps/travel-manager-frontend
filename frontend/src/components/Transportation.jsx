// import { useState } from "react";

// function TransportationSearch() {
//     // const [lat, setLat] = useState('');
//     // const [lng, setLng] = useState('');
//     const [name, setName] = useState('');
//     const [transportationData, setTransportationData] = useState(null);
//     const [error, setError] = useState(null);

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:3000/api/transportation/traveldata?lat=${lat}&lng=${lng}&name=${name}`);
//             if (!response.ok) {
//                 throw new Error('Error fetching transportation data');
//             }
//             const data = await response.json();
//             console.log(data)
//             setTransportationData(data);
//         } catch (error) {
//             console.error(error);
//             setError('Error fetching transportation data');
//         }
//     };

//     return (
//         <div>
//           {/* <h2>Transportation Search</h2>
//           <div>
//             <label htmlFor="lat">Latitude:</label>
//             <input
//               type="text"
//               id="lat"
//               value={lat}
//               onChange={(e) => setLat(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="lng">Longitude:</label>
//             <input
//               type="text"
//               id="lng"
//               value={lng}
//               onChange={(e) => setLng(e.target.value)}
//             />
//           </div> */}
//           <div>
//             <label htmlFor="name">Destination Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <button onClick={handleSearch}>Search</button>
    
//           {error && <div>Error: {error}</div>}
          
//           {transportationData && (
//             <div>
//               <h3>Transportation Data</h3>
//               <pre>{JSON.stringify(transportationData, null, 2)}</pre>
//             </div>
//           )}
//         </div>
//       );
// }

// export default TransportationSearch;


import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_LOCATION_IQ_KEY

function TransportationSearch() {
    const [name, setName] = useState('');
    const [transportationData, setTransportationData] = useState(null);
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [location, setLocation] = useState({});

    async function getLocation() {
       
    
        let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${name}&format=json`;
        let response = await fetch(url);
        let jsonData = await response.json();
        if (jsonData.error) {
          setError("Check the spelling!");
        } else {
          let locationData = jsonData[0];
          setLocation(locationData);
          setError('');
        

        if (locationData.lat && locationData.lon) {
            try {
                const response = await fetch(`http://localhost:3000/api/transportation/traveldata?lat=${locationData.lat}&lng=${locationData.lon}&name=${name}`);
                if (!response.ok) {
                    throw new Error('Error fetching transportation data');
                }
                const data = await response.json();
                console.log(data)
                setTransportationData(data);
            }
            catch (error) {
              setError("Error fetching weather or movie data. Did you type the City correctly?");
            }
          }
        }
    }

    // const handleSearch = async () => {
    //     if (!coordinates) {
    //         setError('Geolocation coordinates not available.');
    //         return;
    //     }
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/transportation/traveldata?lat=${coordinates.lat}&lng=${coordinates.lng}&name=${name}`);
    //         if (!response.ok) {
    //             throw new Error('Error fetching transportation data');
    //         }
    //         const data = await response.json();
    //         console.log(data)
    //         setTransportationData(data);
    //     } catch (error) {
    //         console.error(error);
    //         setError('Error fetching transportation data');
    //     }
    // };
    function handleSubmit(e) {
        e.preventDefault();
        getLocation();
      }
      
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="name">Destination Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>

            {error && <div>Error: {error}</div>}

            {transportationData && (
                <div>
                    <h3>Transportation Data</h3>
                    <img 
              src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&size=500x440&zoom=10`} 
              className="card-img-top my-2"
              alt="Location Map" 
            />
                    <pre>{JSON.stringify(transportationData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default TransportationSearch;
