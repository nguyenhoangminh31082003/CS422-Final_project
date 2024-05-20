import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import SpeechServer from "../SpeechServer";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/add_audio_file_page_styles.css";
import backButtonIcon from "../assets/back_button_icon.svg";

interface AddAudioFilePageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onPageOptionClick: (pageID: number) => void;
    folderID: string;
    userID: string;
}

interface AudioFileAddPartProps {
    onPageOptionClick: (pageID: number) => void;
    folderID: string;
    userID: string;
}

function AudioFileAddPart(
    {
        onPageOptionClick,
        folderID,
        userID
    }: AudioFileAddPartProps
) {
    const [message, setMessage] = useState<string>("");
    
    return (
        <div
            id = "audio-file-add-part"
        >

            <button
                id = "back-button-in-add-audio-file-page"
                onClick = {
                    () => {
                        onPageOptionClick(PAGE_ID["VOICE_PAGE"]);
                    }
                }
            >
                    <img
                        id = "back-button-in-create-add-audio-file-page"
                        src = {backButtonIcon}
                        alt = "Back"
                    />
            </button>

            <h1
                id = "audio-file-add-title"
            >
                Add your audio file
            </h1>

            <form
                id = "audio-file-add-form"
            >
                <label
                    className = "audio-file-add-field-label"
                >
                    Please enter the name of your audio file
                </label><br/>
                <input
                    id = "name-of-the-audio-file-add-input-box"
                    className = "audio-file-add-field-input-box"
                    type = "text"
                />

                <label
                    className = "audio-file-add-field-label"
                >
                    Please enter the url of your audio file
                </label><br/>
                <input
                    id = "url-of-the-audio-file-add-input-box"
                    className = "audio-file-add-field-input-box"
                    type = "text"
                />

                <br/>
            </form>

            <button
                id = "add-audio-file-button-in-add-audio-file-page"
                onClick = {
                    (event: MouseEvent<HTMLButtonElement>) => {
                        const audioFileName = (document.getElementById("name-of-the-audio-file-add-input-box") as HTMLInputElement).value;
                        const audioFileURL = (document.getElementById("url-of-the-audio-file-add-input-box") as HTMLInputElement).value;

                        if (typeof(audioFileName) !== "string") {
                            setMessage("The audio file name is invalid");
                            return;
                        }

                        if (typeof(audioFileURL) !== "string") {
                            setMessage("The audio file URL is invalid");
                            return;
                        }

                        if (audioFileName.length === 0) {
                            setMessage("The audio file name should not be empty");
                            return;
                        }

                        if (audioFileURL.length === 0) {
                            setMessage("The audio file URL should not be empty");
                            return;
                        }

                        SpeechServer.addVoiceURL(
                            userID,
                            audioFileName,
                            audioFileURL,
                            ""
                        )
                        .then((voiceID) => {
                            if (voiceID === null) {
                                console.log("Something is not right");
                                return;
                            }

                            StorageServer.addAudioFile(
                                audioFileName,
                                folderID,
                                userID,
                                voiceID,
                                (response) => {
                                    onPageOptionClick(PAGE_ID["AUDIO_FOLDER_PAGE"]);
                                },
                                (error) => {
                                    setMessage("Something is not right");
                                }
                            );
                        })
                    }
                }
            >
                Add audio file
            </button>
        
            <div
                id = "response-message-to-add-audio-file-request"
            >
                {message}
            </div>
        </div>
    );
}

export default function AddAudioFilePage(
    {
        onSearchButtonClick,
        onPageOptionClick,
        folderID,
        userID
    }: AddAudioFilePageProps
) {
    return (
        <div
            id = "add-audio-file-page"
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

                <AudioFileAddPart
                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    userID = {
                        userID
                    }

                    folderID = {
                        folderID
                    }
                />
            </div>
        </div>
    );
}
