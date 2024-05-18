import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import "../styles/book_page_styles.css";
import SpeechServer from "../SpeechServer";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";


interface BookPageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onPageOptionClick: (pageID: number) => void;
    bookID: string | null | undefined;
    userID: string;
}

interface PropertiesPartProps {
    userID: string;
    bookID: string | null | undefined;
    currentPage: number;
    onBackwardButtonClick: () => void;
    onForwardButtonClick: () => void;
    listenMode: any;
    setListenMode: any;
}

interface InteractionPartProps {
    bookID: string | null | undefined;
    userID: string;
}

interface PagePairPartProps {
    bookID: string | null | undefined;
    currentPage: number;
    listenMode: any;
}

function PropertiesPart(
    {
        userID,
        bookID,
        currentPage,
        onBackwardButtonClick,
        onForwardButtonClick,
        listenMode,
        setListenMode
    }: PropertiesPartProps
) {
    var [bookInformation, setBookInformation] = useState<any>({});
    var [userAudioFileList, setUserAudioFileList] = useState<any>([]);

    StorageServer.getAllAudioFileLinkOfUser(
        userID,
        (response) => {
            const newData = response.data.map((audioFile: any) => {
                return {
                    "id": audioFile["id"],
                    "name": audioFile["name"],
                    "type": "private"
                }
            });

            if (JSON.stringify(newData) !== JSON.stringify(userAudioFileList)) {
                setUserAudioFileList(newData);
            }
        }
    )

    StorageServer.getBooksOrderedByRating(
        (response) => { 
            const bookData = response.data.find((book: any) => book.id === bookID);

            if (JSON.stringify(bookData) !== JSON.stringify(bookInformation)) {
                setBookInformation(bookData);
            }
        }
    );

    return (
        <div
            id = "properties-part-in-book-page"
        >
            <div
                className = "container-in-book-page"
            >

                <img
                    id = "book-cover-in-book-page"
                    src = {bookInformation["image_url"]}
                    alt = "Book cover"
                />

                <h1
                    id = "book-title-in-book-page"
                >
                    {bookInformation["title"]}
                </h1>

                <h2
                    id = "book-author-in-book-page"
                >
                    {bookInformation["author"]}
                </h2>

            </div>

            <div
                className = "container-in-book-page"
            >
                <h1
                    className = "container-title-in-book-page"
                >
                    Location
                </h1>
                <p
                    className = "normal-text-detail-in-book-page"
                >
                    Current page
                    <div
                        id = "displayed-page-index-in-book-page"
                    >
                        {`${currentPage + 1}${((currentPage + 1 < bookInformation["total_pages"]) ? `, ${currentPage + 2}` : "")}`}
                        <button
                            className = "page-navigation-button-in-book-page"
                            disabled = {currentPage === 0}
                            onClick = {onBackwardButtonClick}
                        >
                            {`<`}
                        </button>
                        <button
                            className = "page-navigation-button-in-book-page"
                            disabled = {currentPage === bookInformation["total_pages"] - 2}
                            onClick = {onForwardButtonClick}
                        >
                            {`>`}
                        </button>
                    </div>
                </p>
                
            </div>
            
            <div
                className = "container-in-book-page"
            >
                <h1
                    className = "container-title-in-book-page"
                >
                    Listen
                </h1>
                <p
                    className = "normal-text-detail-in-book-page"
                >
                    {
                        (() => {
                            if (listenMode["status"] === "off") {
                                return "Start from your current page";
                            }
                            if (listenMode["status"] === "on") {
                                return (<>
                                    Currently<br/>
                                    on page {listenMode["page"] + 1}
                                </>);
                            }
                            if (listenMode["status"] === "ready") {
                                return (
                                    <>
                                        <form>
                                            <label htmlFor = "chosen-voice-in-book-page">Choose a voice</label><br/>
                                            <select 
                                                name = "chosen-voice-in-book-page"
                                                id = "voice-selection-in-book-page"
                                            >
                                                {
                                                    (() => {
                                                        let voiceList = SpeechServer.getFixedPublicVoiceList()
                                                            .map((voice: any) => {
                                                                voice["type"] = "public";
                                                                return voice;
                                                            })
                                                            .concat(userAudioFileList);

                                                        return voiceList.map((voice: any) => {
                                                            return (
                                                                <option
                                                                    value = {`${voice["type"]}-${voice["id"]}`}
                                                                >
                                                                    {voice["name"]}
                                                                </option>
                                                            );
                                                        });
                                                    })()
                                                }
                                            </select>
                                        </form>
                                    </>
                                );
                            }
                            return "";
                        })()
                    }
                    <br/>
                    <button
                        id = "change-listen-mode-button-in-book-page"
                        onClick = {() => {
                            if (listenMode["status"] === "off") {
                                setListenMode({
                                    "status": "ready",
                                    "page": currentPage
                                });
                            } else if (listenMode["status"] === "ready") {
                                setListenMode({
                                    "status": "on",
                                    "page": currentPage,
                                    "client-status": "download-result-audio-file",
                                    "voice": (
                                        function() {
                                            let voiceSelection = document.getElementById("voice-selection-in-book-page") as HTMLSelectElement;
                                            let selectedVoice = voiceSelection.value.split("-");
                                            
                                            return {
                                                "type": selectedVoice[0],
                                                "id": selectedVoice[1]
                                            };
                                        }
                                    )()
                                }); 
                            } else if (listenMode["status"] === "on") {
                                setListenMode({
                                    "status": "off",
                                    "page": -1
                                });
                            }
                        }}
                    >
                        {
                            (() => {
                                if (listenMode["status"] === "off") {
                                    return "Listen";
                                }
                                if (listenMode["status"] === "on") {
                                    return "Stop";
                                }
                                if (listenMode["status"] === "ready") {
                                    return "Start";
                                }
                            })()
                        }
                    </button>
                </p>
            </div>

        </div>
    );
}

