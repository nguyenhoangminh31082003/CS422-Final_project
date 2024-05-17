import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/home_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import AddButtonIcon from "../assets/add_button_icon.svg";
import InfinieScroll from "react-infinite-scroll-component";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";
import defaultBookCoverImage from "../assets/default_book_cover_image.png";

interface HomePageProps {
    onPageOptionClick: (pageID: number) => void;
    onShelfOptionClick: (shelfID: string) => void;
    onCreateNewShelfClick: () => void;
    userID: string;
}

interface ShelfOptionProps {
    shelfID: string;
    imageLinkOfBookInShelf: string;
    shelfName: string;
    mostRecentBookInformation: {
        bookName: string;
        authorName: string;
    },
    lastUpdateDate: Date;
    bookCount: number;
    onClick: (event: MouseEvent) => void;
    onRemoveButtonClick: (event: MouseEvent) => void;
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
        shelfID,
        imageLinkOfBookInShelf,
        shelfName,
        mostRecentBookInformation,
        lastUpdateDate,
        bookCount,
        onClick,
        onRemoveButtonClick
    }: ShelfOptionProps
) {
    return (
        <div
            className = "shelf-option-in-home-page"
        >    
            <button
                id = {`shelf-option-detail-width-shelf-id-${shelfID}-in-home-page`}
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

                                    axios.delete(`http://127.0.0.1:8000/shelf/delete/${shelfID}/`)
                                        .then((response) => {
                                            if (response.status === 200) {
                                                onRemoveButtonClick(event);
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
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

                    {
                        (() => {
                            if (bookCount === 0) {
                                return (
                                    <>
                                        <p
                                            style = {
                                                {
                                                    fontStyle: "italic"
                                                }
                                            }
                                        >
                                            There is no book in shelf yet
                                        </p>
                                    </>
                                );
                            }
                            return (
                                <>
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
                                </>
                            );
                        })()
                    }
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
    var [allShelves, setAllShelves] = useState<any>([]);

    axios.get(`http://localhost:8000/shelf/${userID}/`)
        .then(async (response) => {
            if (response.status == 200) {
                const newData = await Promise.all(response.data.map(async (shelf: any) => {
                        
                    let books: any[] = [];

                    try {
                        const bookResponse = await axios.get(`http://localhost:8000/addedbooks/${userID}/${shelf["id"]}/`);
                        if (bookResponse.status == 200) {
                            books = bookResponse.data;
                        }
                    } catch (error) {
                        console.log(error);
                    }

                        if (books.length === 0) {
                            return {
                                "shelfName": shelf["name"],
                                "id": shelf["id"],
                                "bookCount": 0,
                                "imageLinkOfBookInShelf": defaultBookCoverImage,
                                "mostRecentBookInformation": {
                                    "bookName": "",
                                    "authorName": ""
                                },
                                "lastUpdateDate": new Date(0)
                            };
                        }

                        console.log(books);

                        return {
                            "shelfName": shelf["name"],
                            "id": shelf["id"],
                            "bookCount": books.length,
                            "imageLinkOfBookInShelf": books[0]["book"]["image_url"],
                            "mostRecentBookInformation": {
                                "bookName": books[0]["book"]["title"],
                                "authorName": books[0]["book"]["author"]
                            },
                            "lastUpdateDate": new Date(books[0]["last_update_date"])
                        };
                    })
                );

                if (JSON.stringify(allShelves) !== JSON.stringify(newData)) {
                    setAllShelves(newData);
                }
                

                console.log(allShelves);
            }
        })
        .catch(error => {
        });

    const numberOfShelves = allShelves.length;

    var [shelfOptionList, setShelfOptionList] = useState<any[]>([]);
    var [hasMore, setHasMore] = useState(true);

    if (JSON.stringify(shelfOptionList) !== JSON.stringify(allShelves)) {
        setShelfOptionList(allShelves);
    }

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
                            console.log(`The number of shelves is ${shelfOptionList.length} !!!`);
                            if (shelfOptionList.length < numberOfShelves) {
                                setTimeout(() => {
                                    /*
                                    
                                        Request from server to get more shelves
                                    
                                    */
                                }, 4000); 
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
                                    shelfID = {item.id}
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
                                    onRemoveButtonClick={
                                        (event: MouseEvent) => {
                                            const newShelfOptionList = shelfOptionList.filter((shelf) => {
                                                return shelf.id !== item.id;
                                            });

                                            setShelfOptionList(newShelfOptionList);
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