import { Fragment, MouseEvent, useState } from "react";
import PAGE_ID from "../PageID";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import "../styles/change_password_page_styles.css";
import defaultProfilePicture from "../assets/default_profile_picture.png";

interface ChangePasswordPageProps {
    onPageOptionClick: (pageID: number) => void;
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

function DetailedProfileInformationPart(
    {
        firstName,
        lastName,
        email,
        phoneNumber,
        biography
    }: DetailedProfileInformationPartProps
) {

    var [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

    var password: string = "This is not a password";

    if (passwordVisibility) {
        /*
        
            Request server to get plaintext password
        
        */
       password = "I am the one who knocks!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    }

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
                        placeholder={firstName}
                    />

                </div>


                <div
                    id = "last-name-container"
                    className = "profile-information-container"
                >
                    <div
                        className = "profile-information-label"
                    >
                        Last name
                    </div>

                    <input
                        type = "text"
                        id = "editable-last-name-box"
                        className = "editable-profile-box"
                        placeholder={lastName}
                    />

                </div>
            </div>

            <div
                id = "contact-information-row"
            >
                <div
                    id = "email-container"
                    className = "profile-information-container"
                >
                    <div
                        className = "profile-information-label"
                    >
                        Email
                    </div>

                    <input
                        type = "text"
                        id = "editable-email-box"
                        className = "editable-profile-box"
                        placeholder={email}
                    />

                </div>


                <div
                    id = "phone-number-container"
                    className = "profile-information-container"
                >
                    <div
                        className = "profile-information-label"
                    >
                        Phone number
                    </div>

                    <input
                        type = "text"
                        id = "editable-phone-number-box"
                        className = "editable-profile-box"
                        placeholder={phoneNumber}
                    />

                </div>
            </div>

            <div
                id = "password-information-row"
            >
                
                <div
                    id = "password-container"
                    className = "profile-information-container"
                >
                    <div
                        className = "profile-information-label"
                    >
                        Password
                    </div>

                    <div
                        id = "displayed-password-field"
                        style = {{
                            fontStyle: passwordVisibility ? "normal" : "italic"
                        }}
                    >
                        <input
                            id = "password-field-text-part"
                            type = "text"
                            readOnly = {true}
                            style = {{
                                fontStyle: passwordVisibility ? "normal" : "italic",
                                opacity: passwordVisibility ? 1 : 0.8
                            }}
                            value = {passwordVisibility ? password : "Hidden"}
                        />

                        <button
                            id = "password-visibility-button"
                            onClick = {
                                (event: MouseEvent<HTMLButtonElement>) => {
                                    setPasswordVisibility(!passwordVisibility);
                                }
                            }
                        >
                            <img
                                src = {passwordVisibility ? openedEyeIcon : closedEyeIcon}
                                alt = "Password Visibility"
                            />
                        </button>
                        
                    </div>

                </div>

                <button
                    id = "change-password-button"
                >
                    Change password
                </button>

            </div>

            <div
                id = "biography-information-row"
            >
                <div
                    id = "biography-container"
                    className = "profile-information-container"
                >
                    <div
                        id = "biography-information-label"
                    >
                        Biography
                    </div>

                    <textarea
                        id = "editable-biography-box"
                        placeholder={biography}
                    >
                    </textarea>

                </div>
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
            <DetailedProfileInformationPart
                firstName = {information.firstName}
                lastName = {information.lastName}
                email = {information.email}
                phoneNumber = {information.phoneNumber}
                biography = {information.biography}
            />
        </div>
    );
}

export default function ChangePasswordPage(
    {
        onPageOptionClick
    }: ChangePasswordPageProps
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
