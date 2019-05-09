import React from 'react';
import Api from '../utils/Api';
import imageMissing from '../no-image.png';
import IconFavorite from './core/IconFavorite';
import IconRemove from './core/IconRemove';
import LocalStorage from '../utils/LocalStorage';


class Movie extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            movie:{}
        }
        this.addFavoriteMovies= this.addFavoriteMovies.bind(this);
        this.removeFavoriteMovies = this.removeFavoriteMovies.bind(this);
    }

    componentDidMount(){
      return Api.getMovie(this.props.match.params.id).then(movie => {
          console.log(movie);
          this.setState({
              movie
          })
        });
    }

    addFavoriteMovies(idMovie){
        LocalStorage.save('idMovies', idMovie); 
    }

    removeFavoriteMovies(idMovie){
        LocalStorage.remove('idMovies', idMovie);
    }

    renderGenres(){
        console.log(typeof this.state.movie.genres);
        console.log(" genres : ",this.state.movie.genres);
        if(Object.keys(this.state.movie).length === 0){
            console.log('#renderGenres');
            return null;
        }
        return this.state.movie.genres.map((genre) =>{
                return <span style={{
                    paddingRight:10 
                }}>{genre.name}</span>
        });
    }

    renderIconFavorite(){
        return(
            <IconFavorite 
                className="fas fa-star"
                onClickFn={this.addFavoriteMovies} 
                id={this.state.movie.id}     
            />
        )
    }

    renderIconRemove(){
        return(
            <IconRemove
                color="red"
                className="fas fa-times"
                onClickFn={this.removeFavoriteMovies} 
                id={this.state.movie.id}     
            />
        )
    }
    
    render(){
        console.log('Movie#render this.props', this.props);
        console.log('Movie#render this.state', this.state);
        const { movie } = this.state;
        const   image = movie.poster_path === null ? 
                imageMissing : "https://image.tmdb.org/t/p/w200"+ movie.poster_path;       

        if(Object.keys(movie).length > 0){
        return(
            <div className="text-center container-movie">
                <div className="container">
                    <article className="article-movie row">
                        <div className="movie-piture col-12 col-md-5 col-lg-3">
                            <img
                                style={{
                                    width: "100%"
                                }}
                                src={image}
                                alt={movie.title}
                            />
                        </div>
                        <div className="movie-detail col-12 col-md-7 col-lg-8">
                            <h1>{movie.title}</h1>
                            <div className="text-left">
                                <div className="row">
                                    <div className="col-5 col-md-5 col-lg-4">
                                        <p><strong>Release date : </strong></p>
                                    </div>
                                    <div className="col-6 col-md-5 col-lg-4">
                                        <p>{movie.release_date}</p>
                                    </div>
                                </div>
                                {movie.production_countries[0].name === undefined ? null :
                                <div className="row">
                                    <div className="col-5 col-md-5 col-lg-4">
                                        <p><strong>Pays : </strong></p>
                                    </div>
                                    <div className="col-6 col-md-5 col-lg-4">
                                        <p>{movie.production_countries[0].name}</p>
                                    </div>
                                </div>
                                }
                                <div className="row">
                                    <div className="col-5 col-md-5 col-lg-4">
                                        <p><strong>Genres : </strong></p>
                                    </div>
                                    <div className="col-4 col-md-5 col-lg-4">
                                        {this.renderGenres()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3>Overview : </h3>
                                <p>{movie.overview}</p>
                            </div>
                            <div>
                                <ul className="icon-list text-center">
                                    <li>
                                        {this.renderIconFavorite()}
                                    </li>
                                    <li>
                                        {this.renderIconRemove()}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
        }
        return (
            <div className="text-center">
              <p>Loading...</p>
            </div>
        );
    }
}
export default Movie;