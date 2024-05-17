import { Fragment, MouseEvent, useState } from "react";
import "../styles/top_horizontal_bar_styles.css";
import logo from "../assets/large_shelf_logo.svg";
import searchIcon from "../assets/normal_search_icon.svg";

interface TopHorizontalBarProps {
    onSearchButtonClick: (searchQuery: string) => void;
}

interface SearchBarProps {
    onSearchButtonClick: (searchQuery: string) => void;
}

function SearchBar(
    {
        onSearchButtonClick
    }: SearchBarProps
) {
    return (
        <div
            id = "search-bar"
        >
            <button
                id = "search-icon-button"
                onClick = {
                    () => {
                        const searchQuery = (document.getElementById("search-bar-input") as HTMLInputElement).value;
                        onSearchButtonClick(searchQuery);
                    }
                }
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

export default function TopHorizontalBar(
    {
        onSearchButtonClick
    }: TopHorizontalBarProps
) {
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
            <SearchBar 
                onSearchButtonClick = {onSearchButtonClick}
            />
        </div>
    );
}