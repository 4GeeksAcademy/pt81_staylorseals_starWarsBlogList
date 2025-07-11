import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const PlanetCard = ({ planet }) => {
    const { store, dispatch } = useGlobalReducer();

    // Safe destructure
    const uid = planet?.result?.uid;
    const properties = planet?.result?.properties || {};
    const { name, population, terrain } = properties;

    const formattedPopulation = population === "unknown" ? "Unknown" : Number(population).toLocaleString();
    const randomImgUrl = `https://picsum.photos/seed/${uid || Math.random()}/300/200`;
    const isFavorite = store.favorites.some(fav => fav.uid === uid);

    const toggleFavorite = () => {
        dispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
                uid,
                name,
                type: "planet"
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
                <p className="card-text text-capitalize">
                    <strong>Terrain:</strong> {terrain || "Unknown"}<br />
                    <strong>Population:</strong> {formattedPopulation}
                </p>
                    {/* Link for viewing all details in each card */}
                <Link to={`/planet/${uid}`} className="btn btn-warning mt-2">
                    View More Details
                </Link>

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
