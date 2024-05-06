import { Fragment } from "react";
import { MouseEvent } from "react";
import { useState } from "react";
import "./../styles/welcome_page_styles.css";

function CoverLogo() {
    return (<img 
        className = "cover-logo"
        src = "./../assets/large_shelf_logo.svg"
        alt = "Large Shelf Logo"
    />);
}

function CoverTitle() {
    return (<h1 
        className = "cover-title"
    >
            You can read your favorite books here, <br/>
        or listen to them read by your preference of voices
    </h1>);
}

function CoverPart() {
    return (<div 
        className = "cover-part"
    >
        {CoverLogo()}
        {CoverTitle()}
    </div>);
}

function WelcomePage() {
    return (
        <div
            className = "welcome-page"
        >
            {CoverPart()}
        </div>
    )
}

export default WelcomePage;