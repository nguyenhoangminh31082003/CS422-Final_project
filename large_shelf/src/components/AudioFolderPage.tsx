import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/audio_folder_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import AddButtonIcon from "../assets/add_button_icon.svg";
import InfinieScroll from "react-infinite-scroll-component";
import backButtonIcon from "../assets/back_button_icon.svg";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";
import AudioFileDecorator from "../assets/audio_file_decorator.svg";

interface AudioFolderPageProps {
    onAudioFileOptionClick: (audioFolderID: string) => void;
    onPageOptionClick: (pageID: number) => void;
    onBackButtonClick: () => void;
    folderID: string;
    userID: string;
}

interface AudioFileOptionProps {
    audioFileName: string;
    audioFileLength: string;
    onClick: (event: MouseEvent) => void;
    onRemoveButtonClick: () => void;
}

interface AudioFileListPartProps {
    onAudioFileOptionClick: (audioFolderID: string) => void;
    onBackButtonClick: () => void;
    folderID: string;
    userID: string;
}

interface TitlePartProps {
    onBackButtonClick: () => void;
    folderName: string;
}

interface AudioFileOptionListPartProps {
    onAudioFileOptionClick: (audioFolderID: string) => void;
    folderID: string;
    userID: string;
}

function AudioFileOption(
    {
        onRemoveButtonClick,
        audioFileLength,
        audioFileName,
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

                <div
                    className = "audio-file-information-in-audio-folder-page"
                >
                    <h1
                        className = "audio-file-name-in-audio-folder-page"
                    >
                        {audioFileName}
                    </h1>

                    <p
                        className = "audio-file-length-in-audio-folder-page"
                    >
                        {audioFileLength}
                    </p>

                    <img
                        className = "audio-file-decorator-in-audio-folder-page"
                        src = {AudioFileDecorator}
                        alt = "Audio file decorator"
                    />
                </div>

                <div
                    className = "remove-shelf-button-in-shelf-option-in-audio-folder-page-container"
                >
                    <button
                        className = "remove-shelf-button-in-shelf-option-in-audio-folder-page"
                                
                        onClick = {
                            (event: MouseEvent) => {
                                event.stopPropagation();

                                onRemoveButtonClick();
                            }
                        }
                    >
                        <img
                            className = "remove-shelf-button-icon-in-shelf-option-in-audio-folder-page"
                            src = {RemoveButtonIcon}
                            alt = "Remove button"
                        />
                    </button>
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

function TitlePart(
    {
        onBackButtonClick,
        folderName
    }: TitlePartProps
) {
    return (
        <div
            id = "title-bar-in-audio-file-list-part"
        >   
            <button
                id = "back-button-in-audio-folder-page"
                onClick = {
                    onBackButtonClick
                }
            >
                <img
                    id = "back-button-icon-in-audio-folder-page"
                    src = {backButtonIcon}
                    alt = "Back"
                />
            </button>

            <h1
                id = "title-in-audio-file-list-part"
            >
                Audio files of "{folderName}" audio folder
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

function AudioFileOptionListPart(
    {
        onAudioFileOptionClick,
        userID,
        folderID,
    }: AudioFileOptionListPartProps
) {
    var [allAudioFiles, setAllAudioFiles] = useState<any[]>([]);

    axios.get(`http://127.0.0.1:8000/audiofiles/${userID}/${folderID}/`)
    .then((response) => {
        const newAudioFiles = response.data.map((item: any) => {
            let audioFile = {
                "audioFileID": item["id"],
                "audioFileName": item["name"],  
                "audioFileLength": "0 seconds"
            }
            
            return audioFile;
        });

        if (JSON.stringify(newAudioFiles) !== JSON.stringify(allAudioFiles)) {
            setAllAudioFiles(newAudioFiles);
        }
    })
    .catch((error) => {
        console.log(error);
    });

    const numberOfFiles = allAudioFiles.length;
    
    var [audioFileOptionList, setAudioFileOptionList] = useState<any[]>([]);
    var [hasMore, setHasMore] = useState(true);

    if (JSON.stringify(allAudioFiles) !== JSON.stringify(audioFileOptionList)) {    
        setAudioFileOptionList(allAudioFiles);
    }

    return (
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

                                    onRemoveButtonClick={
                                        () => {
                                            axios.delete(`http://127.0.0.1:8000/audiofile/delete/${item.audioFileID}/`)
                                                .then((response) => {
                                                    if (response.status === 200) {
                                                        const newAudioFileOptionList = audioFileOptionList.filter((audioFile) => audioFile.audioFileID !== item.audioFileID);

                                                        setAudioFileOptionList(newAudioFileOptionList);    
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
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
        onAudioFileOptionClick,
        onBackButtonClick,
        folderID,
        userID
    }: AudioFileListPartProps
) {
    var [folderInformation, setFolderInformation] = useState<any>({
        "folder_id": "0",
        "folder_name": "Folder name"
    });

    axios.get(`http://127.0.0.1:8000/audiofolders/${userID}/`)
        .then((response) => {
            const audioFolder = response.data.find((folder: any) => folder["id"] === folderID);

            const newData = {
                "folder_id": audioFolder["id"],
                "folder_name": audioFolder["name"]
            };

            if (JSON.stringify(newData) !== JSON.stringify(folderInformation)) {
                setFolderInformation(newData);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <div
            id = "audio-file-list-part"
        >
            <TitlePart 
                onBackButtonClick = {
                    onBackButtonClick
                }

                folderName = {
                    folderInformation["folder_name"]
                }
            />

            <AudioFileOptionListPart
                onAudioFileOptionClick = {
                    onAudioFileOptionClick
                }

                folderID = {
                    folderID
                }

                userID = {
                    userID
                }
            />
        </div>
    );
}

export default function AudioFolderPage(
    {
        onAudioFileOptionClick,
        onPageOptionClick,
        onBackButtonClick,
        folderID,
        userID
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

                    onBackButtonClick = {
                        onBackButtonClick
                    }

                    userID = {userID}
                />

                <VoiceSettingPart
                />
            </div>
        </div>
    );
}