"use client";

import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import PAGE_ID from "../PageID";
import "../styles/home_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import InfinieScroll from "react-infinite-scroll-component";
import readShelfDemoBookCoverImage from "../assets/read_shelf_demo_book_cover_image.png";
import wantToReadShelfDemoBookCoverImage from "../assets/want_to_read_shelf_demo_book_cover_image.png";
import currentReadingShelfDemoBookCoverImage from "../assets/current_reading_shelf_demo_book_cover_image.png";

interface HomePageProps {
    onPageOptionClick: (pageID: number) => void;
}

interface ShelfOptionProps {
    imageLinkOfBookInShelf: string;
    shelfName: string;
    mostRecentBookInformation: {
        bookName: string;
        authorName: string;
    },
    lastUpdateDate: Date;
    bookCount: number;
}

function ShelfOption(
    {
        imageLinkOfBookInShelf,
        shelfName,
        mostRecentBookInformation,
        lastUpdateDate,
        bookCount
    }: ShelfOptionProps
) {
    return (
        <div>    
            {shelfName}
        </div>
    );
}

const demoShelfOptionList = [
    {
        imageLinkOfBookInShelf: currentReadingShelfDemoBookCoverImage,
        shelfName: "Current Reading",
        mostRecentBookInformation: {
            bookName: "Dune",
            authorName: "Frank Herbert"
        },
        lastUpdateDate: new Date("2024-03-26"),
        bookCount: 2
    },
    {
        imageLinkOfBookInShelf: wantToReadShelfDemoBookCoverImage,
        shelfName: "Want to Read",
        mostRecentBookInformation: {
            bookName: "War and Peace",
            authorName: "Leo Tolstoy"
        },
        lastUpdateDate: new Date("2024-03-25"),
        bookCount: 263
    },
    {
        imageLinkOfBookInShelf: readShelfDemoBookCoverImage,
        shelfName: "Read",
        mostRecentBookInformation: {
            bookName: "The Lord of the Rings",
            authorName: "J.R.R. Tolkien"
        },
        lastUpdateDate: new Date("2021-10-29"),
        bookCount: 5
    }
]

function ShelfListPart() {
    const style = {
        border: "1px solid red",
        margin: 12,
        padding: 8
    }

    /*
        Request the number of shelves from the server
    */
    const numberOfShelves = 200;

    var [shelfOptionList, setShelfOptionList] = useState(Array.from({length: 20}));
    var [hasMore, setHasMore] = useState(true);

    console.log(shelfOptionList.length);

    return (
        <div
            id = "shelf-list-part"
        >
            <InfinieScroll
                
                dataLength = {
                    shelfOptionList.length 
                }

                next = {
                    () => {
                        console.log("next");
                        if (shelfOptionList.length < numberOfShelves) {
                            setTimeout(() => {
                                setShelfOptionList(
                                    shelfOptionList.concat(Array.from({length: 1})) 
                                );
                                console.log(shelfOptionList.length);
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

                scrollableTarget = "shelf-list-part"
            >   
                {
                    shelfOptionList.map((item, index) => {
                        console.log(index);
                        
                        return <div
                            style = {style}
                        >
                            #{index + 1}-th item
                        </div>
                    })
                }
            </InfinieScroll>
        </div>
    );
}

function HomePage(
    {
        onPageOptionClick
    }: HomePageProps
) {
    return (
        <div
            id = "home-page"
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
                <ShelfListPart/>
            </div>
        </div>
    );
}

export default HomePage;