import { Fragment } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import PAGE_ID from "../PageID";
import "../styles/account_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import defaultProfilePicture from "../assets/default_profile_picture.png";

interface AccountPageProps {
    onPageOptionClick: (pageID: number) => void;
}

interface BriefProfileInformationPartProps {
    profilePicture: string;
    fullName: string;
}

function BriefProfileInformationPart(
    {
        profilePicture,
        fullName
    }: BriefProfileInformationPartProps
) {
    return (
        <div
            id = "brief-information-part"
        >
            <img
                src = {profilePicture}
                alt = "Profile Picture"
                id = "displayed-profile-picture"
            />
            <div
                id = "displayed-full-name"
            >
                {fullName}
            </div>
        </div>
    );
}

function DetailedProfileInformationPart() {
    return (
        <div
            id = "detailed-information-part"
        >
            <button
                id = "request-save-modification-button"
            >
                Save your modification
            </button>

            <div
                id = "name-information-row"
            >
                <div
                    id = "first-name-container"
                    className = "profile-information-container"
                >
                    <div
                        className = "profile-information-label"
                    >
                        First name
                    </div>

                    <input
                        type = "text"
                        id = "editable-first-name-box"
                        className = "editable-profile-box"
                    />

                </div>
            </div>

            <div
                id = "contact-information-row"
            >

            </div>

            <div
                id = "password-information-row"
            >

            </div>

            <div
                id = "biography-information-row"
            >

            </div>
        </div>
    )
}

function ProfileInformationPart() {

    /*
    
        Send request to server to get user's information
    
    */

    var information = {
        profilePicture: defaultProfilePicture,
        fullName: "Nakahara Hiroshi",
        firstName: "Hiroshi",
        lastName: "Nakahara",
        email: "deadlinesarecommingfromeverydirections@gmail.com",
        phoneNumber: "0123456789",
        password: null,
        biography: "I am not in danger. I am the danger. I am the one who knocks!!!"
    };


    return (
        <div
            id = "information-list-part"
        >
            <BriefProfileInformationPart
                profilePicture = {information.profilePicture}
                fullName = {information.fullName}
            />
            <DetailedProfileInformationPart/>
        </div>
    );
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
                <ProfileInformationPart/>
            </div>
        </div>
    );
}

export default AccountPage;