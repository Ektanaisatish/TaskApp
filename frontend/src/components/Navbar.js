import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Retrieve userData from localStorage
    const userTokenString = localStorage.getItem("token");

    // Parse userDataString only if it's not null
    const userData = userTokenString ? (userTokenString) : null;

    // Function to handle logout
    const handleLogout = () => {
        // Clear localStorage and navigate to login page
        localStorage.clear();
        navigate("/login");
        console.log("User logged out");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'gray' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: 'black' }}>
                        TaskApp
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/dashboard" style={{ color: 'black' }}>
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/mytasks" style={{ color: 'black' }}>
                                  My Task
                                </Link>
                            </li>
                        </ul>
                        {/* Render Logout button only if userData exists */}
                        {userData && (
                            <Link className="btn btn-primary mx-2" to="/logout" role="button" onClick={handleLogout}>
                                Logout
                            </Link>
                        )}
                        {/* Render Login and Signup buttons if userData does not exist */}
                        {!userData && (
                            <>
                                <Link className="btn btn-primary mx-2" to="/login" role="button">
                                    Login
                                </Link>
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
