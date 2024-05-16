import { Fragment, useState, MouseEvent } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/library_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import defaultBookCoverImage from "../assets/default_book_cover_image.png";

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
                        onError={
                            (event: any) => {
                                event.target.src = defaultBookCoverImage;
                            }
                        }
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

interface BookOptionListPartProps {
    searchInput?: string | null;
    onBookOptionClick: (bookID: string) => void;
}

function TitlePart() {
    return (
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
    );
}

function BookOptionListPart(
    {
        searchInput,
        onBookOptionClick
    }: BookOptionListPartProps
) {
    var [allBooks, setAllBooks] = useState<any[]>([]);

    axios.get("http://127.0.0.1:8000/books")
        .then((response) => {
            console.log(response);
            const newData = response.data.map((item: any) => {
                return {
                    "bookID": item["id"],
                    "imageLinkOfBookCover": item["image_url"],
                    "title": item["title"],
                    "authorName": item["author"],
                    "averageRating": item["rating"],
                    "genre": item["genre"]
                }
            });

            if (JSON.stringify(allBooks) !== JSON.stringify(newData)) {
                setAllBooks(newData);
            }
        })
        .catch((error) => {
        
        });

    const numberOfBooks = allBooks.length;
    var [bookOptionList, setBookOptionList] = useState<any[]>([]);
    var [hasMore, setHasMore] = useState(true);

    if (JSON.stringify(bookOptionList) !== JSON.stringify(allBooks)) {
        setBookOptionList(allBooks);
    }

    return (
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
    );
}

function BookListPart(
    {
        searchInput,
        onBookOptionClick
    }: BookListPartProps
) {
    return (
        <div
            id = "book-list-part"
        >
            <TitlePart />

            <BookOptionListPart 
                searchInput = {searchInput}
                onBookOptionClick = {onBookOptionClick}
            />
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

                    onBookOptionClick = {
                        onBookOptionClick
                    }
                />
            </div>
        </div>
    );
}