import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Posts from './containers/posts/Posts';
import Post from './containers/post/Post';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="r/pics" />
        </Route>
        <Route exact path="/r/pics" component={Posts} />
        <Route path={`/r/pics/:postid`} component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
