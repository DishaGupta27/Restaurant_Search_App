import React, { useEffect, useState } from "react";

export default function RestaurantsList({ onSelect }) {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [usingLocation, setUsingLocation] = useState(false);

    // Load restaurant data
    useEffect(() => {
        fetch("/restaurants.json")
            .then((r) => r.json())
            .then((json) => {
                setData(json);
                setSortedData(json); // default unsorted
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Haversine distance
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Handle "Use My Location" toggle
    const handleToggleLocation = () => {
        if (usingLocation) {
            // Turn OFF location filtering
            setUsingLocation(false);
            setLocation(null);
            setSortedData(data);
            return;
        }

        // Otherwise, turn ON and get location
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            setSortedData(data);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ latitude, longitude });
                setUsingLocation(true);

                const withDistance = data.map((r) => {
                    if (
                        r.coords &&
                        typeof r.coords.lat === "number" &&
                        typeof r.coords.lng === "number"
                    ) {
                        const distance = getDistance(
                            latitude,
                            longitude,
                            r.coords.lat,
                            r.coords.lng
                        );
                        return { ...r, distance };
                    }
                    return { ...r, distance: null };
                });

                const sorted = withDistance.sort(
                    (a, b) => (a.distance || Infinity) - (b.distance || Infinity)
                );
                setSortedData(sorted);
            },
            (err) => {
                console.warn("Location denied or unavailable.", err);
                alert("Location access denied. Showing all restaurants.");
                setUsingLocation(false);
                setLocation(null);
                setSortedData(data);
            }
        );
    };

    return (
        <div className="p-6 bg-[var(--bg-light)] min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[var(--primary)]">Nearby Restaurants</h3>
                <button
                    onClick={handleToggleLocation}
                    className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-200 shadow-sm ${usingLocation
                        ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
                        : "bg-green-500 text-white hover:bg-green-600 shadow-md"
                        }`}
                >
                    {usingLocation ? "Show All Restaurants 🌐" : "Use My Location 📍"}
                </button>

            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {usingLocation && location ? (
                        <p className="text-gray-500 text-sm mb-4">
                            Showing results near your location 📍
                        </p>
                    ) : (
                        <p className="text-gray-500 text-sm mb-4">
                            Showing all restaurants
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedData.map((r) => (
                            <div
                                key={r.id}
                                onClick={() => onSelect(r)}
                                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-green-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-200"
                            >
                                <img
                                    src={r.image}
                                    alt={r.name}
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-[var(--text-dark)]">{r.name}</p>
                                        <p className="text-sm text-gray-500">{r.city}</p>
                                        {typeof r.distance === "number" &&
                                            !isNaN(r.distance) && (
                                                <p className="text-sm text-gray-500">
                                                    {r.distance.toFixed(2)} km away
                                                </p>
                                            )}
                                    </div>
                                    <span className="text-[var(--primary)] text-sm font-semibold">View</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
