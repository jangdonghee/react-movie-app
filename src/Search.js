import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            params: this.props.params
        }

        this._searchTitle = this._searchTitle.bind(this);
        this._searchType = this._searchType.bind(this);

        console.log("aaa", this.props.params)
        console.log("bbb", this.state.params.genre)
    }

    _searchTitle = (e) => {
        this.setState(
            {
                title: e.target.value
            }, function (){
                this.props.onSearchTitle(this.state.title);
            }
        )
    }

    _searchType = (e) => {
            this.setState({
                ...this.state, 
                params: {
                    ...this.state.params,
                    [e.target.name]: e.target.value
                }
            }, () => {
                this.props.onSearchType(this.state.params) 
            }
        );
    }

    render(){
        
        return(
            <div className="Search__Wrap">
                <div className="Search__Box">
                    <input type="text" placeholder="Movie Search" onChange={this._searchTitle} />
                </div>
                <div className="Search__Type">
                    <div className="Search__Type__Item">
                        <p>Quality</p>
                        <select name="quality" onChange={this._searchType}>
                            <option value="all">All</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="3D">3D</option>
                        </select>
                    </div>
                    <div>
                        <p>Genre</p>
                        <select name="genre" onChange={this._searchType}>
                            <option value="all">All</option>
                            <option value="action">Action</option>
                            <option value="adventure">Adventure</option>
                            <option value="animation">Animation</option>
                            <option value="biography">Biography</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="documentary">Documentary</option>
                            <option value="drama">Drama</option>
                            <option value="family">Family</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="film-noir">Film-Noir</option>
                            <option value="game-show">Game-Show</option>
                            <option value="history">History</option>
                            <option value="horror">Horror</option>
                            <option value="music">Music</option>
                            <option value="musical">Musical</option>
                            <option value="mystery">Mystery</option>
                            <option value="news">News</option>
                            <option value="reality-tv">Reality-TV</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="sport">Sport</option>
                            <option value="talk-show">Talk-Show</option>
                            <option value="thriller">Thriller</option>
                            <option value="war">War</option>
                            <option value="western">Western</option>
                        </select>
                    </div>
                    <div>
                        <p>Genre</p>
                        <select name="rating" onChange={this._searchType}>
                            <option value="0">All</option>
                            <option value="9">9+</option>
                            <option value="8">8+</option>
                            <option value="7">7+</option>
                            <option value="6">6+</option>
                            <option value="5">5+</option>
                            <option value="4">4+</option>
                            <option value="3">3+</option>
                            <option value="2">2+</option>
                            <option value="1">1+</option>
                        </select>
                    </div>
                    <div>
                        <p>Order By</p>
                        <select name="order_by" onChange={this._searchType}>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                            <option value="seeds">Seeds</option>
                            <option value="peers">Peers</option>
                            <option value="year">Year</option>
                            <option value="rating">Rating</option>
                            <option value="likes">Likes</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="downloads">Downloads</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

 Search.defaultProp = {
    title: ""
}

export default Search;