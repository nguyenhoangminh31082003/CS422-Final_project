import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/home_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import AddButtonIcon from "../assets/add_button_icon.svg";
import InfinieScroll from "react-infinite-scroll-component";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";

interface HomePageProps {
    onPageOptionClick: (pageID: number) => void;
    onShelfOptionClick: (shelfID: string) => void;
    onCreateNewShelfClick: () => void;
    userID: string;
}

interface ShelfOptionProps {
    imageLinkOfBookInShelf: string;
    shelfName: string;
    mostRecentBookInformation: {
        bookName: string;
        authorName: string;
    },
    lastUpdateDate: Date;
    bookCount: number;
    onClick: (event: MouseEvent) => void;
}

interface ShelfListPartProps {
    onCreateNewShelfClick: () => void;
    onShelfOptionClick: (shelfID: string) => void;
    userID: string;
}

interface ListPartProps {
    onShelfOptionClick: (shelfID: string) => void;
    userID: string;
}

interface TitlePartProps {
    onCreateNewShelfClick: () => void;
}

function ShelfOption(
    {
        imageLinkOfBookInShelf,
        shelfName,
        mostRecentBookInformation,
        lastUpdateDate,
        bookCount,
        onClick
    }: ShelfOptionProps
) {
    return (
        <div
            className = "shelf-option-in-home-page"
        >    
            <button
                className = "shelf-option-detail-in-home-page"
                onClick = {onClick}
            >
                <img
                    className = "image-of-a-book-in-shelf"
                    src = {imageLinkOfBookInShelf}
                    alt = "Book in shelf"
                />

                <div
                    className = "text-information-of-shelf-option-in-home-page"
                >   

                    <div
                        id = "top-bar-in-shelf-option-in-home-page"
                    >
                        <h1
                            className = "shelf-name-in-home-page"
                        >
                            {shelfName}
                        </h1>

                        <button
                            className = "remove-shelf-button-in-shelf-option-in-home-page"
                            onClick = {
                                (event: MouseEvent) => {
                                    event.stopPropagation();
                                }
                            }
                        >
                            <img
                                className = "remove-shelf-button-icon-in-shelf-option-in-home-page"
                                src = {RemoveButtonIcon}
                                alt = "Remove button"
                            />
                        </button>
                    </div>

                    <p>
                        {"Most recent book: "} 
                        <p
                            style = {
                                {
                                    display: "inline",
                                    fontStyle: "italic"
                                }
                            }
                        >
                            {mostRecentBookInformation.bookName}
                        </p>
                        {" by "}

                        <p
                            style = {
                                {
                                    display: "inline",
                                    fontStyle: "italic"
                                }
                            }
                        >
                            {mostRecentBookInformation.authorName}
                        </p>
                    </p>
                    <p>
                        {"Last update at "}
                        <p
                            style = {
                                {
                                    display: "inline",
                                    fontStyle: "italic"
                                }
                            }
                        >
                            {
                                `${lastUpdateDate.getFullYear()} ${lastUpdateDate.toLocaleString('default', { month: 'long' })} ${
                                    (() => {
                                        const date = lastUpdateDate.getDate();
                                        const lastDigit = date % 10;
                                        if ((3 <= date) || (date <= 20)) {
                                            return `${date}-th`;
                                        }
                                        if (lastDigit === 1) {
                                            return `${date}-st`;
                                        }
                                        if (lastDigit === 2) {
                                            return `${date}-nd`;
                                        }
                                        if (lastDigit === 3) {
                                            return `${date}-rd`;
                                        }
                                        return `${date}-th`;
                                    })()
                                }`
                            }
                        </p> 
                    </p>
                    <p>
                        <p 
                            style = {
                                {
                                    display: "inline",
                                    fontStyle: "italic"
                                }
                            }
                        >
                            {bookCount}
                        </p>
                            
                        {bookCount > 1 ? " books" : " book"}
                    </p>
                </div>

            </button>
        </div>
    );
}

