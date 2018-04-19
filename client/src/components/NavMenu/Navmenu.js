import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from 'semantic-ui-react';
import "./Navmenu.css";

const NavMenu = () => ( 
    <div>
        <Menu attached='top'>
            <Dropdown item icon='bars'>
                <Dropdown.Menu>
                    <Dropdown.Item name="home">
                                <Link 
                                    to="/"
                                    className={
                                        window.location.pathname === "/" ? "active" : ""
                                    }
                                >    
                                    Find a Studii Buddy
                                </Link>    
                    </Dropdown.Item>
                    <Dropdown.Item>
                            <Link 
                                to="/messenger"
                                className={
                                    window.location.pathname === "/messenger" ? "active" : ""
                                }
                            >        
                                Messenger
                            </Link>    
                        </Dropdown.Item>
                        <Dropdown.Item>
                                <Link 
                                    to="/settings"
                                    className={
                                        window.location.pathname === "/settings" ? "active" : ""
                                    }    
                                >    
                                    Settings
                                </Link>
                        </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
        </Menu>
    </div>           
);

export default NavMenu;