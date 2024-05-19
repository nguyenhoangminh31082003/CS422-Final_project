import { Fragment, MouseEvent, useState } from "react";
import StorageServer from "../StorageServer";
import "../styles/registration_page_styles.css";
import logo from "../assets/large_shelf_logo.svg";
import decoration from "../assets/decoration_of_cover_of_books.svg";

interface RegistrationPageProps {
    onSuccessfullRegistration: (data: any) => void;
    onLoginRequest: () => void;
}

interface RegistrationPartProps {
    onSuccessfullRegistration: (data: any) => void;
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
    var [displayedMessage, setDisplayedMessage] = useState<Array<string>>([]);

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
                    className = "registration-field-label"
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
                    className = "registration-field-label"
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
                    className = "registration-field-label"
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
                        var email = (document.getElementById("user-email-input-box") as HTMLInputElement).value;
                        var password1 = (document.getElementById("first-password-input-box") as HTMLInputElement).value;
                        var password2 = (document.getElementById("second-password-input-box") as HTMLInputElement).value;

                        if (password1 !== password2) {
                            setDisplayedMessage(["Passwords do not match!"]);
                            return;
                        }

                        if (email.length <= 0) {
                            setDisplayedMessage(["Email is empty!"]);
                            return;
                        }

                        if (password1.length <= 0) {
                            setDisplayedMessage(["Password is empty!"]);
                            return;
                        }

                        StorageServer.registerNewUser(
                            email, 
                            password1,
                            (response => {
                                if (response.status == 201) {
                                    onSuccessfullRegistration({});
                                }
                            }),
                            error => {
                                console.log(error.response);
                                if (error.response) {
                                    if (error.response.status == 400) {
                                        setDisplayedMessage([
                                            "The username or password is not valid.",
                                            "Please try again."
                                        ]);
                                    } else {
                                        setDisplayedMessage([
                                            "There is something wrong in the process of registering account.",
                                            "Please try again."
                                        ]);
                                    }
                                }
                            }
                        );
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