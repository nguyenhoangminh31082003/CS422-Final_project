import { Fragment, MouseEvent, useState } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/create_new_audio_folder_page_styles.css";
import backButtonIcon from "../assets/back_button_icon.svg";

interface CreateNewAudioFolderPageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onPageOptionClick: (pageID: number) => void;
    userID: string;
}

interface NewAudioFolderCreationPartProps {
    onPageOptionClick: (pageID: number) => void;
    userID: string;
}

function NewAudioFolderCreationPart(
    {
        onPageOptionClick,
        userID
    }: NewAudioFolderCreationPartProps
) {
    const [message, setMessage] = useState<string>("");
    
    return (
        <div
            id = "new-audio-folder-creation-part"
        >

            <button
                id = "back-button-in-create-new-audio-folder-page"
                onClick = {
                    () => {
                        onPageOptionClick(PAGE_ID["VOICE_PAGE"]);
                    }
                }
            >
                    <img
                        id = "back-button-in-create-new-audio-folder-page"
                        src = {backButtonIcon}
                        alt = "Back"
                    />
            </button>

            <h1
                id = "new-audio-folder-creation-title"
            >
                Create your new audio folder!
            </h1>

            <form
                id = "new-audio-folder-form"
            >
                <label
                    className = "new-audio-folder-creation-field-label"
                >
                    Please enter the name of the audio folder
                </label><br/>
                <input
                    id = "name-of-the-new-audio-folder-input-box"
                    className = "new-audio-folder-creation-field-input-box"
                    type = "text"
                />

                <br/>
            </form>

            <button
                id = "create-new-audio-folder-button-in-create-new-audio-folder-page"
                onClick = {
                    (event: MouseEvent<HTMLButtonElement>) => {
                        const audioFolderName = (document.getElementById("name-of-the-new-audio-folder-input-box") as HTMLInputElement).value;

                        if (typeof(audioFolderName) !== "string") {
                            setMessage("The audio folder name is invalid");
                            return;
                        }

                        if (audioFolderName.length === 0) {
                            setMessage("The audio folder name should not be empty");
                            return;
                        }

                        StorageServer.createNewAudioFolder(
                            userID,
                            audioFolderName,
                            (response) => {
                                if (response.status == 201) {
                                    onPageOptionClick(PAGE_ID["VOICE_PAGE"]);
                                }
                            },
                            (error) => {
                                setMessage("The audio folder name is invalid");
                            }
                        );
                    }
                }
            >
                Create new audio folder
            </button>
        
            <div
                id = "response-message-to-create-new-audio-folder-request"
            >
                {message}
            </div>
        </div>
    );
}

export default function CreateNewAudioFolderPage(
    {
        onSearchButtonClick,
        onPageOptionClick,
        userID
    }: CreateNewAudioFolderPageProps
) {
    return (
        <div
            id = "create-new-audio-folder-page"
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
                        PAGE_ID["VOICE_PAGE"]
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />

                <NewAudioFolderCreationPart
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
