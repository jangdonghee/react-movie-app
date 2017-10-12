import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import './Movie.css';

/*
//Render : componentWillMount() => Render => componentDidMount()
//Update : componentWillReceiveProps() => shouldComponentUpdate() true 이면 
            => componentWillUpdate() => Render() => componentDidUpdate()
*/
class Movie extends Component {
    render() {
        return (
            <div className="Movie">
                <div className="Movie__Column">
                    <MoviePoster poster={this.props.poster}/>
                </div>
                <div className="Movie__Column">
                    <h1>{this.props.title}</h1>
                    <div className="Movie__Genres">
                        {this.props.genres.map((genre, index) => {
                            return <MovieGenre genre={genre} key={index} />
                        })}
                    </div>
                    <div className="Movie__Synopsis">
                        <LinesEllipsis
                            text={this.props.synopsis}
                            maxLine="4"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const MovieGenre = ({genre}) => {
    return(
        <span className="Movie__Genre">{genre} </span>
    )
}

class MoviePoster extends Component{
    render(){
      return(
        <img src={this.props.poster} alt={this.props.title} title={this.props.title} className="Movie__Poster"/>
      );
    }
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired
};

export default Movie;