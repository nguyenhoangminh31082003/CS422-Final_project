import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/change_password_page_styles.css";
import defaultProfilePicture from "../assets/default_profile_picture.png";

interface ChangePasswordPageProps {
    onPageOptionClick: (pageID: number) => void;
}

interface NewPasswordCreationPartProps {
    onPageOptionClick: (pageID: number) => void;
}

function NewPasswordCreationPart(
    {
        onPageOptionClick
    }: NewPasswordCreationPartProps
) {
    const [message, setMessage] = useState<string>("");
    
    return (
        <div
            id = "new-password-creation-part"
        >
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

                        /*
                    
                            Request server to change password

                        */

                        onPageOptionClick(PAGE_ID.ACCOUNT_PAGE);
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
        onPageOptionClick
    }: ChangePasswordPageProps
) {
    return (
        <div
            id = "change-password-page"
        >
            <TopHorizontalBar 
        
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
                />
            </div>
        </div>
    );
}
