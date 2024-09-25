import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Footer.css'; 

function Footer() {
  const [stats, setStats] = useState({
    people: 0,
    planets: 0,
    starships: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch People Count
        const peopleResponse = await axios.get('https://swapi.dev/api/people/');
        const planetsResponse = await axios.get('https://swapi.dev/api/planets/');
        const starshipsResponse = await axios.get('https://swapi.dev/api/starships/');

        setStats({
          people: peopleResponse.data.count,
          planets: planetsResponse.data.count,
          starships: starshipsResponse.data.count,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <h4>Statistics</h4>
        <p>People: {stats.people}</p>
        <p>Planets: {stats.planets}</p>
        <p>Starships: {stats.starships}</p>
      </div>
    </footer>
  );
}

export default Footer;
