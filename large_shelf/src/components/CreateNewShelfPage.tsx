import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/create_new_shelf_page_styles.css";
import backButtonIcon from "../assets/back_button_icon.svg";

interface CreateNewShelfPageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onPageOptionClick: (pageID: number) => void;
    userID: string;
}

interface NewShelfCreationPartProps {
    onPageOptionClick: (pageID: number) => void;
    userID: string;
}

function NewShelfCreationPart(
    {
        onPageOptionClick,
        userID
    }: NewShelfCreationPartProps
) {
    const [message, setMessage] = useState<string>("");

    return (
        <div
            id = "new-shelf-creation-part"
        >

            <button
                id = "back-button-in-create-new-shelf-page"
                onClick = {
                    () => {
                        onPageOptionClick(PAGE_ID.HOME_PAGE);
                    }
                }
            >
                    <img
                        id = "back-button-in-create-new-shelf-page"
                        src = {backButtonIcon}
                        alt = "Back"
                    />
            </button>

            <h1
                id = "new-shelf-creation-title"
            >
                Create your new shelf!
            </h1>

            <form
                id = "new-shelf-form"
            >
                <label
                    className = "new-shelf-creation-field-label"
                >
                    Please enter the name of the shelf
                </label><br/>
                <input
                    id = "name-of-the-new-shelf-input-box"
                    className = "new-shelf-creation-field-input-box"
                    type = "text"
                />

                <br/>
            </form>

            <button
                id = "create-new-shelf-button-in-create-new-shelf-page"
                onClick = {
                    (event: MouseEvent<HTMLButtonElement>) => {
                        const shelfName = (document.getElementById("name-of-the-new-shelf-input-box") as HTMLInputElement).value;

                        if (typeof(shelfName) !== "string") {
                            setMessage("The shelf name is invalid");
                            return;
                        }

                        if (shelfName.length === 0) {
                            setMessage("The shelf name should not be empty");
                            return;
                        }

                        StorageServer.createNewShelf(
                            userID,
                            shelfName,
                            (response) => {
                                if (response.status == 201) {
                                    onPageOptionClick(PAGE_ID["HOME_PAGE"]);
                                }
                            },
                            (error) => {
                                setMessage("The shelf name is invalid");
                            }
                        );
                    }
                }
            >
                Create new shelf
            </button>
        
            <div
                id = "response-message-to-create-new-shelf-request"
            >
                {message}
            </div>
        </div>
    );
}

export default function CreateNewShelfPage(
    {
        onSearchButtonClick,
        onPageOptionClick,
        userID
    }: CreateNewShelfPageProps
) {
    return (
        <div
            id = "create-new-shelf-page"
        >
            <TopHorizontalBar 
                onSearchButtonClick = {
                    onSearchButtonClick
                }
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

                <NewShelfCreationPart
                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    userID = {
                        userID
                    }
                />
            </div>
        </div>
    );
}
