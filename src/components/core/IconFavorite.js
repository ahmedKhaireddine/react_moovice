import React from "react";
import LocalStorage from "../../utils/LocalStorage";

class IconFavorite extends React.Component{
    
    render(){
        console.log('this.props : ', this.props);
        const { className, onClickFn, id} = this.props;
        const moviesId = LocalStorage.get('idMovies') || 0;
        let isFavorite = false;
        if(moviesId.length > 0){
            if(moviesId.includes(id)=== true){
                isFavorite = true;
            }
        }
        return(
            <i  className={className} 
            style={{
                color:isFavorite ? "yellow": "grey",
                fontSize: "1.3em"
            }}
                onClick={()=>onClickFn(id)}
            ></i>
        );
    }

}
export default IconFavorite;