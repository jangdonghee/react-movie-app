import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import Search from './Search';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchTitle: "",
      params: {
        sort_by: "down_count",
        quality: "all",
        genre: "all",
        rating: "all",
        order_by: "latest"
      }
    }
    
    this._searchTitle = this._searchTitle.bind(this);
    this._searchType = this._searchType.bind(this);
  }

  componentDidMount(){
    console.log("componentDidMount")
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    //console.log("movies ::: " + movies)
    this.setState({
      movies: movies
    });
  }

  _getQueryParams = (params) => {
    return Object.keys(params).map(k => k + "=" + params[k]).join("&");
  }

  _callApi = () => {
    const url = "https://yts.ag/api/v2/list_movies.json";
    let params = this.state.params;

    console.log("url", url)
    console.log("this.state.params", this.state.params)

    return fetch(url + "?" + this._getQueryParams(params))
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch((err) => {console.log("err")})
  }

  _mapToMovieList = (movieList) => {
    movieList = movieList.filter(
      (movie) => {
        if(this.state.searchTitle != ""){
          return movie.title_english.toUpperCase().indexOf(this.state.searchTitle.toUpperCase()) > -1;
        }else{
          return this.state.movies;
        }
      }
    );

    return movieList.map((movie, index) => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        key={movie.id} />
    });
  }

  _searchTitle = (title) => {
    this.setState({
      searchTitle: title
    });
  }

  _searchType = (params) => {
    this.setState(
      {
        params: params
      },function(){
        this._getMovies();
      }
    );
  };

  render() {
    return (
      <div className="container">
        <Search onSearchTitle={this._searchTitle} onSearchType={this._searchType} params={this.state.params}/>
        <div className={this.state.movies ? "App" : "App--loading"}>
        {
          //this.state.movies ? this._renderMovies() : "Loading.."
          this.state.movies ? this._mapToMovieList(this.state.movies) : "Loading.."
        }
        </div>
      </div>
    );
  }
}

export default App;