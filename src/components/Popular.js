import React from 'react';
import Card from './movie/Card';
import './Popular.css';

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
        
        console.log('this.state.currentPage : ',this.state.currentPage);
        console.log('numberPage : ',numberPage);
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
        console.log('idMovie : ',idMovie);
        let tabIdMovies =localStorage.getItem('idMovies');
        console.log("tabIdMovies : ", tabIdMovies);
        if(tabIdMovies === null){
            let idMovies =[idMovie];
            localStorage.setItem('idMovies',JSON.stringify(idMovies));
        } else{
            let idMovies = JSON.parse(tabIdMovies);
            idMovies.push(idMovie);
            localStorage.setItem('idMovies',JSON.stringify(idMovies));
        }  
    }

    componentDidMount(){
        const url=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5f33eb7d5c9027aa3ab59e17105731f8`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movies:data.results
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
        return(

            <div className="container">
               <div className="row">
                   {this.renderList()} 
               </div>
               {/* <p>{JSON.stringify(this.state.movies)}</p> */}
            </div>
        )
    }

}
export default Popular;