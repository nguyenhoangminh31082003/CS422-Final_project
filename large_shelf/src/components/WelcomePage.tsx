import { Fragment, MouseEvent, useState } from "react";
import "../styles/welcome_page_styles.css";
import StorageServer from "../StorageServer";
import logo from "../assets/large_shelf_logo.svg";
import decoration from "../assets/decoration_of_cover_of_books.svg";

interface HomePageProps {
    onSuccessfullLogin: (userID : string) => void;
    onRegistrationRequest: () => void;
}

interface LoginPartProps {
    onSuccessfullLogin: (userID : string) => void;
    onRegistrationRequest: () => void;
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
        onSuccessfullLogin,
        onRegistrationRequest
    } : LoginPartProps
) {
    var [displayedMessage, setDisplayedMessage] = useState<Array<String>>([]);

    return (
        <div 
            id = "login-part-in-welcome-page"
        >
            <div
                id = "login-title-in-welcome-page"
            >
                <h1
                    id = "application-name-in-welcome-page"
                >
                    Large Shelf
                </h1>
                <h2
                    id = "welcome-message-in-welcome-page"
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
                        
                        StorageServer.login(
                            email, 
                            password,
                            (response) => {
                                if (response.status == 200) {
                                    onSuccessfullLogin(response.data["user_id"].toString());
                                }
                            },
                            (error) => {
                                if (error.response) {
                                    if (error.response.status == 404) {
                                        setDisplayedMessage([
                                            "The username or password is incorrect.",
                                            "Please try again."
                                        ]);
                                    } else {
                                        setDisplayedMessage([
                                            "There is something wrong in the process of logging in.",
                                            "Please try again."
                                        ]);
                                    }
                                }
                            }
                        );            
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
                        onRegistrationRequest();
                    }
                }
            >
                Sign up
            </button>
            <div
                id = "server-response-message-in-welcome-page"
            >
                {
                    displayedMessage.map((message, index) => {
                        return (
                            <p>{message}</p>
                        );
                    })
                }
            </div>
            
        </div>
    );
}

export default function WelcomePage(
    {
        onSuccessfullLogin,
        onRegistrationRequest
    } : HomePageProps
) {
    return (
        <div
            id = "welcome-page"
        >
            <CoverPart />
            <LoginPart 
                onSuccessfullLogin = {onSuccessfullLogin}
                onRegistrationRequest = {onRegistrationRequest}
            />
        </div>
    )
}