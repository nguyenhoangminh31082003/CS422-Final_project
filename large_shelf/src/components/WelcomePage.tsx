import { Fragment } from "react";
import { MouseEvent } from "react";
import { useState } from "react";
import logo from "../assets/large_shelf_logo.svg";
import decoration from "../assets/decoration_of_cover_of_books.svg";
import "../styles/welcome_page_styles.css";

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

function LoginPart() {
    return (
        <div 
            className = "login-part"
        >
            <div
                className = "login-title"
            >
                <h1
                    className = "application-name"
                >
                    Large Shelf
                </h1>
                <h2
                    className = "welcome-message"
                >
                    Welcome to Large Shelf! <br/>
                </h2>
            </div>

            <input
                id = "email-input-box"
                className = "input-box"
                placeholder = "Email"
                type = "email"
            />

            <input
                id = "password-input-box"
                className = "input-box"
                placeholder = "Password"
                type = "password"
            />

            <button 
                type="button"
                id = "forgot-password-button"
            >
                Forgot your password?
            </button>

            <button 
                type="button"
                id = "login-button"
                className = "noticeable-button"
            >
                Login
            </button>

            <button 
                type="button"
                id = "sign-up-button"
                className = "noticeable-button"
            >
                Sign up
            </button>
            
        </div>
    );
}

function WelcomePage() {
    return (
        <div
            className = "welcome-page"
        >
            <CoverPart />
            <LoginPart />
        </div>
    )
}

export default WelcomePage;