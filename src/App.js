import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';
import SkeletalLoading from './components/SkeletalLoading';

const Posts = lazy(() => import('./containers/posts/Posts'))
const Post = lazy(() => import('./containers/post/Post'))

function App() {
  return (
    <div>
      <Suspense fallback={<SkeletalLoading />}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="r/pics" />
            </Route>
            <Route exact path="/r/pics" component={Posts} />
            <Route path={`/r/pics/:postid`} component={Post} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
