import React from 'react';
import Api from '../utils/Api';
import Card from './movie/Card';
import LocalStorage from '../utils/LocalStorage';
// import NumbreRandom from '../utils/NumbreRandom';

class Discover extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movies: [],
            pageName : "thisWeek",
            currentPage:1
        }
        this.nextPage= this.nextPage.bind(this)
        this.addFavoriteMovies= this.addFavoriteMovies.bind(this)
    }

    componentDidMount(){
        Api.getLatestMovies().then(movies =>{
            this.setState({ 
                movies
            });
        });
    }

    nextPage(){
        // const numberPage= Math.ceil(this.state.movies.length / 2);
        // let randomPage = NumbreRandom.getNumbreRandom(1, numberPage);
        this.setState({
            currentPage: this.state.currentPage + 1
        });
    }

    addFavoriteMovies(idMovie){
        LocalStorage.save('idMovies', idMovie); 
    }

    render(){
        const { movies, currentPage } = this.state
        if (movies.length === 0) {
            return (
              <div className="text-center">
                <h1 style={{
                        padding: 20
                    }}>This Week</h1>
                <p>Loading...</p>
              </div>
            );
        }
        
        if(((currentPage - 1) * 2) >= movies.length){
            return(
                <div className="text-center">
                    <h1 style={{
                            padding: 25
                        }}>This Week</h1>
                    <p>All movies have been selected</p>
                </div>    
            );
        }
        const currentIndex = ((currentPage - 1) * 2 ); 
        const movie1 = movies[currentIndex];
        const movie2 = movies[currentIndex + 1];
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 style={{
                                padding: 25
                            }}>This Week</h1>
                        </div>
                        <Card 
                            movie ={movie1} 
                            pageName={this.state.pageName} 
                            onClickPage={this.nextPage} 
                            onClick={this.addFavoriteMovies} 
                        />
                        <Card 
                            movie={movie2} 
                            pageName={this.state.pageName} 
                            onClickPage={this.nextPage} 
                            onClick={this.addFavoriteMovies} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Discover;