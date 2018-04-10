import React from "react";
import { Link } from "react-router-dom";
import "./Navmenu.css";
import ProfileHeader from "../ProfileHeader";
import { Input, Label, Menu } from 'semantic-ui-react'

const NavMenu = () => ( 
    <Menu vertical>
    {/* //any onclick functions we might need go inside this tag */}
        <Menu.Item name="home"> 
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
        </Menu.Item>
        <Menu.Item name="Profile">
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
        </Menu.Item>
        <Menu.Item>
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
        </Menu.Item>
        <Menu.Item>
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
        </Menu.Item>
    </Menu>        
);

export default NavMenu;