import React from "react";
import "./Profile.css";
import SwipeCard from "../../components/SwipeCard"


const Profile = (props) => (
    <div style={{paddingTop: 200}}>
        <div className="container">
            <div className="bookshelf_wrapper">
                <ul className="books_list">
                    <li className="book_item first"></li>
                    <li className="book_item second"></li>
                    <li className="book_item third"></li>
                    <li className="book_item fourth"></li>
                    <li className="book_item fifth"></li>
                    <li className="book_item sixth"></li>
                </ul>
                <div className="shelf"></div>
            </div>
        </div>
        <SwipeCard />
    </div>
);


export default Profile;
