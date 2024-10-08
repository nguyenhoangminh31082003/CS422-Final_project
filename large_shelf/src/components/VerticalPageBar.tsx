import { Fragment, MouseEvent, useState } from "react";
import "../styles/vertical_page_bar_styles.css";
import PAGE_ID from "../PageID";

import normalHomePageIcon from "../assets/normal_home_page_icon.svg";
import normalBookPageIcon from "../assets/normal_book_page_icon.svg";
import normalVoicePageIcon from "../assets/normal_voice_page_icon.svg";
import normalAccountPageIcon from "../assets/normal_account_page_icon.svg";
import normalLibraryPageIcon from "../assets/normal_library_page_icon.svg";
import normalWelcomePageIcon from "../assets/normal_welcome_page_icon.svg";

import highlightedHomePageIcon from "../assets/highlighted_home_page_icon.svg";
import highlightedBookPageIcon from "../assets/highlighted_book_page_icon.svg";
import highlightedVoicePageIcon from "../assets/highlighted_voice_page_icon.svg";
import highlightedAccountPageIcon from "../assets/highlighted_account_page_icon.svg";
import highlightedLibraryPageIcon from "../assets/highlighted_library_page_icon.svg";
import highlightedWelcomePageIcon from "../assets/highlighted_welcome_page_icon.svg";

interface VerticalPageBarProps {
    chosenPageID: number;
    onOptionClick: (pageID: number) => void;
}

interface VerticalPageBarCellProps {
    htmlID: string;
    name: string;
    pageID: number;
    chosen: boolean;
    normalIcon: string;
    highlightedIcon: string;
    onOptionClick: (pageID: number) => void;
}

function VerticalPageBarCell(
    { 
        htmlID, 
        name, 
        pageID,
        chosen,
        normalIcon,
        highlightedIcon,
        onOptionClick
    }: VerticalPageBarCellProps
) {

    const optionIconID = `${htmlID}-icon-image`;

    return (
        <button
            id = {htmlID}
            className = "vertical-page-bar-cell"
            onClick={
                () => {
                    onOptionClick(pageID);
                    console.log(pageID);
                }
            }

            style = { {
                backgroundColor: chosen ? "#7D4230" : "#FFE9C5",
                color: chosen ? "#FFE9C5" : "#7D4230"
            } }

            onMouseOver = { 
                (event: MouseEvent<HTMLButtonElement>) => {
                    var icon = document.getElementById(optionIconID) as HTMLImageElement;
                    icon.src = highlightedIcon;
                    event.currentTarget.style.backgroundColor = "#E29675";
                    event.currentTarget.style.color = "#FFE9C5";
                }
            }

            onMouseLeave = {
                (event: MouseEvent<HTMLButtonElement>) => {
                    var icon = document.getElementById(optionIconID) as HTMLImageElement;
                    icon.src = chosen ? highlightedIcon : normalIcon;
                    event.currentTarget.style.backgroundColor = chosen ? "#7D4230" : "#FFE9C5";
                    event.currentTarget.style.color = chosen ? "#FFE9C5" : "#7D4230";
                }
            }

        >
            <img
                id = {optionIconID}
                className = "option-icon"
                src = {
                    chosen ? highlightedIcon : normalIcon
                }
                alt = {`${htmlID} icon`}
            />
            <h1
                id = {htmlID}
                className = "option-name"
            >
                {name}
            </h1>
        </button>
    );
}

export default function VerticalPageBar(
    { 
        chosenPageID,
        onOptionClick
    }: VerticalPageBarProps
) {

    const pageOptions = [
        {
            "id": "home-page-option",
            "name": "Home",
            "pageID": PAGE_ID.HOME_PAGE,
            "normal_icon": normalHomePageIcon,
            "highlighted_icon": highlightedHomePageIcon
        },
        {
            "id": "book-page-option",
            "name": "Book",
            "pageID": PAGE_ID.BOOK_PAGE,
            "normal_icon": normalBookPageIcon,
            "highlighted_icon": highlightedBookPageIcon
        },
        {
            "id": "voice-page-option",
            "name": "Voice",
            "pageID": PAGE_ID.VOICE_PAGE,
            "normal_icon": normalVoicePageIcon,
            "highlighted_icon": highlightedVoicePageIcon
        },
        {
            "id": "account-page-option",
            "name": "Account",
            "pageID": PAGE_ID.ACCOUNT_PAGE,
            "normal_icon": normalAccountPageIcon,
            "highlighted_icon": highlightedAccountPageIcon
        },
        {
            "id": "library-page-option",
            "name": "Library",
            "pageID": PAGE_ID.LIBRARY_PAGE,
            "normal_icon": normalLibraryPageIcon,
            "highlighted_icon": highlightedLibraryPageIcon
        },
        {
            "id": "log-out-page-option",
            "name": "Log out",
            "pageID": PAGE_ID.WELCOME_PAGE,
            "normal_icon": normalWelcomePageIcon,
            "highlighted_icon": highlightedWelcomePageIcon
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
                                normalIcon = {
                                    pageOption.normal_icon
                                }
                                highlightedIcon = {
                                    pageOption.highlighted_icon
                                }
                                onOptionClick = {
                                    onOptionClick
                                }
                            />
                        );
                    }
                )
            }
        </div>
    );
}