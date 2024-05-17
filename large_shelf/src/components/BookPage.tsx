import { Fragment, MouseEvent, useState } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/book_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";


interface BookPageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onPageOptionClick: (pageID: number) => void;
    bookID: string | null | undefined;
    userID: string;
}

interface PropertiesPartProps {
    bookID: string | null | undefined;
    currentPage: number;
}

interface InteractionPartProps {
    bookID: string | null | undefined;
    userID: string;
}

interface PagePairPartProps {
    bookID: string | null | undefined;
    currentPage: number;
}

function PropertiesPart(
    {
        bookID,
        currentPage
    }: PropertiesPartProps
) {
    var [bookInformation, setBookInformation] = useState<any>({});

    axios.get("http://127.0.0.1:8000/books")
        .then((response) => {
            const bookData = response.data.find((book: any) => book.id === bookID);

            if (JSON.stringify(bookData) !== JSON.stringify(bookInformation)) {
                setBookInformation(bookData);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    
    
    return (
        <div
            id = "properties-part-in-book-page"
        >
            <div
                className = "container-in-book-page"
            >

                <img
                    id = "book-cover-in-book-page"
                    src = {bookInformation["image_url"]}
                    alt = "Book cover"
                />

                <h1
                    id = "book-title-in-book-page"
                >
                    {bookInformation["title"]}
                </h1>

                <h2
                    id = "book-author-in-book-page"
                >
                    {bookInformation["author"]}
                </h2>

            </div>

            <div
                className = "container-in-book-page"
            >
                <h1
                    className = "container-title-in-book-page"
                >
                    Location
                </h1>
                <p
                    className = "normal-text-detail-in-book-page"
                >
                    Current page
                    <div
                        id = "displayed-page-index-in-book-page"
                    >
                        {`${currentPage + 1}${((currentPage + 1 < bookInformation["total_pages"]) ? `, ${currentPage + 2}` : "")}`}
                        <button
                            className = "page-navigation-button-in-book-page"
                            disabled = {currentPage === 0}
                        >
                            {`<`}
                        </button>
                        <button
                            className = "page-navigation-button-in-book-page"
                            disabled = {currentPage === bookInformation["total_pages"] - 2}
                        >
                            {`>`}
                        </button>
                    </div>
                </p>
                
            </div>
            
        </div>
    );
}

function PagePairPart(
    {
        bookID,
        currentPage
    }: PagePairPartProps
) {

    

    return (
        <div
            id = "page-part-in-book-page"
        >
            <div
                id = "left-page-in-book-page"
                className = "displayed-page-in-book-page-container"
            >
                <div
                    className = "displayed-page-in-book-page"
                >
                </div>
            </div>
            <div
                id = "right-page-in-book-page"
                className = "displayed-page-in-book-page-container"
            >
                <div
                    className = "displayed-page-in-book-page"
                >
                </div>
            </div>
        </div>
    );
}

function InteractionPart(
    {
        bookID,
        userID
    }: InteractionPartProps
) {
    if (bookID === null || bookID === undefined) {
        return (
            <div
                id = "no-book-selected-message-in-book-page"
            >
                You have not selected a book to read yet. <br/>
                Please choose a book to read
            </div>
        );
    }

    var [currentPage, setCurrentPage] = useState<number>(1);

    axios.get(`http://127.0.0.1:8000/readingprocess/${userID}/${bookID}/`)
        .then((response) => {
            const newCurrentPage = response.data["current_page"];

            if (newCurrentPage !== currentPage) {
                setCurrentPage(newCurrentPage);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <>
            <PagePairPart
                bookID={bookID}
                currentPage={currentPage}
                />

            <PropertiesPart
                bookID = {bookID}
                currentPage = {currentPage}
            />
        </>
    );
}

export default function BookPage(
    {
        onSearchButtonClick,
        onPageOptionClick,
        bookID,
        userID
    }: BookPageProps
) {
    return (
        <div
            id = "book-page"
        >
            <TopHorizontalBar
                onSearchButtonClick = {onSearchButtonClick} 
            />

            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID.BOOK_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />

                <InteractionPart
                    bookID = {bookID}
                    userID = {userID}
                />

            </div>
        </div>
    );
}