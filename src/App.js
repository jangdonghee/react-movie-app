import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import Search from './Search';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchTitle: "",
      searchType: "quality",
      searchValue: "All"
    }
    
    this._searchTitle = this._searchTitle.bind(this);
    this._searchType = this._searchType.bind(this);
  }

  componentDidMount(){
    console.log("componentDidMount")
    this._getMovies();
  }

  componentWillReceiveProps(nextProps){
    // console.log("nextProps.searchValue : ", nextProps.searchValue);
    // this.setState({
    //   searchType: nextProps.searchType,
    //   searchValue: nextProps.searchValue
    // });
    // this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    //console.log("movies ::: " + movies)
    this.setState({
      movies: movies
    });
    console.log("searchType // ::: " + this.state.searchType);
    console.log("searchValue ::: " + this.state.searchValue);
  }

  _callApi = () => {
    console.log('url ::: https://yts.ag/api/v2/list_movies.json?sort_by=down_count&'+this.state.searchType+"="+this.state.searchValue);
    return fetch('https://yts.ag/api/v2/list_movies.json?sort_by=down_count&'+this.state.searchType+"="+this.state.searchValue)
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch((err) => {console.log("err")})
  }

  _mapToMovieList = (movieList) => {
    movieList = movieList.filter(
      (movie) => {
        if(this.state.searchTitle != ""){
          return movie.title_english.indexOf(this.state.searchTitle) > -1;
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

  _searchType = (searchType, searchValue) => {
    this.setState(
      {
        searchType: searchType,
        searchValue: searchValue
      },function(){
        this._getMovies();
      }
    );
  };

  render() {
    return (
      <div className="container">
        <Search onSearchTitle={this._searchTitle} onSearchType={this._searchType}/>
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