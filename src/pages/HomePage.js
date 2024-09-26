import React from 'react';
import './styles/HomePage.css';
import Footer from '../components/Footer';
function HomePage() {
  return (
    <>
   
      <div className="home-page">
        <h1>Welcome to the SWAPi Catalog</h1>
        <p>Explore the vast universe of Star Wars data, including people, planets, and starships!</p>
        <div className="home-links">
          <a href="/people" className="home-link">People</a>
          <a href="/planets" className="home-link">Planets</a>
          <a href="/starships" className="home-link">Starships</a>
        </div>
      </div>
      <div className="footer">
        All the Star Wars data you've ever wanted, now with The Force Awakens data!
      </div>
      <Footer/>
    </>
  );
}

export default HomePage;
