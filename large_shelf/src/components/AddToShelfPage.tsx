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
}

interface AddToShelfPartProps {
    onPageOptionClick: (pageID: number) => void;
    bookID: string;
}

function AddToShelfPart(
    {
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
                <h1>
                    Choose your shelf
                </h1>
            </div>

            
        </div>
    );
}

export default function AddToShelfPage(
    {
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
                />
            </div>
        </div>
    );
}
