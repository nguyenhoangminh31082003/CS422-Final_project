import { Fragment } from "react";
import { MouseEvent } from "react";
import { useState } from "react";
import logo from "../assets/large_shelf_logo.svg";
import decoration from "../assets/decoration_of_cover_of_books.svg";
import "../styles/welcome_page_styles.css";

interface HomePageProps {
    onSucessfullLogin: (userID : string) => void;
}

interface LoginPartProps {
    onSucessfullLogin: (userID : string) => void;
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

function LoginPart(
    {
        onSucessfullLogin
    } : LoginPartProps
) {
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
                onClick = {
                    (event : MouseEvent<HTMLButtonElement>) => {
                        var email = (document.getElementById("email-input-box") as HTMLInputElement).value;
                        var password = (document.getElementById("password-input-box") as HTMLInputElement).value;
                        /*
                        
                        Ask server to check email and password
                        If password is correct, then 
                            ask server to return the user ID of the email account  
                            the current page than becomes home page 
                        */
                        console.log("Email: " + email);
                        console.log("Password: " + password);
                        onSucessfullLogin("1");
                    }
                }
            >
                Login
            </button>

            <button 
                type="button"
                id = "sign-up-button"
                className = "noticeable-button"
                onClick={
                    (event : MouseEvent<HTMLButtonElement>) => {
                        /*
                        The current page than becomes sign up page
                        */
                    }
                }
            >
                Sign up
            </button>
            
        </div>
    );
}

function WelcomePage(
    {
        onSucessfullLogin
    } : HomePageProps
) {
    return (
        <div
            className = "welcome-page"
        >
            <CoverPart />
            <LoginPart 
                onSucessfullLogin = {onSucessfullLogin}
            />
        </div>
    )
}

export default WelcomePage;