import { useState } from "react";

const API_KEY = import.meta.env.VITE_LOCATION_IQ_KEY;

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

        if (fromJsonData.error || toJsonData.error) {
            setError("Check the spelling!");
            return;
        }

        const fromCoords = {
            lat: fromJsonData[0].lat,
            lon: fromJsonData[0].lon
        };

        setLocation(fromCoords);

        try {
            const response = await fetch(`http://localhost:3000/api/transportation/traveldata?lat=${fromCoords.lat}&lng=${fromCoords.lon}&name=${fromLocation}`);
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
                    <img
                        src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&size=700x640&zoom=12`}
                        className="card-img-top my-2"
                        alt="Location Map"
                    />

                    {transportationData.boards.map(board => (
                        <div key={board.place.name}>
                            <h4>{board.place.name}</h4>
                            <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Departure Time</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {board.departures.map(departure => (
                                        <tr key={departure.time} style={{ borderBottom: "1px solid #ddd" }}>
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
