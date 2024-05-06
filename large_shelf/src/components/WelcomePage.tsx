import { Fragment } from "react";
import { MouseEvent } from "react";
import { useState } from "react";
import "./../welcome_page_styles.css";

function CoverPart() {
    return (<div 
        className = "cover-part"
    >
        This should be cover part!!!
    </div>);
}

function WelcomePage() {
    return (
        <>
            {CoverPart()}
        </>
    )
}

export default WelcomePage;