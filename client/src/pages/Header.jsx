import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="Robot Chef Logo" />
        <h1>Robot Chef</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>
      <div className="auth-links">
        <Link to="/search">Search</Link>
        <Link to="/login">Login/Signup</Link>
      </div>
    </header>
  );
}

export default Header;
