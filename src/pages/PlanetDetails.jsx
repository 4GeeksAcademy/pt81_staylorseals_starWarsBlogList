import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PlanetDetails = () => {
  const { store, dispatch } = useGlobalReducer();
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${uid}`)
      .then(res => res.json())
      .then(data => setPlanet(data.result))
      .catch(err => console.error(err));
  }, [uid]);

  if (!planet) return <div className="text-white p-4">Loading...</div>;

  const { 
    name, climate, terrain, population, gravity, surface_water, 
    diameter, rotation_period, orbital_period 
  } = planet.properties;
  const randomImgUrl = `https://picsum.photos/seed/${uid}/600/400`;
  const isFavorite = store.favorites.some(fav => fav.uid === uid);


const toggleFavorite = () => {
    dispatch({
        type: "TOGGLE_FAVORITE",
        payload: {
            uid,
            name,
            type: "character"
        }
    });
};

  return (
    <div className="bg-dark text-white p-4 min-vh-100">
      <img src={randomImgUrl} alt={name} className="img-fluid mb-4 rounded" />
      <h1>{name}</h1>
            {/* Heart icon toggle */}
        <button
            className="btn btn-link position-absolute top-0 end-0 p-2"
            onClick={toggleFavorite}
        >
            <i className={`fa${isFavorite ? 's' : 'r'} fa-heart text-warning fs-4`}></i>
        </button>

      <ul>
        <li><strong>Climate:</strong> {climate}</li>
        <li><strong>Terrain:</strong> {terrain}</li>
        <li><strong>Population:</strong> {population}</li>
        <li><strong>Gravity:</strong> {gravity}</li>
        <li><strong>Surface Water:</strong> {surface_water}</li>
        <li><strong>Diameter:</strong> {diameter}</li>
        <li><strong>Rotation Period:</strong> {rotation_period}</li>
        <li><strong>Orbital Period:</strong> {orbital_period}</li>
      </ul>
        {/* Back to Home button */}
      <Link to="/" className="btn btn-outline-light mt-4">← Back to Home</Link>
    </div>
  );
};