function PagePairPart(
    {
        listenMode,
        bookID,
        currentPage
    }: PagePairPartProps
) {

    var [leftPageContent, setLeftPageContent] = useState<string>("");
    var [rightPageContent, setRightPageContent] = useState<string>("");

    if (listenMode["status"] === "on") {
        if (listenMode["client-status"] === "download-result-audio-file") {
            let content = "";
            if (currentPage === listenMode["page"]) {
                content = leftPageContent;
            } else {
                content = rightPageContent;
            }
            content = content.replaceAll("<br/>", "");

            if (content != "") {
                //console.log(content);
                SpeechServer.convertTextToSpeech(
                    "dummy",
                    listenMode["voice"]["id"],
                    content,
                    "../cache/audio.mp3"
                );
            }
        }
    }

    StorageServer.getBookPage(
        bookID,
        currentPage,
        (response) => {
            const newLeftPageContent = response.data[`content_page_${currentPage}`].replace(/\r\n|\n|\r/g, '<br/>');

            if (newLeftPageContent !== leftPageContent) {
                setLeftPageContent(newLeftPageContent);
            }
        }
    );

    StorageServer.getBookPage(
        bookID,
        currentPage + 1,
        (response) => {
            const newRightPageContent = response.data[`content_page_${currentPage + 1}`].replace(/\r\n|\n|\r/g, '<br/>');

            if (newRightPageContent !== rightPageContent) {
                setRightPageContent(newRightPageContent);
            }
        }
    );

    

    return (
        <div
            id = "page-part-in-book-page"
        >
            <div
                id = "left-page-in-book-page"
                className = "displayed-page-in-book-page-container"
            >
                <div
                    className = "displayed-page-in-book-page"
                    dangerouslySetInnerHTML={{ __html: leftPageContent }}
                >
                </div>
            </div>
            <div
                id = "right-page-in-book-page"
                className = "displayed-page-in-book-page-container"
            >
                <div
                    className = "displayed-page-in-book-page"
                    dangerouslySetInnerHTML={{ __html: rightPageContent }}
                >
                </div>
            </div>
        </div>
    );
}

function InteractionPart(
    {
        bookID,
        userID
    }: InteractionPartProps
) {
    if (bookID === null || bookID === undefined) {
        return (
            <div
                id = "no-book-selected-message-in-book-page"
            >
                You have not selected a book to read yet. <br/>
                Please choose a book to read
            </div>
        );
    }

    var [currentPage, setCurrentPage] = useState<number>(1);
    var [listenMode, setListenMode] = useState<any>({
        "status": "off",
        "page": -1
    });

    StorageServer.getUserReadingProcess(
        userID, 
        bookID,
        (response) => {
            const newCurrentPage = response.data["current_page"];

            if (newCurrentPage !== currentPage) {
                setCurrentPage(newCurrentPage);
            }
        }
    );

    return (
        <>
            <PagePairPart
                bookID={bookID}
                currentPage={currentPage}
                listenMode={listenMode}
            />

            <PropertiesPart
                userID = {userID}
                bookID = {bookID}
                currentPage = {currentPage}
                onBackwardButtonClick = {() => {
                    StorageServer.updateUserReadingProcess(
                        userID,
                        bookID,
                        Math.max(0, currentPage - 2),
                        (response) => {
                            setCurrentPage(Math.max(0, currentPage - 2));
                        }
                    );
                }}

                onForwardButtonClick = {() => {
                    StorageServer.updateUserReadingProcess(
                        userID,
                        bookID,
                        Math.min(currentPage + 2, 100),
                        (response) => {
                            setCurrentPage(Math.min(currentPage + 2, 100));
                        }
                    );
                }}

                listenMode = {listenMode}

                setListenMode = {setListenMode}
            />
        </>
    );
}

export default function BookPage(
    {
        onSearchButtonClick,
        onPageOptionClick,
        bookID,
        userID
    }: BookPageProps
) {
    return (
        <div
            id = "book-page"
        >
            <TopHorizontalBar
                onSearchButtonClick = {onSearchButtonClick} 
            />

            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID.BOOK_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />

                <InteractionPart
                    bookID = {bookID}
                    userID = {userID}
                />

            </div>
        </div>
    );
}