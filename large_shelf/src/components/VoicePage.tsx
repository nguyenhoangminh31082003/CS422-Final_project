import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/voice_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import backButtonIcon from "../assets/back_button_icon.svg";
import EmmaStoneImage from "../assets/Emma_Stone_Image.png";
import MattSmithImage from "../assets/Matt_Smith_Image.png";
import KeanuReevesImage from "../assets/Keanu_Reeves_Image.png";
import AddButtonIcon from "../assets/add_button_icon.svg";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";

interface VoicePageProps {
    onPageOptionClick: (pageID: number) => void;
    onAudioFolderOptionClick: (audioFolderID: string) => void;
    userID: string;
}

interface AudioFolderOptionProps {
    folderCoverImageLink: string;
    folderName: string;
    audioFileCount: number;
    onClick: (event: MouseEvent) => void;
}

interface AudioFolderListPartProps {
    onPageOptionClick: (pageID: number) => void;
    onAudioFolderOptionClick: (audioFolderID: string) => void;
    userID: string;
}

function AudioFolderOption(
    {
        folderCoverImageLink,
        folderName,
        audioFileCount,
        onClick  
    }: AudioFolderOptionProps
) {
    return (
        <div
            className = "audio-folder-option-in-voice-page"
        >
            <button
                className = "audio-folder-option-detail-in-voice-page"
                onClick = {onClick}
            >
                <div
                    className = "image-cell-in-voice-page"
                >
                    <img
                        className = "cover-image-of-audio-folder-in-voice-page"
                        src = {folderCoverImageLink}
                        alt = "Audio folder cover"
                    />
                </div>

                <div
                    className = "text-part-of-audio-folder-option-in-voice-page"
                >
                    <div
                        className = "top-bar-in-text-part-of-audio-folder-option-in-voice-page"
                    >
                        <button
                            id = "remove-folder-button-in-audio-folder-option-in-voice-page"
                            onClick = {
                                (event: MouseEvent) => {
                                    event.stopPropagation();
                                }
                            }
                        >
                            <img
                                className = "remove-folder-button-icon-in-audio-folder-option-in-voice-page"
                                src = {RemoveButtonIcon}
                                alt = "Remove button"
                            />
                        </button>
                    </div>
                </div>
            </button>
        </div>
    )
}

const demoAudioFolderOptionList = [
    {
        name: "Emma Stone",
        audioFileCount: 1,
        folderID: "1",
        folderCoverImageLink: EmmaStoneImage
    },
    {
        name: "Matt Smith",
        audioFileCount: 3,
        folderID: "2",
        folderCoverImageLink: MattSmithImage
    },
    {
        name: "Keanu Reeves",
        audioFileCount: 50,
        folderID: "3",
        folderCoverImageLink: KeanuReevesImage
    }
]

function VoiceSettingPart() {
    return (
        <div
            id = "voice-setting-part-in-voice-page"
        >
            <h1>
                Voice setting
            </h1>

            <form
                id = "voice-setting-form-in-voice-page"
            >
                <label
                    className = "voice-setting-label-in-voice-page"
                >
                    Default narrator
                </label>
                <input
                    className = "audio-file-path-input-field-in-voice-setting-form"
                    type = "text"
                    placeholder = "Not set"
                />
            </form>

        </div>
    );
}

function AudioFolderListPart(
    {
        onPageOptionClick,
        onAudioFolderOptionClick,
        userID
    }: AudioFolderListPartProps
) {
    /*
        Request the number of folders of the user from the server
    */
    const numberOfFolders = demoAudioFolderOptionList.length;
    
    var [audioFolderOptionList, setAudioFolderOptionList] = useState(demoAudioFolderOptionList);
    var [hasMore, setHasMore] = useState(true);

    function TitlePart() {
        return (
            <div
                id = "title-bar-in-audio-folder-list-part"
            >   
                <h1
                    id = "title-in-audio-folder-list-part"
                >
                    Audio folders
                </h1>

                <button
                    id = "create-new-folder-button"
                >
                    <img
                        src = {AddButtonIcon}
                        alt = "Add button"
                    />
                </button>

            </div>
        )    
    };

    return (
        <div
            id = "audio-folder-list-part"
        >
            <TitlePart />

            <div
                id = "audio-folder-option-list"
            >
                <InfinieScroll
                        
                    dataLength = {
                        audioFolderOptionList.length 
                    }

                    next = {
                        () => {
                            if (audioFolderOptionList.length < numberOfFolders) {
                                setTimeout(() => {
                                    /*
                                    
                                        Request from server to get more books
                    
                                    */
                                }, 100); 
                            } else {
                                setHasMore(false);
                            }
                        }
                    }

                    hasMore = {hasMore}

                    loader = {<p> Loading ... </p>}

                    endMessage = {
                        <p> End of the list </p>
                    }

                    scrollableTarget = "audio-folder-option-list"
                >   
                    {
                        audioFolderOptionList.map((item, index) => {
                            return (
                                <AudioFolderOption
                                    folderCoverImageLink = {item.folderCoverImageLink}
                                    folderName = {item.name}
                                    audioFileCount = {item.audioFileCount}
                                    onClick = {
                                        (event: MouseEvent) => {
                                            onAudioFolderOptionClick(item.folderID);
                                        }
                                    }
                                />
                            )
                        })
                    }
                </InfinieScroll>
            </div>
        </div>
    );
}

export default function VoicePage(
    {
        onPageOptionClick,
        onAudioFolderOptionClick,
        userID
    }: VoicePageProps
) {
    return (
        <div
            id = "voice-page"
        >
            <TopHorizontalBar 
        
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

                <AudioFolderListPart
                    userID = {userID}

                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    onAudioFolderOptionClick = {
                        onAudioFolderOptionClick
                    }
                />

                <VoiceSettingPart
                />
            </div>
        </div>
    );
}