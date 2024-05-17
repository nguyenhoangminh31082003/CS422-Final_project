import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/shelf_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import backButtonIcon from "../assets/back_button_icon.svg";
import RemoveButtonIcon from "../assets/remove_button_icon.svg";

interface ShelfPageProps {
    userID: string;
    onPageOptionClick: (pageID: number) => void;
    onShelfBookOptionClick: (bookID: string) => void;
    shelfID: string;
}

interface ShelfBookOptionProps {
    imageLinkOfBookCover: string;
    title: string;
    authorName: string;
    dateAdded: Date;
    averageRating: number;
    userProcess: number;
    genre: string;
    onClick: (event: MouseEvent) => void;
    onRemoveButtonClick: () => void;
}

interface ShelfBookListPartProps {
    userID: string;
    shelfID: string;
    onPageOptionClick: (pageID: number) => void;
    onShelfBookOptionClick: (shelfID: string) => void;
}

function ShelfBookOption(
    {
        imageLinkOfBookCover,
        title,
        authorName,
        dateAdded,
        averageRating,
        userProcess,
        genre,
        onClick,
        onRemoveButtonClick,
    }: ShelfBookOptionProps
) {
    return (
        <div
            className = "shelf-book-option-in-shelf-page"
        >
            <button
                className = "shelf-book-option-detail-in-shelf-page"
                onClick = {onClick}
            >
                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <img
                        className = "cover-image-of-shelf-book-in-shelf-page"
                        src = {imageLinkOfBookCover}
                        alt = "Book cover"
                    />
                </div>

                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <h1
                        className = "title-of-shelf-book-in-shelf-page"
                    >
                        Title
                    </h1>
                    <p
                        className = "detail-of-shelf-book-in-shelf-page"
                    >
                        {title}
                    </p>
                </div>

                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <h1
                        className = "title-of-shelf-book-in-shelf-page"
                    >
                        Author
                    </h1>
                    <p
                        className = "detail-of-shelf-book-in-shelf-page"
                    >
                        {authorName}
                    </p>
                </div>

                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <h1
                        className = "title-of-shelf-book-in-shelf-page"
                    >
                        Date added
                    </h1>
                    <p
                        className = "detail-of-shelf-book-in-shelf-page"
                    >
                        {
                            `${
                                (() => {
                                    const date = dateAdded.getDate();
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
                            } ${dateAdded.toLocaleString('default', { month: 'long' })},`
                        }
                        <br/>
                        {
                            dateAdded.getFullYear()
                        }
                    </p>
                </div>

                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <h1
                        className = "title-of-shelf-book-in-shelf-page"
                    >
                        Average rating
                    </h1>
                    <p
                        className = "detail-of-shelf-book-in-shelf-page"
                    >
                        {averageRating}/5 stars
                    </p>
                </div>

                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <h1
                        className = "title-of-shelf-book-in-shelf-page"
                    >
                        Your process
                    </h1>
                    <p
                        className = "detail-of-shelf-book-in-shelf-page"
                    >
                        {(userProcess * 100).toFixed(2)}%
                    </p>
                </div>

                <div
                    className = "detail-cell-in-shelf-page"
                >
                    <h1
                        className = "title-of-shelf-book-in-shelf-page"
                    >
                        Genre
                    </h1>
                    <p
                        className = "detail-of-shelf-book-in-shelf-page"
                    >
                        {genre}
                    </p>
                </div>

                <button
                    className = "remove-shelf-button-in-shelf-option-in-home-page"
                            
                    onClick = {
                        (event: MouseEvent) => {
                            event.stopPropagation();

                            axios.delete(`http://127.0.0.1:8000/shelf/delete/${shelfID}/`)
                                .then((response) => {
                                    if (response.status === 200) {
                                            
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

            </button>
        </div>
    )
}

function ShelfBookListPart(
    {
        userID,
        shelfID,
        onPageOptionClick,
        onShelfBookOptionClick
    }: ShelfBookListPartProps
) {

    var [shelfInformation, setShelfInformation] = useState<any>({
        "shelf_id": "0",
        "shelf_name": "Shelf name"
    });

    var [allBooks, setAllBooks] = useState<any[]>([]);

    axios.get(`http://127.0.0.1:8000/shelf/${userID}/`)
        .then((response) => {
            const shelf = response.data.filter((item: any) => item["id"] === shelfID)[0];

            const newData = {
                "sheld_id": shelf["id"],
                "shelf_name": shelf["name"],
            };

            if (JSON.stringify(newData) !== JSON.stringify(shelfInformation)) {
                setShelfInformation(newData);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    axios.get(`http://127.0.0.1:8000/addedbooks/${userID}/${shelfID}/`)
        .then((response) => {
            const newBooks = response.data.map((item: any) => {
                let book = {
                    "bookID": item["book_id"],
                    "imageLinkOfBookCover": item["book"]["image_url"],
                    "title": item["book"]["title"],
                    "authorName": item["book"]["author"],
                    "dateAdded": new Date(item["added_date"]),
                    "averageRating": item["book"]["rating"],
                    "userProcess": 0,
                    "genre": item["book"]["genre"]
                }
                
                return book;
            });
            if (JSON.stringify(newBooks) !== JSON.stringify(allBooks)) {
                setAllBooks(newBooks);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    const numberOfBooks = allBooks.length;

    var [shelfBookOptionList, setShelfBookOptionList] = useState<any[]>([]);
    var [hasMore, setHasMore] = useState(true);

    if (JSON.stringify(allBooks) !== JSON.stringify(shelfBookOptionList)) {
        setShelfBookOptionList(allBooks);
    }

    console.log(allBooks);

    function TitlePart() {
        return (
            <div 
                id = "title-bar-in-shelf-page"
            >
                <button
                    id = "back-button-in-shelf-page"
                    onClick = {
                        () => {
                            onPageOptionClick(PAGE_ID.HOME_PAGE);
                        }
                    }
                >
                    <img
                        id = "back-button-icon-in-shelf-page"
                        src = {backButtonIcon}
                        alt = "Back"
                    />
                </button>

                <h1
                    id = "shelf-name-title-in-shelf-page"
                > 
                    {`"${shelfInformation["shelf_name"]}" Shelf`} 
                </h1>
            </div>
        );
    }

    return (
        <div
            id = "shelf-book-list-part"
        >
            
            <TitlePart />

            <div
                id = "shelf-book-option-list"
            >
                <InfinieScroll
                        
                    dataLength = {
                        shelfBookOptionList.length 
                    }

                    next = {
                        () => {
                            if (shelfBookOptionList.length < numberOfBooks) {
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

                    scrollableTarget = "shelf-book-option-list"
                >   
                    {
                        shelfBookOptionList.map((item, index) => {
                            return (
                                <ShelfBookOption
                                    imageLinkOfBookCover = {item.imageLinkOfBookCover}
                                    title = {item.title}
                                    authorName = {item.authorName}
                                    dateAdded = {item.dateAdded}
                                    averageRating = {item.averageRating}
                                    userProcess = {item.userProcess}
                                    genre = {item.genre}
                                    onClick = {
                                        (event: MouseEvent) => {
                                            onShelfBookOptionClick(item.bookID);
                                        }
                                    }
                                    onRemoveButtonClick = {
                                        () => {
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

export default function ShelfPage(
    {
        onPageOptionClick,
        onShelfBookOptionClick,
        shelfID,
        userID
    }: ShelfPageProps
) {
    return (
        <div
            id = "shelf-page"
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
                <ShelfBookListPart
                    shelfID = {shelfID}

                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    onShelfBookOptionClick = {
                        onShelfBookOptionClick
                    }

                    userID = {userID}
                />
            </div>
        </div>
    );
}