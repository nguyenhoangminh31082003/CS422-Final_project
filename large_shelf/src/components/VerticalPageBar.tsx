import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import "../styles/vertical_page_bar_styles.css";
import PAGE_ID from "../PageID";

interface VerticalPageBarProps {
    chosenPageID: number;
}

interface VerticalPageBarCellProps {
    htmlID: string;
    name: string;
    pageID: number;
    chosen: boolean;
}

function VerticalPageBarCell(
    { 
        htmlID, 
        name, 
        pageID 
    }: VerticalPageBarCellProps
) {
    return (
        <div
            className = "vertical-page-bar-cell"
        >
            <h1
                id = {htmlID}
                className = "option-name"
            >
                {name}
            </h1>
        </div>
    );
}

function VerticalPageBar(
    { 
        chosenPageID 
    }: VerticalPageBarProps
) {

    const pageOptions = [
        {
            "id": "home-page-option",
            "name": "Home",
            "pageID": PAGE_ID.HOME_PAGE,
            "icon-source": "home_page_icon.svg"
        },
        {
            "id": "book-page-option",
            "name": "Book",
            "pageID": PAGE_ID.BOOK_PAGE,
            "icon-source": "book_page_icon.svg"
        },
        {
            "id": "voice-page-option",
            "name": "Voice",
            "pageID": PAGE_ID.VOICE_PAGE,
            "icon-source": "voice_page_icon.svg"
        },
        {
            "id": "account-page-option",
            "name": "Account",
            "pageID": PAGE_ID.ACCOUNT_PAGE,
            "icon-source": "account_page_icon.svg"
        },
        {
            "id": "library-page-option",
            "name": "Library",
            "pageID": PAGE_ID.LIBRARY_PAGE,
            "icon-source": "library_page_icon.svg"
        },
        {
            "id": "log-out-page-option",
            "name": "Log out",
            "pageID": PAGE_ID.WELCOME_PAGE,
            "icon-source": "welcome_page_icon.svg"
        }
    ];

    return (
        <div
            id = "vertical-page-bar"
        >
            {
                pageOptions.map(
                    (pageOption) => {
                        return (
                            <VerticalPageBarCell
                                htmlID = {
                                    pageOption.id
                                }
                                name = {
                                    pageOption.name
                                }
                                pageID = {
                                    pageOption.pageID
                                }
                                chosen = {
                                    pageOption.pageID === chosenPageID
                                }
                            />
                        );
                    }
                )
            }
        </div>
    );
}

export default VerticalPageBar;