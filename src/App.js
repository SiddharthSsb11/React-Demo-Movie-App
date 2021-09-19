import React, { useState, useEffect, useCallback } from "react";
//import AddMovie from './components/AddMovie';


import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback(async () => {    
    try {
      setIsLoading(true);
      const response = await fetch("https://react-movie-demo-79457-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      
    } catch (error) {
      //console.log(error);
      setError(error.message);

    }

    setIsLoading(false);
  },  []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

 /*  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-6b4a6.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  } */
  
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  

  return (
    <React.Fragment>
      <section>
        
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section> {content} </section>
    </React.Fragment>
  );
}

export default App;
