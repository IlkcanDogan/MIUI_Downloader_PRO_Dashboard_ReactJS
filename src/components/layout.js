import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import app from '../core/firebase.config';

function Layout({ children }) {
    const location = useLocation();

    useEffect(() => {
        document.body.style.backgroundColor = '#fff'; //'#f0f0f2';
    }, [])

    return (
        <div>
            <nav className="navbar-expand-lg navbar navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand">MIUI Downloader Pro</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className={`nav-link ${location.pathname === '/home' ? ' active' : null}`}>
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/device-models" className={`nav-link ${location.pathname === '/device-models' ? ' active' : null}`}>
                                    Cihaz Modelleri
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <button className="btn btn-danger" onClick={()=> app.auth().signOut()}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Çıkış Yap
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    )
}

export default Layout;