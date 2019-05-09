import React from 'react';
import Card from './movie/Card';
import Api from '../utils/Api';
import LocalStorage from '../utils/LocalStorage';

class Popular extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movies:[],
            currentPage:1,
            firstMovie:0,
            lastMovie:2,
            pageName:"popular"
        }
        this.addFavoriteMovies= this.addFavoriteMovies.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    nextPage(){
        const numberPage = this.state.movies.length /2;
        if(this.state.currentPage >= numberPage){
            this.setState({
                currentPage: 1,
                firstMovie: 0,
                lastMovie: 2
            });
            return;
        }
        this.setState({
            currentPage: this.state.currentPage + 1,
            firstMovie: this.state.lastMovie,
            lastMovie: this.state.lastMovie + 2
        });
    }

    addFavoriteMovies(idMovie){
        LocalStorage.save('idMovies', idMovie); 
    }

    componentDidMount(){
        Api.getPopularMovies().then(movies =>{
            this.setState({ 
                movies
            });
        });
    } 

    renderList() {
        const newTabMovies = this.state.movies.slice(this.state.firstMovie, this.state.lastMovie);
        return newTabMovies.map((movie, index)=>{
            return(
                <Card 
                    key={index} 
                    movie={movie} 
                    onClick={this.addFavoriteMovies}
                    onClickPage={this.nextPage}
                    pageName={this.state.pageName}
                />
            );
        })
    }
    
    render(){
        if (this.state.movies.length === 0) {
            return (
              <div className="text-center">
                <h1>Popular</h1>
                <p>Loading...</p>
              </div>
            );
        }
        return(
            <div className="container">
               <div className="row">
                    <div className="col-12 text-center">
                        <h1 style={{
                            padding: 25
                        }}>Popular</h1>
                    </div>
                    
                   {this.renderList()} 
               </div>
            </div>
        )
    }

}
export default Popular;