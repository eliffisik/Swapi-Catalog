import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/PlanetCard.css';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [films, setFilms] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
  
    const fetchResidents = async () => {
      try {
        const residentPromises = planet.residents.map((residentUrl) => axios.get(residentUrl));
        const residentResponses = await Promise.all(residentPromises);
        setResidents(residentResponses.map((response) => response.data.name));
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    
    const fetchFilms = async () => {
      try {
        const filmPromises = planet.films.map((filmUrl) => axios.get(filmUrl));
        const filmResponses = await Promise.all(filmPromises);
        setFilms(filmResponses.map((response) => response.data.title));
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    if (planet.residents.length) fetchResidents();
    if (planet.films.length) fetchFilms();
  }, [planet.residents, planet.films]);


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`planet-card ${showDetails ? 'expanded' : ''}`}>
      <h3>{planet.name}</h3>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>
      <p><strong>Diameter:</strong> {planet.diameter} km</p>
      <p><strong>Gravity:</strong> {planet.gravity}</p>
      <p><strong>Surface Water:</strong> {planet.surfaceWater}%</p>
      <p><strong>Population:</strong> {planet.population}</p>
      
    
      <button className="details-button" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

    
      {showDetails && (
        <div className="details">
  <p><strong>Orbital Period:</strong> {planet.orbitalPeriod} days</p>
  <p><strong>Rotation Period:</strong> {planet.rotationPeriod} hours</p>
          <p><strong>Residents:</strong> {residents.length ? residents.join(', ') : 'None'}</p>
          <p><strong>Films:</strong> {films.length ? films.join(', ') : 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetCard;
