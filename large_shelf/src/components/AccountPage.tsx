import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import PAGE_ID from "../PageID";
import "../styles/account_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";

interface AccountPageProps {
    onPageOptionClick: (pageID: number) => void;
}

function AccountPage(
    {
        onPageOptionClick
    }: AccountPageProps
) {
    return (
        <div
            id = "account-page"
        >
            <TopHorizontalBar 
        
            />
            <div
                id = "content-part"
            >
                <VerticalPageBar
                    chosenPageID = {
                        PAGE_ID.ACCOUNT_PAGE
                    }
                    onOptionClick = {
                        onPageOptionClick    
                    }
                />
                <div
                    id = "shelf-list-part"
                >
                    <h1>Shelf List Part</h1>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;