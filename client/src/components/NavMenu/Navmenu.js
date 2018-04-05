import React from "react";
import { Link } from "react-router-dom";
import "./Navmenu.css";

const NavMenu = () => (
    <div className="ui top sidebar inverted vertical menu">
        <div className="ui dropdown icon item">
            <i className="bars icon"></i>
            <div className="menu">        
                <a className="item">
                    <Link 
                        to="/"
                        className={
                            window.location.pathname === "/"
                        }    
                    >
                        Home
                    </Link>
                </a>
                <a className="item">
                    <Link
                        to="/profile"
                        className={
                            window.location.pathname === "/profile"
                        }
                    >    
                        Profile
                    </Link>    
                </a>
                <a className="item">
                    <Link
                        to="/groups"
                        className={
                            window.location.pathname === "/groups"
                        }
                    >    
                        Groups
                    </Link>
                </a>
                <a className="item">
                    <Link 
                        to="/messenger"
                        className={
                            window.location.pathname === "/messenger"
                        }
                    >        
                        Messenger
                    </Link>    
                </a>
                <a className="item">
                    <Link 
                        to="/settings"
                        className={
                            window.location.pathname === "/settings"
                        }    
                    >    
                        Settings
                    </Link>
                </a>
            </div>    
        </div>
    </div>            
);

export default NavMenu;