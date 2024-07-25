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
            <Link className="navbar-brand" to="/">MyWebsite</Link>
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
          <nav className="navbar fixed-bottom navbar-light bg-light">
            <div className="container">
              <span className="navbar-text mx-auto">&copy; 2024 MyWebsite. All rights reserved.</span>
            </div>
          </nav>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
