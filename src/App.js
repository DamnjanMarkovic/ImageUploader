import './App.css';
import { useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Images from './components/Images';

import About from './components/About'


function App() {


  return (
    <Router>
      <div className="container">
        
        <Route path='/' exact render={(props) => (
            <>                        
               <Images />
            </>
          )} />
        
        <Route path='/about' component={ About } />
        
 
      </div>
    </Router>

  );
}

export default App;
