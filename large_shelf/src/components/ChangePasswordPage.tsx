import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/change_password_page_styles.css";
import backButtonIcon from "../assets/back_button_icon.svg";

interface ChangePasswordPageProps {
    userID: string;
    onPageOptionClick: (pageID: number) => void;
    onSearchButtonClick: (searchQuery: string) => void;
}

interface NewPasswordCreationPartProps {
    userID: string;
    onPageOptionClick: (pageID: number) => void;
}

function NewPasswordCreationPart(
    {
        userID,
        onPageOptionClick
    }: NewPasswordCreationPartProps
) {
    const [message, setMessage] = useState<string>("");
    
    return (
        <div
            id = "new-password-creation-part"
        >

            <button
                id = "back-button-in-change-password-page"
                onClick = {
                    () => {
                        onPageOptionClick(PAGE_ID.ACCOUNT_PAGE);
                    }
                }
            >
                    <img
                        id = "back-button-icon-in-change-password-page"
                        src = {backButtonIcon}
                        alt = "Back"
                    />
            </button>

            <h1
                id = "new-password-creation-title"
            >
                Please think carefully when changing your password
            </h1>

            <form
                id = "new-password-form"
            >
                <label
                    className = "new-password-creation-field-label"
                >
                    Please enter your current password
                </label><br/>
                <input
                    id = "old-user-password-input-box"
                    className = "new-password-creation-field-input-box"
                    type = "password"
                />

                <br/>

                <label
                    className = "new-password-creation-field-label"
                >
                    Please enter your new password
                </label><br/>
                <input
                    id = "first-new-user-password-input-box"
                    className = "new-password-creation-field-input-box"
                    type = "password"
                />

                <br/>   

                <label
                    className = "new-password-creation-field-label"
                >
                    Please re-enter your new password
                </label><br/>
                <input
                    id = "second-new-user-password-input-box"
                    className = "new-password-creation-field-input-box"
                    type = "password"
                />
            </form>

            <button
                id = "create-new-password-button"
                onClick = {
                    (event: MouseEvent<HTMLButtonElement>) => {
                        const oldPassword = (document.getElementById("old-user-password-input-box") as HTMLInputElement).value;
                        const newlyChosenPassword = (document.getElementById("first-new-user-password-input-box") as HTMLInputElement).value;
                        const reEnteredNewlyChosenPassword = (document.getElementById("second-new-user-password-input-box") as HTMLInputElement).value;
                        
                        if (typeof(newlyChosenPassword) !== "string" || typeof(reEnteredNewlyChosenPassword) !== "string") {
                            setMessage("The requested new password is not valid");
                            return;
                        }

                        if (newlyChosenPassword.length <= 0 || reEnteredNewlyChosenPassword.length <= 0) {
                            setMessage("The requested new password must not be empty");
                            return;
                        }

                        if (newlyChosenPassword !== reEnteredNewlyChosenPassword) {
                            setMessage("The re-entered password does not match the new password");
                            return;
                        }

                        StorageServer.changePassword(
                            userID,
                            oldPassword,
                            newlyChosenPassword,
                            (response) => {
                                onPageOptionClick(PAGE_ID.ACCOUNT_PAGE);
                            },
                            (error) => {
                                if (error.response) {
                                    if (error.response.status === 400) {
                                        setMessage("The old password is incorrect");
                                    } else {
                                        setMessage("Something is not right");
                                        console.log(error);
                                    }
                                }
                        });

                        
                    }
                }
            >
                Change password
            </button>
        
            <div
                id = "response-message-to-password-change-request"
            >
                {message}
            </div>
        </div>
    );
}

export default function ChangePasswordPage(
    {
        userID,
        onPageOptionClick,
        onSearchButtonClick
    }: ChangePasswordPageProps
) {
    return (
        <div
            id = "change-password-page"
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
                        PAGE_ID.ACCOUNT_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />
                <NewPasswordCreationPart
                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    userID = {userID}
                />
            </div>
        </div>
    );
}
