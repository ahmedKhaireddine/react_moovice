import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Button extends React.Component{
    render(){
        const lien = "/movie/" + this.props.id;
        return(
            <button style={{
                        width:"100%",
                        borderBottomRightRadius:5,
                        borderBottomLeftRadius:5,
                        backgroundColor: "#081b23"
                    }}>
                    <Link to={lien}>{this.props.children}</Link>
            </button>
        );
    }
}
export default Button; 