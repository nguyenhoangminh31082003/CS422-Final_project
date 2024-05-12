import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/shelf_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import duneCoverImage from "../assets/dune_cover_image.png";

interface LibraryPageProps {
    onPageOptionClick: (pageID: number) => void;
    onBookOptionClick: (bookID: string) => void;
    searchInput?: string | null;
}

interface BookOptionProps {
    imageLinkOfBookCover: string;
    title: string;
    authorName: string;
    dateAdded: Date;
    averageRating: number;
    userProcess: number;
    genre: string;
    onClick: (event: MouseEvent) => void;
}

interface BookListPartProps {
    searchInput?: string | null;
    onPageOptionClick: (pageID: number) => void;
    onBookOptionClick: (shelfID: string) => void;
}

function BookOption(
    {
        imageLinkOfBookCover,
        title,
        authorName,
        dateAdded,
        averageRating,
        userProcess,
        genre,
        onClick
    }: BookOptionProps
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

            </button>
        </div>
    )
}

const demoShelfBookOptionList = [
    {
        bookID: "1",
        imageLinkOfBookCover: duneCoverImage,
        title: "Dune",
        authorName: "Frank Herbert",
        dateAdded: new Date(2024, 3, 24),
        averageRating: 4.27,
        userProcess: 0.9669,
        genre: "Science Fiction"
    }
]

function BookListPart(
    {
        searchInput,
        onPageOptionClick,
        onBookOptionClick
    }: BookListPartProps
) {
    /*
        Request the number of books in the shelve from the server
    */
    const numberOfBooks = demoShelfBookOptionList.length;
    /*
    
        Request from the server to get the shelf name given shelf ID
    
    */
    const shelfName = "Current reading";

    var [shelfBookOptionList, setShelfBookOptionList] = useState(demoShelfBookOptionList);
    var [hasMore, setHasMore] = useState(true);

    return (
        <div
            id = "shelf-book-list-part"
        >
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
                </button>

                <h1
                    id = "shelf-name-title-in-shelf-page"
                > 
                    {`"${shelfName}" Shelf`} 
                </h1>
            </div>
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
                        <p> End of the list </p>
                    }

                    scrollableTarget = "shelf-book-option-list"
                >   
                    {
                        shelfBookOptionList.map((item, index) => {
                            return (
                                <BookOption
                                    imageLinkOfBookCover = {item.imageLinkOfBookCover}
                                    title = {item.title}
                                    authorName = {item.authorName}
                                    dateAdded = {item.dateAdded}
                                    averageRating = {item.averageRating}
                                    userProcess = {item.userProcess}
                                    genre = {item.genre}
                                    onClick = {
                                        (event: MouseEvent) => {
                                            onBookOptionClick(item.bookID);
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

export default function LibraryPage(
    {
        onPageOptionClick,
        onBookOptionClick,
        searchInput
    }: LibraryPageProps
) {
    return (
        <div
            id = "library-page"
        >
            <TopHorizontalBar 
            />

            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID.LIBRARY_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />
                <BookListPart
                    searchInput = {searchInput}

                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    onBookOptionClick = {
                        onBookOptionClick
                    }
                />
            </div>
        </div>
    );
}