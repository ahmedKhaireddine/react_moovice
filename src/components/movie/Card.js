import React from 'react';

class Card extends React.Component{
    
    render(){
        console.log(" Card this.props : ", this.props.movie);
        return(
            <div className="col-6 col-lg-4">
                <div className="box">
                    <img 
                        className="" 
                        src={"https://image.tmdb.org/t/p/w200"+ this.props.movie.poster_path}
                        alt={"film" + this.props.movie.title}
                        onClick={this.props.onClickPage}
                    />
                    <div>
                        {this.props.pageName === "popular" ? 
                        <i className="far fa-star" onClick={()=>this.props.onClick(this.props.movie.id)}></i>
                        : null }
                        {this.props.pageName === "my-list" ? 
                        <i className="fas fa-times" onClick={()=>this.props.onClickRemove(this.props.movie.id)}></i>
                        : null }
                    <h5>{this.props.movie.title}</h5>
                    </div>
                </div>
            </div>
        );
    }
}
export default Card;