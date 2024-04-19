import { useState } from "react";
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

const API_KEY = import.meta.env.VITE_LOCATION_IQ_KEY;
const API = import.meta.env.VITE_SERVER_URL;

function TransportationSearch() {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [transportationData, setTransportationData] = useState(null);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({});

    async function getLocation() {
        const fromUrl = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${fromLocation}&format=json`;
        const toUrl = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${toLocation}&format=json`;

        const fromResponse = await fetch(fromUrl);
        const toResponse = await fetch(toUrl);

        const fromJsonData = await fromResponse.json();
        const toJsonData = await toResponse.json();
        console.log(fromJsonData)

        if (fromJsonData.error || toJsonData.error) {
            setError("Check the spelling!");
            return;
        }

        const fromCoords = {
            lat: fromJsonData[0].lat,
            lon: fromJsonData[0].lon,
            name: fromJsonData[0].display_name
        };

        setLocation(fromCoords);

        try {
            const response = await fetch(`${API}/api/transportation/traveldata?lat=${fromCoords.lat}&lng=${fromCoords.lon}&name=${fromLocation}`);
            if (!response.ok) {
                throw new Error('Error fetching transportation data');
            }
            const data = await response.json();
            console.log(data)
            setTransportationData(data);
        } catch (error) {
            setError("Error fetching transportation data");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        getLocation();
    }
console.log(transportationData);
console.log(location);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fromLocation">From:</label>
                <input
                    type="text"
                    id="fromLocation"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                />
                <label htmlFor="toLocation">To:</label>
                <input
                    type="text"
                    id="toLocation"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                />
                <button type="submit">Find Closest Bus Stop</button>
            </form>

            {error && <div>Error: {error}</div>}

            {transportationData && (
                <div>
                    <h3>Transportation Data</h3>
                  
                    <MDBRow className='w-100'>
      <MDBCol lg='6' className='my-4'>
        <iframe
           src={`https://maps.google.com/maps?q=${location.name}&output=embed`}
          className='w-100'
          height='400'
          loading='lazy'
        ></iframe>
      </MDBCol>
      </MDBRow>

                    {transportationData.boards.map((board, idx) => (
                        <div key={idx}>
                            <h4>{board.place.name}</h4>
                            <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Departure Time</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {board.departures.map((departure, idx) => (
                                        <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                                            <td style={{ padding: "8px", textAlign: "left" }}>{departure.time}</td>
                                            <td style={{ padding: "8px", textAlign: "left" }}>{departure.transport.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TransportationSearch;
