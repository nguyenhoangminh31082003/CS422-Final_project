import { Fragment, MouseEvent, useState } from "react";
import "../styles/registration_page_styles.css";
import logo from "../assets/large_shelf_logo.svg";
import decoration from "../assets/decoration_of_cover_of_books.svg";

interface RegistrationPageProps {
    onSuccessfullRegistration: (userID : string) => void;
    onLoginRequest: () => void;
}

interface RegistrationPartProps {
    onSuccessfullRegistration: (userID : string) => void;
    onLoginRequest: () => void;
}

function CoverLogo() {
    return (<img 
        className = "cover-logo"
        src = {logo}
        alt = "Large Shelf Logo"
    />);
}

function CoverTitle() {
    return (<h1 
        className = "cover-title"
    >
            You can read your favorite books here, <br/>
        or listen to them read by your preference of voices
    </h1>);
}

function CoverDecoration() {
    return (
        <img
            className = "cover-decoration"
            src = {decoration}
            alt = "Cover Decoration"
        />
    );
}

function CoverPart() {
    return (<div 
        className = "cover-part"
    >
        <CoverLogo />
        <CoverTitle />
        <CoverDecoration />
    </div>);
}

function RegistrationPart(
    {
        onSuccessfullRegistration,
        onLoginRequest
    } : RegistrationPartProps
) {
    return (
        <div 
            id = "registration-part"
        >
            <div
                id = "registration-title"
            >
                <h1
                    id = "application-name"
                >
                    Large Shelf
                </h1>
                <h2
                    id = "title-message"
                >
                    Let create your account!
                </h2>
            </div>

            <form
                id = "registration-form"
            >
                <label
                    className = "registration-fill-label"
                >
                    Please enter your email 
                </label><br/>
                <input
                    id = "user-email-input-box"
                    className = "registration-input-box"
                    placeholder = "Email"
                    type = "email"
                />

                <label
                    className = "registration-fill-label"
                >
                    Please create your password 
                </label><br/>
                <input
                    id = "first-password-input-box"
                    className = "registration-input-box"
                    placeholder = "Password"
                    type = "password"
                />

                <label
                    className = "registration-fill-label"
                >
                    Please re-enter your password 
                </label><br/>
                <input
                    id = "second-password-input-box"
                    className = "registration-input-box"
                    placeholder = "Password"
                    type = "password"
                />
            
            </form>

            <button 
                type="button"
                id = "register-button"
                className = "noticeable-button"
                onClick={
                    (event : MouseEvent<HTMLButtonElement>) => {
                    }
                }
            >
                Register
            </button>

            <button 
                type="button"
                id = "login-button"
                className = "noticeable-button"
                onClick = {
                    (event : MouseEvent<HTMLButtonElement>) => {
                        onLoginRequest();
                    }
                }
            >
                Already have an account? Let log in!
            </button>
            
        </div>
    );
}

export default function RegistrationPage(
    {
        onSuccessfullRegistration,
        onLoginRequest
    } : RegistrationPageProps
) {
    return (
        <div
            id = "registration-page"
        >
            <CoverPart />
            <RegistrationPart 
                onSuccessfullRegistration = {onSuccessfullRegistration}
                onLoginRequest = {onLoginRequest}
            />
        </div>
    )
}