import { useEffect, useState } from "react";
import { PlanetCard } from "./PlanetCard.jsx";

export const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets?page=1&limit=6")
      .then(res => res.json())
      .then(data => {
        const promises = data.results.map(planet =>
          fetch(`https://www.swapi.tech/api/planets/${planet.uid}`).then(res => res.json())
        );
        Promise.all(promises).then(fullPlanets => setPlanets(fullPlanets));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-dark text-white min-vh-100">
        <div className="container my-4">
        <h1>All Planets</h1>
        <div className="row">
            {planets.map(planet => (
            <div key={planet.result.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <PlanetCard planet={planet} />
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};
