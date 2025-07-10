import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterCard = ({ character }) => {
    const { store, dispatch } = useGlobalReducer();

    // Safely access uid and properties
    const uid = character?.result?.uid;
    const properties = character?.result?.properties || {};
    const { name, gender, hair_color, eye_color } = properties;

    const randomImgUrl = `https://picsum.photos/seed/${uid || Math.random()}/300/200`;

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
        <div className="card bg-secondary text-white mb-3 position-relative">
            <img
                src={randomImgUrl}
                className="card-img-top"
                alt={name || "No Name"}
            />
            <div className="card-body">
                <h5 className="card-title">{name || "No Name"}</h5>
                <p className="card-text">
                    <strong>Gender:</strong> {gender || "Unknown"}<br />
                    <strong>Hair Color:</strong> {hair_color || "Unknown"}<br />
                    <strong>Eye Color:</strong> {eye_color || "Unknown"} 
                </p>

                {/* Heart icon toggle */}
                <button
                    className="btn btn-link position-absolute top-0 end-0 p-2"
                    onClick={toggleFavorite}
                >
                    <i className={`fa${isFavorite ? 's' : 'r'} fa-heart text-warning fs-4`}></i>
                </button>
            </div>
        </div>
    );
};
