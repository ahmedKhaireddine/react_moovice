import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Discover from './components/Discover';
import Popular from './components/Popular';
import MyList from './components/MyList';
import './bootstrap.min.css';
import './App.css';

class App extends React.Component{
  render(){
    return(
      <Router>
        <div>
          <nav>
            <ul className="list-link">
              <li>
                  <Link to="/">This Week</Link>
              </li>
              <li>
                  <Link to="/popular/">Popular</Link>
              </li>
              <li>
                  <Link to="/my-list/">My List</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={Discover}/>
          <Route path="/popular/" component={Popular}/>
          <Route path="/my-list/" component={MyList}/>
        </div>
      </Router>
    );
  }
}


export default App;
