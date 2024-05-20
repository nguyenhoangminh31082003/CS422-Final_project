import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/voice_page_styles.css";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import AddButtonIcon from "../assets/add_button_icon.svg";
import InfinieScroll from "react-infinite-scroll-component";
import backButtonIcon from "../assets/back_button_icon.svg";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";

interface VoicePageProps {
    onAudioFolderOptionClick: (audioFolderID: string) => void;
    onSearchButtonClick: (searchQuery: string) => void;
    onCreateNewAudioFolderButtonClick: () => void;
    onPageOptionClick: (pageID: number) => void;
    userID: string;
}

interface AudioFolderOptionProps {
    folderName: string;
    audioFolderID: string;
    audioFileCount: number;
    folderCoverImageLink: string;
    onClick: (event: MouseEvent) => void;
    onRemoveButtonClick: (event: MouseEvent) => void;
}

interface AudioFolderListPartProps {
    onCreateNewAudioFolderButtonClick: () => void;
    onAudioFolderOptionClick: (audioFolderID: string) => void;
    userID: string;
}

interface AudioFolderOptionListPartProps {
    onAudioFolderOptionClick: (audioFolderID: string) => void;
    userID: string;
}

interface TitlePartProps {
    onCreateNewAudioFolderButtonClick: () => void;
}

function AudioFolderOption(
    {
        folderCoverImageLink,
        onRemoveButtonClick,
        audioFileCount,
        audioFolderID,
        folderName,
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

                                    StorageServer.deleteAudioFolder(
                                        audioFolderID,
                                        (response) => {
                                            if (response.status == 200) {
                                                onRemoveButtonClick(event);
                                            }
                                        }
                                    );
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
            {/*
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
            */}
            You are seeing your audio folders.
        </div>
    );
}

function TitlePart(
    {
        onCreateNewAudioFolderButtonClick
    }: TitlePartProps
) {
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
                onClick = {
                    onCreateNewAudioFolderButtonClick
                }
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

    axios.get(`https://mybackend-project-cs422-version6.onrender.com/audiofolders/${userID}/`)
        .then(async (response) => {

            const newData = await Promise.all(response.data.map(async (item: any) => {
                var record: any = {};
    
                record["name"] = item["name"];
                record["folderID"] = item["id"];
                record["folderCoverImageLink"] = item["image_url"];
                record["audioFileCount"] = 0;
    
                try {
                    const audioFilesResponse = await axios.get(`https://mybackend-project-cs422-version6.onrender.com/audiofiles/${userID}/${item["id"]}/`);
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

    if (audioFolderOptionList.length === 0) {
        return (
            <div
                id = "audio-folder-option-list"
            >
                <p
                    style = {
                        {
                            fontWeight: "normal",
                            fontSize: "larger",
                            textAlign: "center",
                            color: "#7D4230"
                        }
                    }
                >
                    There is no audio folder yet
                </p>
            </div>
        );
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

                                    audioFolderID = {item.folderID}
                                    
                                    onRemoveButtonClick={
                                        (event: MouseEvent) => {
                                            const newAudioFolderOptionList = audioFolderOptionList.filter((folder) => {
                                                return folder.id !== item.id;
                                            });

                                            setAudioFolderOptionList(newAudioFolderOptionList);
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
        onCreateNewAudioFolderButtonClick,
        onAudioFolderOptionClick,
        userID
    }: AudioFolderListPartProps
) {
    return (
        <div
            id = "audio-folder-list-part"
        >
            <TitlePart 
                onCreateNewAudioFolderButtonClick = {
                    onCreateNewAudioFolderButtonClick
                }
            />

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
        onCreateNewAudioFolderButtonClick,
        onAudioFolderOptionClick,
        onSearchButtonClick,
        onPageOptionClick,
        userID
    }: VoicePageProps
) {
    return (
        <div
            id = "voice-page"
        >
            <TopHorizontalBar 
                onSearchButtonClick={onSearchButtonClick}
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
                
                    onCreateNewAudioFolderButtonClick = {
                        onCreateNewAudioFolderButtonClick
                    }
                />

                <VoiceSettingPart
                />
            </div>
        </div>
    );
}