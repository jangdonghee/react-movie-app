import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  state = {}

  componentDidMount(){
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies: movies
    });
  }

  _callApi = () => {
    return fetch('https://yts.ag/api/v2/list_movies.json?sort_by=down_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch((err) => {console.log("err")})
  }

  _renderMovies = () => {
    const movieList = this.state.movies.map((movie, index) => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        key={movie.id} />
    });

    return movieList;
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {
          this.state.movies ? this._renderMovies() : "Loading.."
        }
      </div>
    );
  }
}

export default App;