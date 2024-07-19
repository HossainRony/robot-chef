import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Profile from './components/Profile';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <h1> Robot Chef </h1>
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    </React.StrictMode>


)