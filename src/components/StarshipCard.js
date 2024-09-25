import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/StarshipCard.css';

const StarshipCard = ({ starship }) => {
  const [pilots, setPilots] = useState([]);
  const [films, setFilms] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    
    const fetchPilots = async () => {
      try {
        const pilotPromises = starship.pilots.map((pilotUrl) => axios.get(pilotUrl));
        const pilotResponses = await Promise.all(pilotPromises);
        setPilots(pilotResponses.map((response) => response.data.name));
      } catch (error) {
        console.error('Error fetching pilots:', error);
      }
    };

    
    const fetchFilms = async () => {
      try {
        const filmPromises = starship.films.map((filmUrl) => axios.get(filmUrl));
        const filmResponses = await Promise.all(filmPromises);
        setFilms(filmResponses.map((response) => response.data.title));
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    if (starship.pilots.length) fetchPilots();
    if (starship.films.length) fetchFilms();
  }, [starship.pilots, starship.films]);

  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`starship-card ${showDetails ? 'expanded' : ''}`}>
      <h3>{starship.name}</h3>
      <p><strong>Model:</strong> {starship.model}</p>
     
      <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
      <p><strong>Cost in Credits:</strong> {starship.costInCredits}</p>
      <p><strong>Passengers:</strong> {starship.passengers}</p>
      <p><strong>Length:</strong> {starship.length} meters</p>
      <p><strong>Crew:</strong> {starship.crew}</p>
   

      
      <button className="details-button" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

     
      {showDetails && (
        <div className="details">
          <p><strong>Max Atmosphering Speed:</strong> {starship.maxAtmospheringSpeed}</p>
          
               <p><strong>Cargo Capacity:</strong> {starship.cargoCapacity} kg</p>
          <p><strong>Hyperdrive Rating:</strong> {starship.hyperdriveRating}</p>
          <p><strong>MGLT:</strong> {starship.MGLT}</p>
          
          <p><strong>Starship Class:</strong> {starship.starshipClass}</p>
          <p><strong>Pilots:</strong> {pilots.length ? pilots.join(', ') : 'None'}</p>
          <p><strong>Films:</strong> {films.length ? films.join(', ') : 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default StarshipCard;
