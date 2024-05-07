import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import VerticalPageBar from "./VerticalPageBar";
import "../styles/home_page_styles.css";
import TopHorizontalBar from "./TopHorizontalBar";
import PAGE_ID from "../PageID";

interface HomePageProps {
    onPageOptionClick: (pageID: number) => void;
}

function HomePage(
    {
        onPageOptionClick
    }: HomePageProps
) {
    return (
        <div
            id = "home-page"
        >
            <TopHorizontalBar 
        
            />
            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID.HOME_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />
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