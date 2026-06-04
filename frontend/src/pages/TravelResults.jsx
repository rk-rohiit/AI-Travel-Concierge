import { useLocation } from "react-router-dom";

const TravelResults = () => {
  const location = useLocation();

  const data = location.state;

  if (!data) return <h2>No Data</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{data.city}</h1>

      <h2>Weather</h2>

      <p>
        {data.weather.temperature}°C
      </p>

      <p>{data.weather.condition}</p>

      <h2>Hotels</h2>

      {data.hotels.map((hotel, index) => (
        <div key={index}>
          <h3>{hotel.name}</h3>
          <p>₹{hotel.price}</p>
          <p>⭐ {hotel.rating}</p>
        </div>
      ))}

      <h2>Itinerary</h2>

      <h3>Day 1</h3>
      <ul>
        {data.itinerary.day1.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>Day 2</h3>
      <ul>
        {data.itinerary.day2.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>Day 3</h3>
      <ul>
        {data.itinerary.day3.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default TravelResults;