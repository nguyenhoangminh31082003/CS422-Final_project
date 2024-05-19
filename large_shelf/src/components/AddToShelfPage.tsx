import { Fragment, MouseEvent, useState } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/add_to_shelf_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import backButtonIcon from "../assets/back_button_icon.svg";
import StorageServer from "../StorageServer";

interface AddToShelfPageProps {
    onSearchButtonClick: (searchText: string) => void;
    onPageOptionClick: (pageID: number) => void;
    onBackButtonClick: () => void;
    bookID: string;
    userID: string;
}

interface AddToShelfPartProps {
    onPageOptionClick: (pageID: number) => void;
    onBackButtonClick: () => void;
    bookID: string;
    userID: string;
}

function AddToShelfPart(
    {
        userID,
        bookID,
        onPageOptionClick,
        onBackButtonClick
    }: AddToShelfPartProps
) {
    var [bookInformation, setBookInformation] = useState({
        "bookCoverImage": "",
        "bookTitle": "",
        "authorName": "",
        "summary": ""
    });

    var [allChosenShelves, setAllChosenShelves] = useState<any[]>([]);
    var [allShelves, setAllShelves] = useState<any[]>([]);

    StorageServer.getShelvesOfUser(
        userID,
        (response) => {
            if (JSON.stringify(allShelves) !== JSON.stringify(response.data)) {
                setAllShelves(response.data);
            }
        }
    );

    StorageServer.getBookInformation(
        bookID,
        (response) => {
            const bookData = {
                "bookCoverImage": response.data["image_url"],
                "bookTitle": response.data["title"],
                "authorName": response.data["author"],
                "summary": response.data["summary"]
            };
        if (JSON.stringify(bookInformation) !== JSON.stringify(bookData)) {
            setBookInformation(bookData);
        }
    });

    StorageServer.getListOfShelvesContainingGivenBook(
        userID,
        bookID,
        (response) => {
            if (JSON.stringify(response.data) !== JSON.stringify(allChosenShelves)) {
                setAllChosenShelves(response.data);
            }
        }
    );

    return (
        <div
            id = "add-to-shelf-part"
        >   

            <button
                id = "back-button-in-add-to-shelf-page"
                onClick = {
                    onBackButtonClick
                }
            >
                <img
                    id = "back-button-icon-in-add-to-shelf-page"
                    src = {backButtonIcon}
                    alt = "Back"
                />
            </button>

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
                            if (allChosenShelves.some((chosenShelf) => chosenShelf["id"] === shelf["id"]))
                                return (
                                    <>
                                        <input 
                                            type = "checkbox"
                                            id = {`shelf-option-checkbox-${shelf["id"]}`}
                                            className = "shelf-option-checkbox"
                                            
                                            onChange={
                                                (event) => {
                                                    if (event.target.checked) {
                                                        StorageServer.addBookToShelf(
                                                            userID,
                                                            bookID,
                                                            shelf["id"],
                                                            (response) => {
                                                                allChosenShelves.push({
                                                                    "id": shelf["id"],
                                                                });
                                                            }
                                                        )
                                                    } else {
                                                        axios.delete(`https://mybackend-project-cs422-version6.onrender.com/addedbook/delete/${shelf["id"]}/${userID}/${bookID}/`)
                                                        .then((response) => {
                                                            setAllChosenShelves(allChosenShelves.filter((chosenShelf) => chosenShelf["id"] !== shelf["id"]));
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                        });
                                                    }
                                                }
                                            }
                                            checked = {true}
                                        />
                                        <label
                                            htmlFor={`shelf-option-checkbox-${shelf["id"]}`}
                                            className = "shelf-option-label-in-add-to-shelf-page"
                                        > 
                                            {shelf["name"]}
                                        </label>
                                        <br/>
                                    </>
                                );

                           
                            return (
                                <>
                                    <input 
                                        type = "checkbox"
                                        id = {`shelf-option-checkbox-${shelf["id"]}`}
                                        className = "shelf-option-checkbox"
                                        
                                        onChange={
                                            (event) => {
                                                if (event.target.checked) {
                                                    axios.post(`https://mybackend-project-cs422-version6.onrender.com/addedbooks/`, {
                                                        "shelf_id": shelf["id"],
                                                        "user_id": userID,
                                                        "book_id": bookID
                                                    })
                                                    .then((response) => {
                                                        allChosenShelves.push({
                                                            "id": shelf["id"],
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                                } else {
                                                    axios.delete(`https://mybackend-project-cs422-version6.onrender.com/addedbook/delete/${shelf["id"]}/${userID}/${bookID}/`)
                                                    .then((response) => {
                                                        setAllChosenShelves(allChosenShelves.filter((chosenShelf) => chosenShelf["id"] !== shelf["id"]));
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                                }
                                            }
                                        }
                                    />
                                    <label
                                        htmlFor={`shelf-option-checkbox-${shelf["id"]}`}
                                        className = "shelf-option-label-in-add-to-shelf-page"
                                    > 
                                        {shelf["name"]}
                                    </label>
                                    <br/>
                                </>
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
        onPageOptionClick,
        onBackButtonClick,
        onSearchButtonClick
    }: AddToShelfPageProps
) {
    return (
        <div
            id = "add-to-shelf-page"
        >
            <TopHorizontalBar 
                onSearchButtonClick={
                    onSearchButtonClick
                }
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

                    onBackButtonClick = {
                        onBackButtonClick
                    }
                />
            </div>
        </div>
    );
}
