import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';
import "./Navmenu.css";

const NavMenu = () => ( 
    <div>
        <Menu attached='top'>
            <Dropdown item icon='bars' size="large" color="grey">
                <Dropdown.Menu>
                    <Dropdown.Item name="home">
                            <a className="Menuitem">
                                <Link 
                                    to="/"
                                    className={
                                        window.location.pathname === "/"
                                    }
                                >    
                                    Find a Studii Buddy
                                </Link>    
                            </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a className="Menuitem">
                            <Link 
                                to="/messenger"
                                className={
                                    window.location.pathname === "/messenger"
                                }
                            >        
                                Messenger
                            </Link>    
                        </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a className="Menuitem">
                                <Link 
                                    to="/settings"
                                    className={
                                        window.location.pathname === "/settings"
                                    }    
                                >    
                                    Settings
                                </Link>
                            </a>
                        </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
        </Menu>
    </div>           
);

export default NavMenu;