import { Fragment, MouseEvent, useState } from "react";
import "../styles/top_horizontal_bar_styles.css";
import logo from "../assets/large_shelf_logo.svg";
import searchIcon from "../assets/normal_search_icon.svg";

function SearchBar() {
    return (
        <div
            id = "search-bar"
        >
            <button
                id = "search-icon-button"
            >
                <img
                    id = "search-icon"
                    src = {searchIcon}
                    alt = "Search icon"
                />
            </button>
            <input
                id = "search-bar-input"
                type = "text"
                placeholder = "Search books"
            />
        </div>
    );
}

export default function TopHorizontalBar() {
    return (
        <div
            id = "top-horizontal-bar"
        >
            <img
                id = "large-shelf-logo"
                src = {logo}
                alt = "Large Shelf Logo"
            />
            <h1
                id = "website-title"
            >
                Large Shelf
            </h1>
            <SearchBar />
        </div>
    );
}