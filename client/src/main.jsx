import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <h1> Robot Chef </h1>
        <h2>Team </h2>
        <h3>Absar, Lissette, Ka Wai, Mohammad, Allen</h3>

        <p>Robot Chef is a web app designed to enhance cooking by offering personalized recipe recommendations, ingredient management, meal planning, and interactive cooking guides. Users can find recipes based on their preferences and available ingredients, track their pantry, and plan meals. ​</p>
        <p>Integration with smart kitchen devices and grocery delivery services aims to make cooking more efficient and enjoyable, promoting healthier eating habits and reducing food waste.​</p>


        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    </React.StrictMode>
);