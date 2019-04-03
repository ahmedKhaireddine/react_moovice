import React from 'react';
import Card from './movie/Card';

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
            return fetch(`https://api.themoviedb.org/3/movie/`+ id +`?api_key=5f33eb7d5c9027aa3ab59e17105731f8`)
            .then(res => res.json())
            .then(data => data)
        })).then((movies)=> {
            console.log('movies: ', movies);
            this.setState({
                movies
            })
        })
    }

    getFromLocalStorage(){
        const idMovies = JSON.parse(localStorage.getItem('idMovies'));
        return idMovies;
    }

    removeMovie(idMovie){
        console.log('remove  idMovie : ', idMovie);
        const regex= new RegExp('(?:'+ idMovie +')','ig');
        let movies = [];
        for(let movie of this.state.movies){
            console.log(movie.id);
            if(!regex.test(movie.id)){
                movies.push(movie);
            }
        }
        console.log('newtable : ', movies);
        this.setState({
            movies
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
        return(
            <div> 
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>My list</p>
                        </div>
                        {this.renderList()}
                    </div>
                </div>
            </div>
        )
    }
}
export default MyList;