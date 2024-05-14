import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/book_information_page_styles.css";
import duneCoverImage from "../assets/dune_cover_image.png";
import { EditableFiveStarRating } from "./EditableFiveStarRating";

interface BookInformationPageProps {
    onPageOptionClick: (pageID: number) => void;
    bookID: string;
}

function BookDescriptionPart(
    {
        bookID
    }: {
        bookID: string;
    }
) {

    /*
    
        Request the server for the book information
    
    */
    const bookCoverImage = duneCoverImage;
    const bookTitle = "Dune";
    const authorName = "Frank Herbert";
    const summary = `
        Following the destruction of House Atreides by House Harkonnen, Princess Irulan, the daughter of Padishah Emperor Shaddam IV, secretly journals that Paul Atreides may still be alive. On Arrakis, Stilgar's Fremen troops, including Paul and his pregnant mother, Lady Jessica, overcome a Harkonnen patrol. When Jessica and Paul reach Sietch Tabr, some Fremen suspect they are spies, while Stilgar and others see signs of the prophecy that a mother and son from the "Outer World" will bring prosperity to Arrakis.
    Stilgar tells Jessica that Sietch Tabr's Reverend Mother is dying and that Jessica must replace her by drinking the Water of Life — a poison fatal for males and the untrained. Jessica transmutes the poison, surviving and inheriting the memories of every female ancestor in her lineage. The liquid also prematurely awakens the mind of her unborn daughter, Alia, allowing Jessica to communicate with her. They agree to focus on convincing the more skeptical northern Fremen of the prophecy. Chani and her friend, Shishakli, believe the prophecy was fabricated to manipulate the Fremen. However, she begins to respect Paul after he declares that he only intends to fight alongside the Fremen, not to rule them.
    `;
    var [userRating, setUserRating] = useState(0);

    return (
        <div
            id = "book-description-part"
        >   
            <div
                id = "image-column-in-book-description-part"
            >
                <img

                    id = "book-cover-image-in-book-description-part"

                    src = {bookCoverImage}
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
                                if (starCount === userRating) {
                                    setUserRating(0);
                                } else {
                                    setUserRating(starCount);
                                }
                                /*
                                
                                    Request server to change user rating on this book
                                        0 - no rating
                                        1 - 1 star
                                        2 - 2 stars
                                        3 - 3 stars
                                        4 - 4 stars
                                        5 - 5 stars
                                
                                */
                            }
                        }
                    />
                </div>

            </div>

            <div
                id = "text-column-in-book-description-part"
            >
                <h1
                    id = "book-title-in-book-description-part"
                >
                    {bookTitle}
                </h1>

                <h2
                    id = "author-name-in-book-description-part"
                >
                    by {authorName} 
                </h2>

                <p
                    id = "book-summary-in-book-description-part"
                >
                    {summary}
                </p>
            </div>
        </div>
    )
}

export default function BookPage(
    {
        onPageOptionClick,
        bookID
    }: BookInformationPageProps
) {
    return (
        <div
            id = "book-page"
        >
            <TopHorizontalBar 
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

                <BookDescriptionPart
                    bookID = {bookID}
                />

            </div>
        </div>
    );
}