class Starship {
    constructor(
      name,
      model,
      manufacturer,
      costInCredits,
      length,
      maxAtmospheringSpeed,
      crew,
      passengers,
      cargoCapacity,
      consumables,
      hyperdriveRating,
      MGLT,
      starshipClass,
      pilots,
      films,
      created,
      edited,
      url
    ) {
      this.name = name;
      this.model = model;
      this.manufacturer = manufacturer;
      this.costInCredits = costInCredits;
      this.length = length;
      this.maxAtmospheringSpeed = maxAtmospheringSpeed;
      this.crew = crew;
      this.passengers = passengers;
      this.cargoCapacity = cargoCapacity;
      this.consumables = consumables;
      this.hyperdriveRating = hyperdriveRating;
      this.MGLT = MGLT;
      this.starshipClass = starshipClass;
      this.pilots = pilots;
      this.films = films;
      this.created = created;
      this.edited = edited;
      this.url = url;
    }
  }
  
  export default Starship;
  