function TitlePart(
    {
        onCreateNewShelfClick
    }: TitlePartProps
) {
    return (
        <div
            id = "title-bar-in-shelf-list-part"
        >   
            <h1
                id = "title-in-shelf-list-part"
            >
                My shelves
            </h1>

            <button
                id = "create-new-shelf-button"
                onClick = {
                    () => {
                        onCreateNewShelfClick();
                    }
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

function ListPart(
    {
        onShelfOptionClick,
        userID
    }: ListPartProps
) {
    var allShelves: any[] = [];

    axios.get(`http://localhost:8000/shelf/${userID}/`)
        .then(response => {
            if (response.status == 200) {
                allShelves = response.data.map((shelf: any) => {
                    var books: any[] = [];

                    axios.get(`http://localhost:8000/addedbooks/${userID}/${shelf["id"]}/`)
                        .then(response => {
                            if (response.status == 200) {
                                books = response.data;
                            }
                        })
                        .catch(error => {
                        });

                    if (books.length === 0) {
                        return {
                            "shelfName": shelf["name"],
                            "id": shelf["id"],
                            "bookCount": 0,
                            "imageLinkOfBookInShelf": "",
                            "mostRecentBookInformation": {
                                "bookName": "",
                                "authorName": ""
                            },
                            "lastUpdateDate": new Date()
                        };
                    }

                    return {
                        "shelfName": shelf["name"],
                        "id": shelf["id"],
                        "bookCount": books.length,
                        "imageLinkOfBookInShelf": books[0]["book"]["image_url"],
                        "mostRecentBookInformation": {
                            "bookName": books[0]["book"]["title"],
                            "authorName": books[0]["book"]["author"]
                        },
                        "lastUpdateDate": Date.parse(books[0]["last_update_date"])
                    };
                });
            }
        })
        .catch(error => {
        });

    const numberOfShelves = allShelves.length;

    var [shelfOptionList, setShelfOptionList] = useState(allShelves);
    var [hasMore, setHasMore] = useState(true);

    if (numberOfShelves === 0) {
        return (
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
                You currently has no shelf.
            </p>
        );
    }

    return (
        <InfinieScroll
                
                    dataLength = {
                        shelfOptionList.length 
                    }

                    next = {
                        () => {
                            if (shelfOptionList.length < numberOfShelves) {
                                setTimeout(() => {
                                    /*
                                    
                                        Request from server to get more shelves
                                    
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

                    scrollableTarget = "shelf-list-part"
                >   
                    {
                        shelfOptionList.map((item, index) => {
                            return (
                                <ShelfOption
                                    imageLinkOfBookInShelf = {item.imageLinkOfBookInShelf}
                                    shelfName = {item.shelfName}
                                    mostRecentBookInformation = {item.mostRecentBookInformation}
                                    lastUpdateDate = {item.lastUpdateDate}
                                    bookCount = {item.bookCount}
                                    onClick = {
                                        (event: MouseEvent) => {
                                            onShelfOptionClick(item.id);
                                        }
                                    }
                                />
                            )
                        })
                    }
                </InfinieScroll>
    );
}

function ShelfListPart(
    {
        onShelfOptionClick,
        onCreateNewShelfClick,
        userID
    }: ShelfListPartProps
) {
    

    return (
        <div
            id = "shelf-list-part"
        >

            <TitlePart 
                onCreateNewShelfClick = {
                    onCreateNewShelfClick
                }
            />

            <div
                id = "shelf-option-list"    
            >
                <ListPart
                    onShelfOptionClick = {
                        onShelfOptionClick
                    }

                    userID = {userID}
                />
            </div>


        </div>
    );
}

export default function HomePage(
    {
        onPageOptionClick,
        onShelfOptionClick,
        onCreateNewShelfClick,
        userID
    }: HomePageProps
) {
    return (
        <div
            id = "home-page"
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
                <ShelfListPart
                    onShelfOptionClick = {
                        onShelfOptionClick
                    }

                    onCreateNewShelfClick = {
                        onCreateNewShelfClick
                    }

                    userID = {userID}
                />
            </div>
        </div>
    );
}