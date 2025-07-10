import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span
            className="navbar-brand mb-0 h1"
            style={{
              color: "#ffe81f",
              fontSize: "2.5rem",
              textDecoration: "underline",
              textUnderlineOffset: "6px",
              fontWeight: "bold",
            }}
          >
            Star Wars
          </span>
        </Link>

        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              style={{
                backgroundColor: "#ffe81f",
                color: "#222",
                border: "none",
              }}
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="favoritesDropdown"
            >
              {store.favorites.length === 0 ? (
                <li>
                  <span className="dropdown-item-text">No favorites yet</span>
                </li>
              ) : (
                store.favorites.map((fav) => (
                  <li key={fav.uid}>
                    <span className="dropdown-item d-flex justify-content-between">
                      {fav.name}
                      <button
                        type="button"
                        className="btn btn-sm text-danger"
                        onClick={() =>
                          dispatch({ type: "TOGGLE_FAVORITE", payload: fav })
                        }
                        aria-label={`Remove ${fav.name} from favorites`}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
