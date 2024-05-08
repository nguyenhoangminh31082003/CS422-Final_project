import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/shelf_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import DuneCoverImage from "../assets/dune_cover_image.png";

interface ShelfPageProps {
    onPageOptionClick: (pageID: number) => void;
    shelfID: string;
}

interface ShelfBookOptionProps {
    imageLinkOfBookCover: string;
    title: string;
    authorName: string;
    date: Date;
    averageRating: number;
    userRating: number;
    genre: string;
}

function ShelfBookOption(
    {
        imageLinkOfBookCover,
        title,
        authorName,
        date,
        averageRating,
        userRating,
        genre
    }: ShelfBookOptionProps
) {
    /*
    return (
        <button
            className = "shelf-option-in-home-page"
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
    );*/
    return (
        <div>
            {title}
        </div>
    )
}

const demoShelfBookOptionList = [
    {
        imageLinkOfBookCover: DuneCoverImage,
        title: "Dune",
        authorName: "Frank Herbert",
        date: new Date(2024, 3, 24),
        averageRating: 4.27,
        userRating: 0.9669,
        genre: "Science Fiction"
    }
]

function ShelfBookListPart() {
    /*
        Request the number of books in the shelve from the server
    */
    const numberOfBooks = demoShelfBookOptionList.length;

    var [shelfBookOptionList, setShelfBookOptionList] = useState(demoShelfBookOptionList);
    var [hasMore, setHasMore] = useState(true);

    return (
        <div
            id = "shelf-book-list-part"
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
                    <p> End of the list </p>
                }

                scrollableTarget = "shelf-list-part"
            >   
                {
                    shelfBookOptionList.map((item, index) => {
                        return (
                            <ShelfBookOption
                                imageLinkOfBookCover = {item.imageLinkOfBookCover}
                                title = {item.title}
                                authorName = {item.authorName}
                                date = {item.date}
                                averageRating = {item.averageRating}
                                userRating = {item.userRating}
                                genre = {item.genre}
                            />
                        )
                    })
                }
            </InfinieScroll>
        </div>
    );
}

function ShelfPage(
    {
        onPageOptionClick,
        shelfID
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
                <ShelfBookListPart/>
            </div>
        </div>
    );
}

export default ShelfPage;