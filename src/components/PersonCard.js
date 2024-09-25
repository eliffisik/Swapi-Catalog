import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/PersonCard.css';

const PersonCard = ({ person }) => {
  const [homeworld, setHomeworld] = useState('');
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    
    const fetchHomeworld = async () => {
      try {
        const response = await axios.get(person.homeworld);
        setHomeworld(response.data.name);
      } catch (error) {
        console.error('Error fetching homeworld:', error);
      }
    };

    
    const fetchFilms = async () => {
      try {
        const filmPromises = person.films.map((filmUrl) => axios.get(filmUrl));
        const filmResponses = await Promise.all(filmPromises);
        setFilms(filmResponses.map((response) => response.data.title));
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    
    const fetchVehicles = async () => {
      try {
        const vehiclePromises = person.vehicles.map((vehicleUrl) => axios.get(vehicleUrl));
        const vehicleResponses = await Promise.all(vehiclePromises);
        setVehicles(vehicleResponses.map((response) => response.data.name));
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    
    const fetchStarships = async () => {
      try {
        const starshipPromises = person.starships.map((starshipUrl) => axios.get(starshipUrl));
        const starshipResponses = await Promise.all(starshipPromises);
        setStarships(starshipResponses.map((response) => response.data.name));
      } catch (error) {
        console.error('Error fetching starships:', error);
      }
    };

    if (person.homeworld) fetchHomeworld();
    if (person.films.length) fetchFilms();
    if (person.vehicles.length) fetchVehicles();
    if (person.starships.length) fetchStarships();

  }, [person.homeworld, person.films, person.vehicles, person.starships]);

  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`person-card ${showDetails ? 'expanded' : ''}`}>
      <h3>{person.name}</h3>
      <p><strong>Birth Year:</strong> {person.birthYear}</p>
      <p><strong>Gender:</strong> {person.gender}</p>
      <p><strong>Height:</strong> {person.height} cm</p>
      <p><strong>Mass:</strong> {person.mass} kg</p>
      <p><strong>Eye Color:</strong> {person.eyeColor}</p>
      <p><strong>Hair Color:</strong> {person.hairColor}</p>
      <p><strong>Skin Color:</strong> {person.skinColor}</p>
      
      
      <button className="details-button" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
     
      {showDetails && (
        <div className="details">
          <p><strong>Homeworld:</strong> {homeworld || 'Loading...'}</p>
          <p><strong>Films:</strong> {films.length ? films.join(', ') : 'Loading...'}</p>
          <p><strong>Vehicles:</strong> {vehicles.length ? vehicles.join(', ') : 'None'}</p>
          <p><strong>Starships:</strong> {starships.length ? starships.join(', ') : 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default PersonCard;
