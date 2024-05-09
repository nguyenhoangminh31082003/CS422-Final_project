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
            className = "shelf-book-option-in-shelf-page"
        >
            Hello
        </div>
    )
}

const demoAudioFolderOptionList = [
    {
        name: "Emma Stone",
        audioFileCount: 1,
        folderCoverImageLink: EmmaStoneImage
    },
    {
        name: "Matt Smith",
        audioFileCount: 3,
        folderCoverImageLink: MattSmithImage
    },
    {
        name: "Keanu Reeves",
        audioFileCount: 50,
        folderCoverImageLink: KeanuReevesImage
    }
]

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
    const numberOfFolders = demoAudioFolderOptionList;
    
    var [audioFolderOptionList, setAudioFolderOptionList] = useState(demoAudioFolderOptionList);
    var [hasMore, setHasMore] = useState(true);

    return (
        <div
            id = "audio-folder-list-part"
        >
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
            </div>
        </div>
    );
}