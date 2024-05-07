import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import "../styles/top_horizontal_bar_styles.css";
import logo from "../assets/large_shelf_logo.svg";

function TopHorizontalBar() {
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
        </div>
    );
}

export default TopHorizontalBar;