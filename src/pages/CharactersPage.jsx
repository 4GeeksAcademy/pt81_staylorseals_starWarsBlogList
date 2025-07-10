import { useEffect, useState } from "react";
import { CharacterCard } from "./CharacterCard.jsx";

export const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people?page=1&limit=6") 
      .then(res => res.json())
      .then(data => {
        const promises = data.results.map(char =>
          fetch(`https://www.swapi.tech/api/people/${char.uid}`).then(res => res.json())
        );
        Promise.all(promises).then(fullChars => setCharacters(fullChars));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-dark text-white min-vh-100">
        <div className="container my-4">
        <h1>All Characters</h1>
        <div className="row">
            {characters.map(char => (
            <div key={char.result.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <CharacterCard character={char} />
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};
