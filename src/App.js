import React from 'react';
import './App.css';
import Posts from './containers/posts/Posts';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Route exact path="/">
          <Redirect to="r/pics" />
        </Route>
        <Route exact path="/r/pics" component={Posts} />
    </Router>
  );
}

export default App;
