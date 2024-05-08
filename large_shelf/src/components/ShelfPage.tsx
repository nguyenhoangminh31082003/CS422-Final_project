import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/shelf_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import DuneCoverImage from "../assets/dune_cover_image.png";

interface ShelfPageProps {
    onPageOptionClick: (pageID: number) => void;
    onShelfBookOptionClick: (bookID: string) => void;
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
    onClick: (event: MouseEvent) => void;
}

interface ShelfBookListPartProps {
    shelfID: string;
    onShelfBookOptionClick: (shelfID: string) => void;
}

function ShelfBookOption(
    {
        imageLinkOfBookCover,
        title,
        authorName,
        date,
        averageRating,
        userRating,
        genre,
        onClick
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
                        className = "image-of-a-book-in-shelf-in-shelf-page"
                        src = {imageLinkOfBookCover}
                        alt = "Book in shelf"
                    />
                </div>

            </button>
        </div>
    )
}

const demoShelfBookOptionList = [
    {
        bookID: "1",
        imageLinkOfBookCover: DuneCoverImage,
        title: "Dune",
        authorName: "Frank Herbert",
        date: new Date(2024, 3, 24),
        averageRating: 4.27,
        userRating: 0.9669,
        genre: "Science Fiction"
    }
]

function ShelfBookListPart(
    {
        shelfID,
        onShelfBookOptionClick
    }: ShelfBookListPartProps
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
                                <ShelfBookOption
                                    imageLinkOfBookCover = {item.imageLinkOfBookCover}
                                    title = {item.title}
                                    authorName = {item.authorName}
                                    date = {item.date}
                                    averageRating = {item.averageRating}
                                    userRating = {item.userRating}
                                    genre = {item.genre}
                                    onClick = {
                                        (event: MouseEvent) => {
                                            onShelfBookOptionClick(item.bookID);
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

function ShelfPage(
    {
        onPageOptionClick,
        onShelfBookOptionClick,
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
                <ShelfBookListPart
                    shelfID = {shelfID}

                    onShelfBookOptionClick = {
                        onShelfBookOptionClick
                    }
                />
            </div>
        </div>
    );
}

export default ShelfPage;