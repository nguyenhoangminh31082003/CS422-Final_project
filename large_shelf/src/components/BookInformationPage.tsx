import { Fragment, MouseEvent, useState } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/book_information_page_styles.css";
import { EditableFiveStarRating } from "./EditableFiveStarRating";

interface BookInformationPageProps {
    onSearchButtonClick: (searchQuery: string) => void;
    onAddToShelfButtonClick: (bookID: string) => void;
    onReadButtonClick: (bookID: string) => void;
    onPageOptionClick: (pageID: number) => void;
    userID: string;
    bookID: string;
}

interface BookDescriptionPartProps {
    onReadButtonClick: (bookID: string) => void;
    onAddToShelfButtonClick: (bookID: string) => void;
    userID: string;
    bookID: string;
}

function BookDescriptionPart(
    {
        onReadButtonClick,
        onAddToShelfButtonClick,
        userID,
        bookID
    }: BookDescriptionPartProps
) {
    var [bookInformation, setBookInformation] = useState({
        "bookCoverImage": "",
        "bookTitle": "",
        "authorName": "",
        "summary": ""
    });

    axios.get(`http://127.0.0.1:8000/books/${bookID}/`)
        .then((response) => {
                const bookData = {
                    "bookCoverImage": response.data["image_url"],
                    "bookTitle": response.data["title"],
                    "authorName": response.data["author"],
                    "summary": response.data["summary"]
                };
            if (JSON.stringify(bookInformation) !== JSON.stringify(bookData)) {
                setBookInformation(bookData);
            }
        })
        .catch((error) => {
            
        });

    var [userRating, setUserRating] = useState(0);

    axios.get(`http://127.0.0.1:8000/ratings/${userID}/${bookID}/`)
        .then((response) => {
            const rating = response.data["rating"];
            if (rating !== userRating) {
                setUserRating(rating);
            }
        })
        .catch((error) => {
            
        });

    return (
        <div
            id = "book-description-part"
        >   
            <div
                id = "image-column-in-book-description-part"
            >
                <img

                    id = "book-cover-image-in-book-description-part"

                    src = {bookInformation["bookCoverImage"]}
                />

                <div
                    id = "user-rating-row-in-book-description-part"
                >
                    Your rating

                    <EditableFiveStarRating
                        id = "user-rating-in-book-description-part"
                        starCount = {userRating}
                        onStarClick={
                            (starCount: number) => {

                                var newStartCount = starCount;

                                if (starCount === userRating) {
                                    newStartCount = 0;
                                } else {
                                    newStartCount = starCount;
                                }

                                setUserRating(newStartCount);

                                axios.post("http://127.0.0.1:8000/ratings/", {
                                    "user_id": Number.parseInt(userID),
                                    "book_id": Number.parseInt(bookID),
                                    "rating": newStartCount
                                })
                                .then((response) => {
                                    console.log(response);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            }
                        }
                    />
                </div>

                <button
                    id = "add-to-shelf-button-in-book-information-page"
                    onClick = {
                        () => {
                            onAddToShelfButtonClick(bookID);
                        }
                    }
                >
                    Add to shelf
                </button>

                <button
                    id = "read-button-in-book-information-page"
                    onClick = {
                        () => {
                            onReadButtonClick(bookID);
                        }
                    }
                >
                    Read
                </button>

            </div>

            <div
                id = "text-column-in-book-description-part"
            >
                <h1
                    id = "book-title-in-book-description-part"
                >
                    {bookInformation["bookTitle"]}
                </h1>

                <h2
                    id = "author-name-in-book-description-part"
                >
                    by {bookInformation["authorName"]} 
                </h2>

                <p
                    id = "book-summary-in-book-description-part"
                >
                    {bookInformation["summary"]}
                </p>
            </div>
        </div>
    )
}

export default function BookInformationPage(
    {
        onAddToShelfButtonClick,
        onSearchButtonClick,
        onReadButtonClick,
        onPageOptionClick,
        userID,
        bookID
    }: BookInformationPageProps
) {

    return (
        <div
            id = "book-information-page"
        >
            <TopHorizontalBar 
                onSearchButtonClick = {onSearchButtonClick}
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

                <BookDescriptionPart
                    bookID = {bookID}
                    userID = {userID}
                    onAddToShelfButtonClick = {
                        onAddToShelfButtonClick
                    }
                    onReadButtonClick = {
                        onReadButtonClick
                    }
                />

            </div>
        </div>
    );
}