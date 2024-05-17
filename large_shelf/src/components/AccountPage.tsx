import { Fragment, MouseEvent, useState } from "react";
import axios from "axios";
import PAGE_ID from "../PageID";
import "../styles/account_page_styles.css";
import VerticalPageBar from "./VerticalPageBar";
import TopHorizontalBar from "./TopHorizontalBar";
import openedEyeIcon from "../assets/opened_eye_icon.svg";
import closedEyeIcon from "../assets/closed_eye_icon.svg";
import defaultProfilePicture from "../assets/default_profile_picture.png";

interface AccountPageProps {
    onPageOptionClick: (pageID: number) => void;
    userID: string;
}

interface BriefProfileInformationPartProps {
    profilePicture: string;
    fullName: string;
}

interface DetailedProfileInformationPartProps {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    biography: string;
    userID: string;
    onPageOptionClick: (pageID: number) => void;
}

interface ProfileInformationPartProps {
    userID: string;
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
        biography,
        userID,
        onPageOptionClick
    }: DetailedProfileInformationPartProps
) {

    var [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

    /*
    var password: string = "This is not a password";

    if (passwordVisibility) {
       password = "I am the one who knocks!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    }
    */

    return (
        <div
            id = "detailed-information-part"
        >
            <button
                id = "request-save-modification-button"
                onClick = {

                    () => {
                        var profilePicture = document.getElementById("displayed-profile-picture") as HTMLImageElement;
                        var emailBox = document.getElementById("editable-email-box") as HTMLInputElement;
                        var firstNameBox = document.getElementById("editable-first-name-box") as HTMLInputElement;
                        var lastNameBox = document.getElementById("editable-last-name-box") as HTMLInputElement;
                        var phoneNumberBox = document.getElementById("editable-phone-number-box") as HTMLInputElement;
                        var biographyBox = document.getElementById("editable-biography-box") as HTMLTextAreaElement;

                        var requestData: any = {
                        };

                        requestData["reader_id"] = Number.parseInt(userID);
                        requestData["email"] = emailBox.value;

                        if (emailBox.value === "") {
                            requestData["email"] = emailBox.placeholder;
                        }

                        requestData["first_name"] = firstNameBox.value;
                        if (firstNameBox.value === "") {
                            requestData["first_name"] = firstNameBox.placeholder;
                        }

                        requestData["last_name"] = lastNameBox.value;
                        if (lastNameBox.value === "") {
                            requestData["last_name"] = lastNameBox.placeholder;
                        }

                        requestData["phone_number"] = phoneNumberBox.value;
                        if (phoneNumberBox.value === "") {
                            requestData["phone_number"] = phoneNumberBox.placeholder;
                        }

                        requestData["biography"] = biographyBox.value;
                        if (biographyBox.value === "") {
                            requestData["biography"] = biographyBox.placeholder;
                            if (biographyBox.placeholder === "") {
                                requestData["biography"] = "?";
                            }
                        }

                        requestData["avatar_url"] = profilePicture.src;
                        
                        requestData["page_count"] = 0;
                        requestData["font_size"] = 0;
                        requestData["font_style"] = "?";

                        axios.post(
                            "http://127.0.0.1:8000/readerinfo/",
                            requestData
                        )
                            .then(
                                response => {
                                    alert("Successfully saved your modification");
                                }
                            )
                            .catch(
                                error => {
                                    console.log(error);
                                }
                            );
                    }
                }
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
                    {/*
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
                    */}
                </div>

                <button
                    id = "change-password-button"
                    onClick={
                        () => {
                            onPageOptionClick(PAGE_ID.CHANGE_PASSWORD_PAGE);
                        }
                    }
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

function ProfileInformationPart(
    {
        userID,
        onPageOptionClick
    }: ProfileInformationPartProps
) {

    /*
    
        Send request to server to get user's information
    
    */

    var [userInformation, setUserInformation] = useState({
        "profilePicture": defaultProfilePicture,
        "fullName": "Default User",
        "firstName": "Default",
        "lastName": "User",
        "email": "defaultemail@gmail.com",
        "phoneNumber": "123456789",
        "biography": "This is a default user"
    });

    axios.get(`http://127.0.0.1:8000/readerinfo/id/${userID}/`)
        .then(
            response => {
                const newData = {
                    "profilePicture": response.data["avatar_url"],
                    "fullName": `${response.data["first_name"]} ${response.data["last_name"]}`,
                    "firstName": response.data["first_name"],
                    "lastName": response.data["last_name"],
                    "email": response.data["email"],
                    "phoneNumber": response.data["phone_number"],
                    "biography": response.data["bio"]
                };

                if (JSON.stringify(userInformation) !== JSON.stringify(newData)) {
                    setUserInformation(newData);
                }
            }
        )
        .catch(
            error => {
            }
        );


    return (
        <div
            id = "information-list-part"
        >
            <BriefProfileInformationPart
                profilePicture = {userInformation.profilePicture}
                fullName = {userInformation.fullName}
            />
            <DetailedProfileInformationPart
                firstName = {userInformation.firstName}
                lastName = {userInformation.lastName}
                email = {userInformation.email}
                phoneNumber = {userInformation.phoneNumber}
                biography = {userInformation.biography}
                userID = {userID}
                onPageOptionClick={onPageOptionClick}
            />
        </div>
    );
}

export default function AccountPage(
    {
        onPageOptionClick,
        userID
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
                
                <ProfileInformationPart
                    userID = {userID}
                    onPageOptionClick = {
                        onPageOptionClick
                    }
                />
            </div>
        </div>
    );
}
