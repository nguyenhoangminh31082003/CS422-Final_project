import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/book_information_page_styles.css";

interface BookInformationPageProps {
    onPageOptionClick: (pageID: number) => void;
    bookID: string;
}

export default function BookInformationPage(
    {
        onPageOptionClick,
        bookID
    }: BookInformationPageProps
) {
    return (
        <Fragment>
            <div>
                Comming soon
            </div>
        </Fragment>
    );
}