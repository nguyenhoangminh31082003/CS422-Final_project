import { Fragment, MouseEvent, useState } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/add_to_shelf_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import backButtonIcon from "../assets/back_button_icon.svg";

interface AddToShelfPageProps {
    onPageOptionClick: (pageID: number) => void;
    bookID: string;
    userID: string;
}

interface AddToShelfPartProps {
    onPageOptionClick: (pageID: number) => void;
    bookID: string;
    userID: string;
}

function AddToShelfPart(
    {
        userID,
        bookID,
        onPageOptionClick
    }: AddToShelfPartProps
) {
    var [bookInformation, setBookInformation] = useState({
        "bookCoverImage": "",
        "bookTitle": "",
        "authorName": "",
        "summary": ""
    });

    var [allShelves, setAllShelves] = useState<any[]>([]);

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

    axios.get(`http://127.0.0.1:8000/shelves-containing-book/${userID}/${bookID}/`)
        .then((response) => {
            if (JSON.stringify(response.data) !== JSON.stringify(allShelves)) {
                setAllShelves(response.data);
            }
        })
        .catch((error) => { 
        });

    //console.log(allShelves);

    return (
        <div
            id = "add-to-shelf-part"
        >   
            <div
                id = "book-information-part-in-add-to-shelf-page"
            >
                <img

                    id = "book-cover-image-in-add-to-shelf-page"

                    src = {bookInformation["bookCoverImage"]}
                />

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

            <div
                id = "shelf-option-list-in-add-to-shelf-page"
            >
                <h1
                    style = {
                        {
                            "fontWeight": "bold",
                        }
                    }
                >
                    Choose your shelf
                </h1>

                <form
                    id = "shelf-option-form-in-add-to-shelf-page"
                >
                    {
                        allShelves.map((shelf) => {
                            return (
                                <Fragment
                                    key = {shelf["shelf_id"]}
                                >
                                    <button
                                        className = "shelf-option-button"
                                    >
                                        {shelf["shelf_name"]}
                                    </button>
                                </Fragment>
                            );
                        })
                    }
                </form>
            </div>

            
        </div>
    );
}

export default function AddToShelfPage(
    {
        userID,
        bookID,
        onPageOptionClick
    }: AddToShelfPageProps
) {
    return (
        <div
            id = "add-to-shelf-page"
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

                <AddToShelfPart
                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    bookID = {bookID}

                    userID = {userID}
                />
            </div>
        </div>
    );
}
