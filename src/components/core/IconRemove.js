import React from "react";

class IconRemove extends React.Component{
    
    render(){

        const { className, onClickFn, id, color} = this.props;
        return(
            <i  className={className} 
            style={{
                color: color,
                fontSize: "1.5em"
            }}
                onClick={()=>onClickFn(id)}
            ></i>
        );
    }

}
export default IconRemove;