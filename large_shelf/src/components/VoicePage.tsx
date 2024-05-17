import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/voice_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import AddButtonIcon from "../assets/add_button_icon.svg";
import InfinieScroll from "react-infinite-scroll-component";
import backButtonIcon from "../assets/back_button_icon.svg";
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
    onAudioFolderOptionClick: (audioFolderID: string) => void;
    userID: string;
}

interface AudioFolderOptionListPartProps {
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
                            className = "remove-folder-button-in-audio-folder-option-in-voice-page"
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

                    <div
                        className = "audio-folder-name-in-voice-page"
                    >
                        {folderName}
                    </div>

                    <div
                        className = "audio-file-count-in-voice-page"
                    >
                        Number of audio files: {audioFileCount}
                    </div>

                </div>
            </button>
        </div>
    )
}

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

function AudioFolderOptionListPart(
    {
        onAudioFolderOptionClick,
        userID
    }: AudioFolderOptionListPartProps
) {
    const [allAudioFolderOptionList, setAllAudioFolderOptionList] = useState<any>([]);

    axios.get(`http://127.0.0.1:8000/audiofolders/${userID}/`)
        .then(async (response) => {

            const newData = await Promise.all(response.data.map(async (item: any) => {
                var record: any = {};
    
                record["name"] = item["name"];
                record["folderID"] = item["id"];
                record["folderCoverImageLink"] = item["image_url"];
                record["audioFileCount"] = 0;
    
                try {
                    const audioFilesResponse = await axios.get(`http://127.0.0.1:8000/audiofiles/${userID}/${item["id"]}/`);
                    record["audioFileCount"] = audioFilesResponse.data.length;
                } catch (error) {
                    console.log(error);
                }
    
                return record;
            }));

            if (JSON.stringify(allAudioFolderOptionList) !== JSON.stringify(newData)) {
                setAllAudioFolderOptionList(newData);
            }

        })
        .catch((error) => {
            console.log(error);
        });

    const numberOfFolders = allAudioFolderOptionList.length;
    
    var [audioFolderOptionList, setAudioFolderOptionList] = useState<any[]>([]);
    var [hasMore, setHasMore] = useState(true);

    if (JSON.stringify(audioFolderOptionList) !== JSON.stringify(allAudioFolderOptionList)) {
        setAudioFolderOptionList(allAudioFolderOptionList);
    }

    return (
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
    );
}

function AudioFolderListPart(
    {
        onAudioFolderOptionClick,
        userID
    }: AudioFolderListPartProps
) {
    return (
        <div
            id = "audio-folder-list-part"
        >
            <TitlePart />

            <AudioFolderOptionListPart 
                onAudioFolderOptionClick = {
                    onAudioFolderOptionClick
                }
                userID = {userID}
            />
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
                        PAGE_ID.VOICE_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />

                <AudioFolderListPart
                    userID = {userID}

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