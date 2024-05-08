import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/home_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import readShelfDemoBookCoverImage from "../assets/read_shelf_demo_book_cover_image.png";
import wantToReadShelfDemoBookCoverImage from "../assets/want_to_read_shelf_demo_book_cover_image.png";
import currentReadingShelfDemoBookCoverImage from "../assets/dune_cover_image.png";

interface HomePageProps {
    onPageOptionClick: (pageID: number) => void;
    onShelfOptionClick: (shelfID: string) => void;
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
    onShelfOptionClick: (shelfID: string) => void;
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
        <button
            className = "shelf-option-in-home-page"
            onClick = {onClick}
        >    
            <div
                className = "shelf-option-detail-in-home-page"
            >
                <img
                    className = "image-of-a-book-in-shelf"
                    src = {imageLinkOfBookInShelf}
                    alt = "Book in shelf"
                />

                <div
                    className = "text-information-of-shelf-option-in-home-page"
                >   
                    <h1
                        className = "shelf-name-in-home-page"
                    >
                        {shelfName}
                    </h1>
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

            </div>
        </button>
    );
}

const demoShelfOptionList = [
    {
        id: "1",
        imageLinkOfBookInShelf: currentReadingShelfDemoBookCoverImage,
        shelfName: "Current Reading",
        mostRecentBookInformation: {
            bookName: "Dune",
            authorName: "Frank Herbert"
        },
        lastUpdateDate: new Date("2024-03-26"),
        bookCount: 2
    },
    {
        id: "2",
        imageLinkOfBookInShelf: wantToReadShelfDemoBookCoverImage,
        shelfName: "Want to Read",
        mostRecentBookInformation: {
            bookName: "War and Peace",
            authorName: "Leo Tolstoy"
        },
        lastUpdateDate: new Date("2024-03-25"),
        bookCount: 263
    },
    {
        id: "3",
        imageLinkOfBookInShelf: readShelfDemoBookCoverImage,
        shelfName: "Read",
        mostRecentBookInformation: {
            bookName: "The Lord of the Rings",
            authorName: "J.R.R. Tolkien"
        },
        lastUpdateDate: new Date("2021-10-29"),
        bookCount: 5
    }
]

function ShelfListPart(
    {
        onShelfOptionClick
    }: ShelfListPartProps
) {
    /*
        Request the number of shelves from the server
    */
    const numberOfShelves = demoShelfOptionList.length;

    var [shelfOptionList, setShelfOptionList] = useState(demoShelfOptionList);
    var [hasMore, setHasMore] = useState(true);

    return (
        <div
            id = "shelf-list-part"
        >
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
                    <p> End of the list </p>
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
        </div>
    );
}

function HomePage(
    {
        onPageOptionClick,
        onShelfOptionClick
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
                />
            </div>
        </div>
    );
}

export default HomePage;