import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetails = () => {
  const { store, dispatch } = useGlobalReducer();
  const { uid } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then(res => res.json())
      .then(data => setCharacter(data.result))
      .catch(err => console.error(err));
  }, [uid]);

  if (!character) return <div className="text-white p-4">Loading...</div>;

  const { name, gender, height, mass, hair_color, eye_color, birth_year } = character.properties;
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
        <li><strong>Gender:</strong> {gender}</li>
        <li><strong>Height:</strong> {height}</li>
        <li><strong>Mass:</strong> {mass}</li>
        <li><strong>Hair Color:</strong> {hair_color}</li>
        <li><strong>Eye Color:</strong> {eye_color}</li>
        <li><strong>Birth Year:</strong> {birth_year}</li>
      </ul>
      {/* Back to Home button */}
      <Link to="/" className="btn btn-outline-light mt-4">← Back to Home</Link>
    </div>
  );
};