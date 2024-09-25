import React, { useState, useEffect, useRef } from 'react';
import Person from '../models/Person';
import PersonCard from '../components/PersonCard';
import "./styles/PeoplePage.css";

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [allPeople, setAllPeople] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [eyeColorFilter, setEyeColorFilter] = useState('');
  const [hairColorFilter, setHairColorFilter] = useState('');
  const [skinColorFilter, setSkinColorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);

  const topRef = useRef(null);
  const charactersPerPage = 12; 

 
  useEffect(() => {
    const fetchAllPeople = async () => {
      setIsLoading(true);
      let allFetchedPeople = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
          const data = await response.json();
          allFetchedPeople = [...allFetchedPeople, ...data.results];

          totalPages = Math.ceil(data.count / 10); 
          page++;
        }

       
        const mappedPeople = allFetchedPeople.map(person => new Person(
          person.name,
          person.birth_year,
          person.eye_color,
          person.gender,
          person.hair_color,
          person.height,
          person.mass,
          person.skin_color,
          person.homeworld,
          person.films,
          person.species,
          person.starships,
          person.vehicles,
          person.url
        ));

        setAllPeople(mappedPeople);
        setPeople(mappedPeople.slice(0, charactersPerPage)); 
        setTotalPages(Math.ceil(mappedPeople.length / charactersPerPage)); 
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching people:', error);
        setIsLoading(false);
      }
    };

    fetchAllPeople();
  }, []);

  
  useEffect(() => {
    let filteredPeople = [...allPeople];

    if (nameFilter) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (genderFilter) {
      filteredPeople = filteredPeople.filter(person => person.gender === genderFilter);
    }

    if (eyeColorFilter) {
      filteredPeople = filteredPeople.filter(person => person.eyeColor === eyeColorFilter);
    }
    if (hairColorFilter) {
      filteredPeople = filteredPeople.filter(person => person.hairColor === hairColorFilter);
    }
    if (skinColorFilter) {
      filteredPeople = filteredPeople.filter(person => person.skinColor === skinColorFilter);
    }

   
    if (sortOrder) {
      filteredPeople = filteredPeople.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    setPeople(filteredPeople.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage));
    setTotalPages(Math.ceil(filteredPeople.length / charactersPerPage));
  }, [allPeople, nameFilter, genderFilter, eyeColorFilter, hairColorFilter, skinColorFilter, sortOrder, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setNameFilter(value);
    if (name === 'gender') setGenderFilter(value);
    if (name === 'eyeColor') setEyeColorFilter(value);
    if (name === 'hairColor') setHairColorFilter(value);
    if (name === 'skinColor') setSkinColorFilter(value);
    setCurrentPage(1); 
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); 
  };

  const handleResetFilters = () => {
   
    setNameFilter('');
    setGenderFilter('');
    setEyeColorFilter('');
    setHairColorFilter('');
    setSkinColorFilter('');
    setSortOrder(''); 

    
    setPeople(allPeople.slice(0, charactersPerPage)); 
    setTotalPages(Math.ceil(allPeople.length / charactersPerPage)); 
    setCurrentPage(1); 
  };

  return (
    <div className="people-page">
      <div ref={topRef}></div>
      <h2>Star Wars Characters</h2>
      <div className="search-filter">
        <input
          type="text"
          name="name"
          placeholder="Search People..."
          value={nameFilter}
          onChange={handleFilterChange}
        />

        <select name="gender" value={genderFilter} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="hermaphrodite">Hermaphrodite</option>
          <option value="n/a">N/A</option>
          <option value="none">None</option>
        </select>

        <select name="eyeColor" value={eyeColorFilter} onChange={handleFilterChange}>
          <option value="">All Eye Colors</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="brown">Brown</option>
          <option value="hazel">Hazel</option>
          <option value="orange">Orange</option>
          
          <option value="black">Black</option>
          <option value="pink">Pink</option>
          <option value="gold">Gold</option>
          <option value="blue-gray">Blue-Gray</option>
          <option value="green, yellow">Green-Yellow</option>
          <option value="unknown">Unknown</option>
        </select>

        <select name="hairColor" value={hairColorFilter} onChange={handleFilterChange}>
          <option value="">All Hair Colors</option>
          <option value="blond">Blond</option>
          <option value="brown">Brown</option>
          <option value="black">Black</option>
          <option value="auburn">Auburn</option>
          <option value="white">White</option>
          <option value="grey">Grey</option>
          <option value="auburn, white">Auburn-White</option>
          <option value="auburn, grey">Auburn-Grey</option>
          <option value="none">None</option>
          <option value="n/a">N/A</option>
        </select>

        <select name="skinColor"  value={skinColorFilter} onChange={handleFilterChange}>
          <option value="">All Skin Colors</option>
          <option value="fair">Fair</option>
          <option value="light">Light</option>
          <option value="gold">Gold</option>
          <option value="white">White</option>
          <option value="pale">Pale</option>
          <option value="green">Green</option>
          <option value="tan">Tan</option>
          <option value="dark">Dark</option>
          <option value="metal">Metal</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="brown mottle">Brown Mottle</option>
          <option value="white, blue">White-Blue</option>
          <option value="grey, red">Grey-Red</option>
          <option value="blue, grey">Blue-Grey</option>
          <option value="grey, blue">Grey-Blue</option> 
          <option value="white, red">White-Red</option>
          <option value="silver, red">Silver-Red</option>
          <option value="green, grey">Green-Grey</option>
          <option value="brown, white">Brown-White</option>  
          <option value="grey, green, yellow">Grey-Green-Yellow</option>
          <option value="green-tan, brown">Green-Tan Brown</option>
          <option value="fair, green, yellow">Fair-Green-Yellow</option>
          <option value="unknown">Unknown</option>
        </select>

        <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="">Sort by Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <button type="button"  onClick={handleResetFilters}>Reset</button>
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="people-list">
            {people.length > 0 ? (
              people.map((person) => (
                <PersonCard key={person.url} person={person} />
              ))
            ) : (
              <p>No characters found with the specified filters.</p>
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

export default PeoplePage;
