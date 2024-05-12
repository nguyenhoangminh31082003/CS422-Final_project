import { Fragment, useState, MouseEvent } from "react";

import PAGE_ID from "../PageID";
import "../styles/library_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import duneCoverImage from "../assets/dune_cover_image.png";
import duneMessiahCoverImage from "../assets/dune_messiah_cover_image.png";
import hereticsOfDuneCoverImage from "../assets/heretics_of_dune_cover_image.png";
import houseCorrinoCoverImage from "../assets/house_corrino_cover_image.png";

interface LibraryPageProps {
    onPageOptionClick: (pageID: number) => void;
    onBookOptionClick: (bookID: string) => void;
    searchInput?: string | null;
}

interface BookOptionProps {
    imageLinkOfBookCover: string;
    title: string;
    authorName: string;
    averageRating: number;
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
        averageRating,
        genre,
        onClick
    }: BookOptionProps
) {
    return (
        <div
            className = "book-option-in-library-page"
        >
            <button
                className = "book-option-detail-in-library-page"
                onClick = {onClick}
            >
                <div
                    className = "detail-cell-in-library-page"
                >
                    <img
                        className = "cover-image-of-book-in-library-page"
                        src = {imageLinkOfBookCover}
                        alt = "Book cover"
                    />
                </div>

                <div
                    className = "detail-cell-in-library-page"
                >
                    <h1
                        className = "title-of-book-in-library-page"
                    >
                        Title
                    </h1>
                    <p
                        className = "detail-of-book-in-library-page"
                    >
                        {title}
                    </p>
                </div>

                <div
                    className = "detail-cell-in-library-page"
                >
                    <h1
                        className = "title-of-book-in-library-page"
                    >
                        Author
                    </h1>
                    <p
                        className = "detail-of-book-in-library-page"
                    >
                        {authorName}
                    </p>
                </div>

                <div
                    className = "detail-cell-in-library-page"
                >
                    <h1
                        className = "title-of-book-in-library-page"
                    >
                        Average rating
                    </h1>
                    <p
                        className = "detail-of-book-in-library-page"
                    >
                        {averageRating}/5 stars
                    </p>
                </div>

                <div
                    className = "detail-cell-in-library-page"
                >
                    <h1
                        className = "title-of-book-in-library-page"
                    >
                        Genre
                    </h1>
                    <p
                        className = "detail-of-book-in-library-page"
                    >
                        {genre}
                    </p>
                </div>

            </button>
        </div>
    )
}

const demoBookOptionList = [
    {
        bookID: "1",
        imageLinkOfBookCover: duneCoverImage,
        title: "Dune",
        authorName: "Frank Herbert",
        averageRating: 4.27,
        genre: "Science Fiction"
    },
    {
        bookID: "2",
        imageLinkOfBookCover: duneMessiahCoverImage,
        title: "Dune Messiah",
        authorName: "Frank Herbert",
        averageRating: 3.89,
        genre: "Science Fiction"
    },
    {
        bookID: "3",
        imageLinkOfBookCover: hereticsOfDuneCoverImage,
        title: "Heratics of Dune",
        authorName: "Frank Herbert",
        averageRating: 3.87,
        genre: "Science Fiction"
    },
    {
        bookID: "4",
        imageLinkOfBookCover: houseCorrinoCoverImage,
        title: "House Corrino",
        authorName: "Brian Herbert, Kevin J. Anderson",
        averageRating: 3.74,
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
        Request the number of books in the from the server
    */
    const numberOfBooks = demoBookOptionList.length;
    var [bookOptionList, setBookOptionList] = useState(demoBookOptionList);
    var [hasMore, setHasMore] = useState(true);

    return (
        <div
            id = "book-list-part"
        >
            <div 
                id = "title-bar-in-library-page"
            >
                <form
                    id = "order-option-selection-in-library-page"
                >
                    <label 
                        htmlFor = "orders"
                        style = {
                            {
                                fontWeight: "bold"
                            }
                        }
                    >Sort by&nbsp;</label>

                    <select 
                        name = "orders" 
                        id="order-option-in-library-page"
                    >
                        <option value = "highly-rated">Highly rated</option>
                        <option value = "most-popular">Most popular</option>
                    </select>

                </form>
                 
            </div>
            <div
                id = "book-option-list"
            >
                <InfinieScroll
                        
                    dataLength = {
                        bookOptionList.length 
                    }

                    next = {
                        () => {
                            if (bookOptionList.length < numberOfBooks) {
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

                    scrollableTarget = "book-option-list"
                >   
                    {
                        bookOptionList.map((item, index) => {
                            return (
                                <BookOption
                                    imageLinkOfBookCover = {item.imageLinkOfBookCover}
                                    title = {item.title}
                                    authorName = {item.authorName}
                                    averageRating = {item.averageRating}
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