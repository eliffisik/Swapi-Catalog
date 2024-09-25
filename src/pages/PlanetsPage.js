import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Planet from '../models/Planet';
import PlanetCard from '../components/PlanetCard';
import './styles/PlanetsPage.css';

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [climateFilter, setClimateFilter] = useState('');
  const [terrainFilter, setTerrainFilter] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');
  const [diameterFilter, setDiameterFilter] = useState(''); 
  const [sortOrder, setSortOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const topRef = useRef(null);
  const planetsPerPage = 12;

  useEffect(() => {
    const fetchAllPlanets = async () => {
      setIsLoading(true);
      let allFetchedPlanets = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
          allFetchedPlanets = [...allFetchedPlanets, ...response.data.results];
          totalPages = Math.ceil(response.data.count / 10);
          page++;
        }

        const mappedPlanets = allFetchedPlanets.map(planet => new Planet(
          planet.name,
          planet.climate,
          planet.diameter,
          planet.gravity,
          planet.orbital_period,
          planet.population,
          planet.rotation_period,
          planet.surface_water,
          planet.terrain,
          planet.created,
          planet.edited,
          planet.films,
          planet.residents,
          planet.url
        ));

        setAllPlanets(mappedPlanets);
        setTotalPages(Math.ceil(mappedPlanets.length / planetsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching planets:', error);
        setIsLoading(false);
      }
    };

    fetchAllPlanets();
  }, []);

  useEffect(() => {
    let filteredPlanets = [...allPlanets];

    if (searchTerm) {
      filteredPlanets = filteredPlanets.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (climateFilter) {
      filteredPlanets = filteredPlanets.filter(planet =>
        planet.climate.toLowerCase().includes(climateFilter.toLowerCase())
      );
    }

    if (terrainFilter) {
      filteredPlanets = filteredPlanets.filter(planet =>
        planet.terrain.toLowerCase().includes(terrainFilter.toLowerCase())
      );
    }

    if (populationFilter) {
      filteredPlanets = filteredPlanets.filter(planet => {
        const population = parseInt(planet.population, 10);
        if (isNaN(population)) return false; // Bilinmeyen nüfuslar için
        if (populationFilter === 'low') return population < 1000000;
        if (populationFilter === 'medium') return population >= 1000000 && population <= 1000000000;
        if (populationFilter === 'high') return population > 1000000000;
        return true;
      });
    }

    if (diameterFilter) {
      filteredPlanets = filteredPlanets.filter(planet => {
        const diameter = parseInt(planet.diameter, 10);
        if (isNaN(diameter)) return false; // Bilinmeyen çaplar için
        if (diameterFilter === 'small') return diameter < 5000;
        if (diameterFilter === 'medium') return diameter >= 5000 && diameter <= 10000;
        if (diameterFilter === 'large') return diameter > 10000;
        return true;
      });
    }

    if (sortOrder) {
      filteredPlanets = filteredPlanets.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    setPlanets(filteredPlanets.slice((currentPage - 1) * planetsPerPage, currentPage * planetsPerPage));
    setTotalPages(Math.ceil(filteredPlanets.length / planetsPerPage));
  }, [allPlanets, searchTerm, climateFilter, terrainFilter, populationFilter, diameterFilter, sortOrder, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') setSearchTerm(value);
    if (name === 'climate') setClimateFilter(value);
    if (name === 'terrain') setTerrainFilter(value);
    if (name === 'population') setPopulationFilter(value);
    if (name === 'diameter') setDiameterFilter(value); 
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setClimateFilter('');
    setTerrainFilter('');
    setPopulationFilter('');
    setDiameterFilter(''); 
    setSortOrder('');
    setCurrentPage(1);
  };

  return (
    <div className="planets-page">
      <div ref={topRef}></div>
      <h2>Star Wars Planets</h2>
      <div className="search-filter">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search Planets..."
          value={searchTerm}
          onChange={handleFilterChange}
        />

        <select name="climate" value={climateFilter} onChange={handleFilterChange}>
          <option value="">All Climates</option>
          <option value="arid">Arid</option>
          <option value="temperate">Temperate</option>
          <option value="tropical">Tropical</option>
          <option value="frozen">Frozen</option>
        </select>

        <select name="terrain" value={terrainFilter} onChange={handleFilterChange}>
          <option value="">All Terrains</option>
          <option value="desert">Desert</option>
          <option value="grasslands">Grasslands</option>
          <option value="mountains">Mountains</option>
          <option value="forests">Forests</option>
          <option value="swamp">Swamp</option>
          <option value="ocean">Ocean</option>
          <option value="jungle">Jungle</option>
          <option value="tundra">Tundra</option>
        </select>

        <select name="population" value={populationFilter} onChange={handleFilterChange}>
          <option value="">All Populations</option>
          <option value="low">Low (&lt; 1 million)</option>
          <option value="medium">Medium (1 million - 1 billion)</option>
          <option value="high">High (&gt; 1 billion)</option>
        </select>

        <select name="diameter" value={diameterFilter} onChange={handleFilterChange}> 
          <option value="">All Diameters</option>
          <option value="small">Small (&lt; 5000 km)</option>
          <option value="medium">Medium (5000 km - 10000 km)</option>
          <option value="large">Large (&gt; 10000 km)</option>
        </select>

        <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="">Sort by Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <button type="button" onClick={handleResetFilters}>Reset</button>
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="planets-list">
            {planets.length > 0 ? (
              planets.map((planet) => (
                <PlanetCard key={planet.url} planet={planet} />
              ))
            ) : (
              <p>No planets found with the specified filters.</p>
            )}
          </div>
          <div className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={currentPage === page + 1 ? 'active' : ''}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlanetsPage;
