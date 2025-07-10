import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CharacterCard } from "../pages/CharacterCard.jsx";
import { PlanetCard } from "./PlanetCard.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const {store, dispatch} =useGlobalReducer()
  const [characters, setCharacters] = useState ([]);
  const [planets, setPlanets] = useState([]);

// Fetching data from SWAPI
	useEffect(() => {

  
  // Fetching characters from SWAPI
    fetch("https://www.swapi.tech/api/people?page=1&limit=6")
      .then(res => res.json())
      .then(dataObj => {
        let shortChars = dataObj.results;
        let promises = shortChars.map(shortChar =>
          fetch(`https://www.swapi.tech/api/people/${shortChar.uid}`)
            .then(res => res.json())
        );
        Promise.all(promises).then(data => {
          setCharacters(data);
        });
      })
      .catch(err => console.error(err));
      

      
  // Fetching planets from SWAPI
    fetch("https://www.swapi.tech/api/planets?page=1&limit=6")
      .then(res => res.json())
      .then(dataObj => {
        let shortPlanets = dataObj.results;
        let promises = shortPlanets.map(shortPlanet =>
          fetch(`https://www.swapi.tech/api/planets/${shortPlanet.uid}`)
            .then(res => res.json())
        );
        Promise.all(promises).then(data => {
          setPlanets(data);
        });
      })
      .catch(err => console.error("Planets error:", err));
  }, []);



    console.log("Characters state:", characters);
    console.log("Planets state:", planets);

  // Displaying characters and planets in a grid layout and sidebar
    return (
      <div className="bg-dark text-white min-vh-100 d-flex">

          {/* side bar */}
          <nav
            className="d-flex flex-column p-3 bg-secondary"
            style={{ minWidth: "200px", minHeight: "100vh" }}
          >
            <h4 className="text-white mb-4">Browse Bank</h4>
            <ul className="nav nav-pills flex-column gap-2">
              <li className="nav-items">
                <Link to="/characters" className="nav-link text-white bg-dark">
                  Characters
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/planets" className="nav-link text-white bg-dark">
                  Planets
                </Link>
              </li>
            </ul>
          </nav>
          {/* end of side bar */}

          <div className="flex-grow-1 p-4">
          <h2 className="mb-4">Characters</h2>
      <div
        className="scrollbar-white"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          paddingBottom: "2rem",
          Width: "100%", 
        }}
      >
        {characters.map((char, ind) => (
          <div
            key={char?.result?.uid || ind}
            style={{
              minWidth: "calc((100% - 2rem) / 3)",
              maxWidth: "calc((100% - 2rem) / 3)",
              width: "calc((100% - 2rem) / 3)",
              flex: "0 0 auto",
            }}
          >
            <CharacterCard character={char} />
          </div>
        ))}
      </div>
        <h2 className="mt-4">Planets</h2>
          <div
            className="scrollbar-white"
            style={{
                display: "flex",
                overflowX: "auto",
                gap: "1rem",
                paddingBottom: "2rem",
                width: "100%", // Responsive to container
              }}
          >
          {planets.map((planet, ind) => (
            <div
              key={planet?.result?.uid || ind}
              style={{
                minWidth: "calc((100% - 2rem) / 3)",
                maxWidth: "calc((100% - 2rem) / 3)",
                width: "calc((100% - 2rem) / 3)",
                flex: "0 0 auto",
              }}
            >
              <PlanetCard planet={planet} />
            </div>
          ))}
          </div>
        </div>
      </div>
    );
};