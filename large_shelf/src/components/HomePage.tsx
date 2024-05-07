import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import VerticalPageBar from "./VerticalPageBar";
import "../styles/home_page_styles.css";

function HomePage() {
    return (
        <div
            id = "home-page"
        >
            <div
                id = "content-part"
            >
                <VerticalPageBar />
                <div
                    id = "shelf-list-part"
                >
                    <h1>Shelf List Part</h1>
                </div>
            </div>
        </div>
    );
}

export default HomePage;