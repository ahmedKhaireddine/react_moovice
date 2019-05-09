import React from 'react';
import Card from './movie/Card';
import Api from '../utils/Api';
import LocalStorage from '../utils/LocalStorage';

class MyList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movies :[],
            movieIds: this.getFromLocalStorage(),
            pageName:"my-list"
        }
        this.removeMovie = this.removeMovie.bind(this);
    }

    componentDidMount(){
        Promise.all(this.state.movieIds.map((id) =>{
            return Api.getMovie(id).then(movie => movie);
        })).then((movies)=> {
            console.log('movies: ', movies);
            this.setState({
                movies
            })
        })
    }

    getFromLocalStorage(){
        return LocalStorage.get('idMovies');
    }

    removeMovie(idMovie){
        console.log('remove  idMovie : ', idMovie);
        const regex= new RegExp('(?:'+ idMovie +')','ig');
        let movies = [];
        let movieIds = [];
        for(let movie of this.state.movies){
            console.log(movie.id);
            if(!regex.test(movie.id)){
                movies.push(movie);
                movieIds.push(movie.id);
            }
        }
        localStorage.setItem('idMovies', JSON.stringify(movieIds));
        this.setState({
            movies,
            movieIds
        });
    }

    renderList(){
        return this.state.movies.map((movie, index) =>{
            return(
             <Card key={index} movie={movie} pageName={this.state.pageName} onClickRemove={this.removeMovie}/>   
            )
        })
    }

    render(){
        if (this.state.movies.length === 0) {
            return (
              <div className="text-center">
                <h1>My list</h1>
                <p>Loading...</p>
              </div>
            );
        }

        return(
            <div> 
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 style={{
                                padding: 25
                            }}>My list</h1>
                        </div>
                        {this.renderList()}
                    </div>
                </div>
            </div>
        )
    }
}
export default MyList;