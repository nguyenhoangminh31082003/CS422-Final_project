"use client";

import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import PAGE_ID from "../PageID";
import "../styles/home_page_styles.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import currentReadingShelfDemoBookCoverImage from "../assets/current_reading_shelf_demo_book_cover_image.png";
import wantToReadShelfDemoBookCoverImage from "../assets/want_to_read_shelf_demo_book_cover_image.png";
import readShelfDemoBookCoverImage from "../assets/read_shelf_demo_book_cover_image.png";

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
    console.log("Debug!!!");
    return (
        <button>    
            {shelfName}
        </button>
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

async function fetchShelfOption(
    page: number
) {
    /*
    
        Request server to get the page-th earliest-created shelf option.

    */
    console.log("Fetching page " + page + "...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return demoShelfOptionList[page - 1];
}

function ShelfListPart() {
    console.log("Hello");

    const {
        data,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["query"],
        queryFn: async ({pageParam = 1}) => {
            const response = await fetchShelfOption(pageParam);
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            return allPages.length + 1;
        },
        initialPageParam: 1
    });

    return (
        <div
            id = "shelf-list-part"
        >
                {
                    data?.pages.map((page, i) => {
                        return (
                            <ShelfOption 
                                imageLinkOfBookInShelf = {page.imageLinkOfBookInShelf}
                                shelfName = {page.shelfName}
                                mostRecentBookInformation = {page.mostRecentBookInformation}
                                lastUpdateDate = {page.lastUpdateDate}
                                bookCount = {page.bookCount}
                            />
                        )
                    })
                }
                <button
                    onClick = {
                        () => fetchNextPage()
                    }
                    disabled = {
                        isFetchingNextPage
                    }>
                    {
                        isFetchingNextPage
                        ? "Loading more..."
                        : ((data?.pages.length ?? 0) < demoShelfOptionList.length)
                        ? "Load more"
                        : "Nothing more to load"
                    }
                </button>
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