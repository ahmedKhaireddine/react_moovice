import React from 'react';
import IconFavorite from '../core/IconFavorite';
import IconRemove from '../core/IconRemove';
import imageMissing from'../../no-image.png';
import Button from '../core/Button';

class Card extends React.Component{
    renderIconFavorite(){
        return(
            ((this.props.pageName === "popular")|| (this.props.pageName === "thisWeek"))? 
                <IconFavorite 
                    className="fas fa-star"
                    onClickFn={this.props.onClick} 
                    id={this.props.movie.id}     
                />
            :null
        )
    }

    renderIconRemove(){
        return(
            this.props.pageName === "my-list" ? 
                <IconRemove
                    color="red"
                    className="fas fa-times"
                    onClickFn={this.props.onClickRemove} 
                    id={this.props.movie.id}     
                />
            : null 
        )
    }

    renderCard(){

        return(
            <div className="box">
                <div className="box-card">
                    <div className="box-Pictur">
                        <img 
                            className="" 
                            src={this.props.movie.poster_path === null ? imageMissing: "https://image.tmdb.org/t/p/w200"+ this.props.movie.poster_path}
                            alt={"film" + this.props.movie.title}
                            onClick={this.props.onClickPage}
                        />
                        {this.renderIconFavorite()}
                        {this.renderIconRemove()}
                    </div>
                    <Button id={this.props.movie.id}>More Info</Button>
                </div>
                {((this.props.pageName === "popular")|| (this.props.pageName === "thisWeek")) ? 
                <div className="box-title">
                <h5>{this.props.movie.title}</h5>
                </div> : null }
            </div>
        );
    }
    render(){
 
        return(
            ((this.props.pageName === "popular")|| (this.props.pageName === "thisWeek"))? 
            <div className="col-6 col-lg-3 offset-lg-2">
                {this.renderCard()}
            </div> 
            : <div className="col-6 col-md-4 col-lg-3">
            {this.renderCard()}
            </div>
                
        );
    }
}
export default Card;
