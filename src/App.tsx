import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style/index.css';
import Start from './components/Start/';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Start} />
    </Router>
  );
}

export default App;
