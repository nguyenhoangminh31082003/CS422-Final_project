import { Fragment, useState, MouseEvent } from "react";
import PAGE_ID from "../PageID";
import StorageServer from "../StorageServer";
import VerticalPageBar from "./VerticalPageBar";
import "../styles/search_result_page_styles.css";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import defaultBookCoverImage from "../assets/default_book_cover_image.png";

interface SearchPageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onPageOptionClick: (pageID: number) => void;
    onBookOptionClick: (bookID: string) => void;
    searchInput?: string | null;
}

interface BookOptionProps {
    onClick: (event: MouseEvent) => void;
    imageLinkOfBookCover: string;
    averageRating: number;
    authorName: string;
    title: string;
    genre: string;
}

interface BookListPartProps {
    searchInput?: string | null;
    onBookOptionClick: (shelfID: string) => void;
}

interface TitlePartProps {
    searchInput?: string | null;
    onSelectedOptionChange: (selectedOption: string) => void;
}

interface BookOptionListPartProps {
    searchInput?: string | null;
    selectedOption: string;
    onBookOptionClick: (bookID: string) => void;
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
            className = "book-option-in-search-result-page"
        >
            <button
                className = "book-option-detail-in-search-result-page"
                onClick = {onClick}
            >
                <div
                    className = "detail-cell-in-search-result-page"
                >
                    <img
                        className = "cover-image-of-book-in-search-result-page"
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
                    className = "detail-cell-in-search-result-page"
                >
                    <h1
                        className = "title-of-book-in-search-result-page"
                    >
                        Title
                    </h1>
                    <p
                        className = "detail-of-book-in-search-result-page"
                    >
                        {title}
                    </p>
                </div>

                <div
                    className = "detail-cell-in-search-result-page"
                >
                    <h1
                        className = "title-of-book-in-search-result-page"
                    >
                        Author
                    </h1>
                    <p
                        className = "detail-of-book-in-search-result-page"
                    >
                        {authorName}
                    </p>
                </div>

                <div
                    className = "detail-cell-in-search-result-page"
                >
                    <h1
                        className = "title-of-book-in-search-result-page"
                    >
                        Average rating
                    </h1>
                    <p
                        className = "detail-of-book-in-search-result-page"
                    >
                        {averageRating}/5 stars
                    </p>
                </div>

                <div
                    className = "detail-cell-in-search-result-page"
                >
                    <h1
                        className = "title-of-book-in-search-result-page"
                    >
                        Genre
                    </h1>
                    <p
                        className = "detail-of-book-in-search-result-page"
                    >
                        {genre}
                    </p>
                </div>

            </button>
        </div>
    )
}

function TitlePart(
    {
        searchInput,
        onSelectedOptionChange
    }: TitlePartProps
) {
    return (
        <div 
            id = "title-bar-in-search-result-page"
        >
            {/*
            <form
                id = "order-option-selection-in-search-result-page"
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
                    id = "order-option-in-search-result-page"
                    onChange = {
                        (event) => {
                            onSelectedOptionChange(event.target.value);
                        }
                    }
                >
                    <option value = "search-result">Search result</option>
                </select>

            </form>
            */}
            <p
                style = {
                    {
                        fontSize: "large",
                        color: "#7D4230" 
                    }
                }
            >
            Search result of "<div style = {{"whiteSpace": "nowrap", "display": "inline", "fontWeight": "bold", "fontStyle": "italic"}}>{searchInput}</div>"
            </p>
            
        </div>
    );
}

function BookOptionListPart(
    {
        selectedOption,
        searchInput,
        onBookOptionClick
    }: BookOptionListPartProps
) {
    var [allBooks, setAllBooks] = useState<any[]>([]);

    function getBooksBySearching() {
        StorageServer.searchBooks(
            searchInput,
            (response) => {
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
        });
    }

    if (selectedOption === "search-result") {
        getBooksBySearching();
    }

    const numberOfBooks = allBooks.length;
    var [bookOptionList, setBookOptionList] = useState<any[]>([]);
    var [hasMore, setHasMore] = useState(true);

    if (JSON.stringify(bookOptionList) !== JSON.stringify(allBooks)) {
        setBookOptionList(allBooks);
    }

    if (bookOptionList.length === 0) {
        return (
            <div
                id = "book-option-list"
            >
                <p
                    style = {
                        {
                            textAlign: "center",
                            color: "#7D4230"
                        }
                    }
                >
                    No suitable book is found
                </p>
            </div>
        );
    };

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

    var [selectedOption, setSelectedOption] = useState("search-result");

    return (
        <div
            id = "book-list-part"
        >
            <TitlePart 
                onSelectedOptionChange = {
                    (selectedOption: string) => {
                        setSelectedOption(selectedOption);
                    }
                }

                searchInput = {searchInput}
            />

            <BookOptionListPart 
                selectedOption = {selectedOption}
                searchInput = {searchInput}
                onBookOptionClick = {onBookOptionClick}
            />
        </div>
    );
}

export default function SearchPage(
    {
        onSearchButtonClick,
        onPageOptionClick,
        onBookOptionClick,
        searchInput
    }: SearchPageProps
) {
    return (
        <div
            id = "search-result-page"
        >
            <TopHorizontalBar
                onSearchButtonClick = {
                    onSearchButtonClick
                } 
            />

            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID["LIBRARY_PAGE"]
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