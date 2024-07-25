import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/home';
import Services from './pages/services';
import Contact from './pages/contact';
import About from './pages/about';
import Register from './pages/register';
import Login from './pages/login';
import RecipeList from './pages/recipe-list';
import RecipeDetails from './pages/recipe-detail';
import 'bootstrap/dist/css/bootstrap.min.css';

import twitterIcon from './image/twitter.png';
import facebookIcon from './image/facebook.png';
import instagramIcon from './image/instagram.png';
import logo from './image/logo-50x50.png';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('jwt_token');
    const username = localStorage.getItem('username');
    return token && username ? { username } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
              <img src={logo} alt="Robot Chef Logo" width="50" height="50" />
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/recipes">Recipes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              </ul>
              <ul className="navbar-nav ml-auto">
                {user ? (
                  <>
                    <li className="nav-item"><span className="navbar-text mr-3">Welcome, {user.username}</span></li>
                    <li className="nav-item"><button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  </>
                )}
              </ul>
            </div>
          </nav>
          <div className="container mt-4 text-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipe-details" element={<RecipeDetails />} />
              <Route path="/recipe-details/:id" element={<RecipeDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
            </Routes>
          </div>
          <footer className="footer">
            <div className="container footer-content">
              <span className="navbar-text mx-auto">&copy; 2024 | COMP229 - Sec 402 | Group 1 </span>
              <div className="social-media">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src={twitterIcon} alt="Twitter" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="Instagram" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
