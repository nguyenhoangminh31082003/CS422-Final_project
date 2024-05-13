import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/audio_folder_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import AddButtonIcon from "../assets/add_button_icon.svg";
import InfinieScroll from "react-infinite-scroll-component";
import backButtonIcon from "../assets/back_button_icon.svg";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";

interface AudioFolderPageProps {
    onPageOptionClick: (pageID: number) => void;
    onAudioFileOptionClick: (audioFolderID: string) => void;
    folderID: string;
}

interface AudioFileOptionProps {
    audioFileName: string;
    audioFileLength: string;
    onClick: (event: MouseEvent) => void;
}

interface AudioFileListPartProps {
    onAudioFileOptionClick: (audioFolderID: string) => void;
    folderID: string;
}

function AudioFileOption(
    {
        audioFileName,
        audioFileLength,
        onClick  
    }: AudioFileOptionProps
) {
    return (
        <div
            className = "audio-file-option-in-audio-folder-page"
        >
            <button
                className = "audio-file-option-detail-in-audio-folder-page"
                onClick = {onClick}
            >
                Hello world
            </button>
        </div>
    )
}

const demoAudioFileOptionList = [
    {
        "audioFileID": "24601",
        "audioFileName": "2024_31_03.mp4",
        "audioFileLength": "1 minutes 32 seconds"
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
        onAudioFileOptionClick,
        folderID
    }: AudioFileListPartProps
) {
    /*
        Request the number of files of the folder from the server
    */
    const numberOfFiles = demoAudioFileOptionList.length;
    
    var [audioFileOptionList, setAudioFileOptionList] = useState(demoAudioFileOptionList);
    var [hasMore, setHasMore] = useState(true);

    function TitlePart() {
        return (
            <div
                id = "title-bar-in-audio-file-list-part"
            >   
                <h1
                    id = "title-in-audio-file-list-part"
                >
                    Audio files
                </h1>

                <button
                    id = "upload-new-file-button"
                >
                    <img
                        src = {AddButtonIcon}
                        alt = "Upload file button"
                    />
                </button>

            </div>
        )    
    };

    return (
        <div
            id = "audio-file-list-part"
        >
            <TitlePart />

            <div
                id = "audio-file-option-list"
            >
                <InfinieScroll
                        
                    dataLength = {
                        audioFileOptionList.length 
                    }

                    next = {
                        () => {
                            if (audioFileOptionList.length < numberOfFiles) {
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
                        <p
                            style = {
                                {
                                    textAlign: "center",
                                    color: "#7D4230"
                                }
                            }
                        > End of the list 
                        </p>
                    }

                    scrollableTarget = "audio-file-option-list"
                >   
                    {
                        audioFileOptionList.map((item, index) => {
                            return (
                                <AudioFileOption
                                    audioFileName={item.audioFileName}
                                    audioFileLength={item.audioFileLength}
                                    onClick = {
                                        (event: MouseEvent) => {
                                            onAudioFileOptionClick(item.audioFileID);
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

export default function AudioFolderPage(
    {
        onPageOptionClick,
        onAudioFileOptionClick,
        folderID
    }: AudioFolderPageProps
) {
    return (
        <div
            id = "audio-folder-page"
        >
            <TopHorizontalBar 
        
            />
            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID.VOICE_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />

                <AudioFolderListPart
                    folderID={folderID}

                    onAudioFileOptionClick={
                        onAudioFileOptionClick
                    }
                />

                <VoiceSettingPart
                />
            </div>
        </div>
    );
}