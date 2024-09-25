import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Starship from '../models/Starship';
import StarshipCard from '../components/StarshipCard';
import './styles/StarshipsPage.css';

const StarshipsPage = () => {
  const [starships, setStarships] = useState([]);
  const [allStarships, setAllStarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [manufacturerFilter, setManufacturerFilter] = useState('');
  const [starshipClassFilter, setStarshipClassFilter] = useState('');
  const [costFilter, setCostFilter] = useState(''); 
  const [crewSizeFilter, setCrewSizeFilter] = useState(''); 
  const [sortOrder, setSortOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const topRef = useRef(null);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchAllStarships = async () => {
      setIsLoading(true);
      let allFetchedStarships = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
          allFetchedStarships = [...allFetchedStarships, ...response.data.results];
          totalPages = Math.ceil(response.data.count / 10);
          page++;
        }

        const mappedStarships = allFetchedStarships.map(starship => new Starship(
          starship.name,
          starship.model,
          starship.manufacturer,
          starship.cost_in_credits,
          starship.length,
          starship.max_atmosphering_speed,
          starship.crew,
          starship.passengers,
          starship.cargo_capacity,
          starship.consumables,
          starship.hyperdrive_rating,
          starship.MGLT,
          starship.starship_class,
          starship.pilots,
          starship.films,
          starship.created,
          starship.edited,
          starship.url
        ));

        setAllStarships(mappedStarships);
        setTotalPages(Math.ceil(mappedStarships.length / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching starships:', error);
        setIsLoading(false);
      }
    };

    fetchAllStarships();
  }, []);

  useEffect(() => {
    let filteredStarships = [...allStarships];

    if (searchTerm) {
      filteredStarships = filteredStarships.filter(starship =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (manufacturerFilter) {
      filteredStarships = filteredStarships.filter(starship =>
        starship.manufacturer.toLowerCase().includes(manufacturerFilter.toLowerCase())
      );
    }

    if (starshipClassFilter) {
      filteredStarships = filteredStarships.filter(starship =>
        starship.starshipClass.toLowerCase().includes(starshipClassFilter.toLowerCase())
      );
    }

    if (costFilter) {
      filteredStarships = filteredStarships.filter(starship => {
        const cost = parseInt(starship.costInCredits, 10);
        if (isNaN(cost)) return false; 
        if (costFilter === 'low') return cost <= 10000;
        if (costFilter === 'medium') return cost > 10000 && cost <= 100000;
        if (costFilter === 'high') return cost > 100000;
        return true;
      });
    }

    if (crewSizeFilter) {
      filteredStarships = filteredStarships.filter(starship => {
        const crewSize = parseInt(starship.crew, 10);
        if (isNaN(crewSize)) return false; 
        if (crewSizeFilter === 'small') return crewSize < 10;
        if (crewSizeFilter === 'medium') return crewSize >= 10 && crewSize <= 100;
        if (crewSizeFilter === 'large') return crewSize > 100;
        return true;
      });
    }

    if (sortOrder) {
      filteredStarships = filteredStarships.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    setStarships(filteredStarships.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    setTotalPages(Math.ceil(filteredStarships.length / itemsPerPage));
  }, [allStarships, searchTerm, manufacturerFilter, starshipClassFilter, costFilter, crewSizeFilter, sortOrder, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') setSearchTerm(value);
    if (name === 'manufacturer') setManufacturerFilter(value);
    if (name === 'starshipClass') setStarshipClassFilter(value);
    if (name === 'cost') setCostFilter(value); 
    if (name === 'crewSize') setCrewSizeFilter(value); 
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setManufacturerFilter('');
    setStarshipClassFilter('');
    setCostFilter(''); 
    setCrewSizeFilter(''); 
    setSortOrder('');
    setCurrentPage(1);
  };

  return (
    <div className="starships-page">
      <div ref={topRef}></div>
      <h2>Star Wars Starships</h2>
      <div className="search-filter">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search Starships..."
          value={searchTerm}
          onChange={handleFilterChange}
        />

        <select name="manufacturer" value={manufacturerFilter} onChange={handleFilterChange}>
          <option value="">Manufacturers</option>
          <option value="Corellian Engineering Corporation">Corellian Engineering Corporation</option>
          <option value="Incom Corporation">Incom Corporation</option>
          <option value="Kuat Systems Engineering">Kuat Systems Engineering</option>
        </select>

        <select name="starshipClass" value={starshipClassFilter} onChange={handleFilterChange}>
          <option value="">All Classes</option>
          <option value="Starfighter">Starfighter</option>
          <option value="Capital Ship">Capital Ship</option>
          <option value="Transport">Transport</option>
        </select>

        <select name="cost" value={costFilter} onChange={handleFilterChange}> 
          <option value="">Cost in Credits</option>
          <option value="low">Low (&lt; 10,000 credits)</option>
          <option value="medium">Medium (10,000 - 100,000 credits)</option>
          <option value="high">High (&gt; 100,000 credits)</option>
        </select>

        <select name="crewSize" value={crewSizeFilter} onChange={handleFilterChange}> 
          <option value="">Crew Size</option>
          <option value="small">Small (&lt; 10)</option>
          <option value="medium">Medium (10 - 100)</option>
          <option value="large">Large (&gt; 100)</option>
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
          <div className="starships-list">
            {starships.length > 0 ? (
              starships.map((starship) => (
                <StarshipCard key={starship.url} starship={starship} />
              ))
            ) : (
              <p>No starships found with the specified filters.</p>
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

export default StarshipsPage;
