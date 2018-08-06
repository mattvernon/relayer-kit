// External libraries
import React, { Component } from "react";
import { Link } from 'react-router-dom'

// Styling
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header>
                <h1>Dream Relay</h1>

                <nav>
                    <div className="nav-link">
                      <Link to="/" exact={true}>
                          Browse
                      </Link>
                    </div>
                    <div className="nav-link">
                      <Link to="/tokens">
                          Tokens
                      </Link>
                    </div>
                    <div className="nav-link">
                      <Link to="/investments">
                          Investments
                      </Link>
                    </div>

                    <Link
                      to="/create"
                      className="button">
                        Request a Loan
                    </Link>
                </nav>
            </header>
        );
    }
}

export default Header;
