import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import "../styles/vertical_page_bar_styles.css";

function VerticalPageBarCell() {
    return (
        <Fragment>
            <h1>Vertical Page Bar Cell</h1>
        </Fragment>
    );
}

function VerticalPageBar() {
    return (
        <div
            id = "vertical-page-bar"
        >
            <h1>Vertical Page Bar</h1>
        </div>
    );
}

export default VerticalPageBar;