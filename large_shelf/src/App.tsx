import { useState } from 'react';
import PAGE_ID from './PageID';
import BookPage from './components/BookPage';
import HomePage from './components/HomePage';
import VoicePage from './components/VoicePage';
import ShelfPage from './components/ShelfPage';
import LibraryPage from './components/LibraryPage';
import AccountPage from './components/AccountPage';
import WelcomePage from './components/WelcomePage';
import RegistrationPage from './components/RegistrationPage';
import ChangePasswordPage from './components/ChangePasswordPage';

function App() {
    const [pageID, setPageID] = useState(PAGE_ID["WELCOME_PAGE"]);
    const [userID, setUserID] = useState(null as string | null);
    const [otherData, setOtherData] = useState(null as any | null);
    
    if (pageID === PAGE_ID["WELCOME_PAGE"]) {
        return (
            <WelcomePage 
                onSuccessfullLogin = {
                    (currentUserID : string) => {
                        setPageID(PAGE_ID["HOME_PAGE"]);
                        setUserID(currentUserID);
                    }
                }

                onRegistrationRequest = {
                    () => {
                        setPageID(PAGE_ID["REGISTRATION_PAGE"]);
                    }
                }
            />
        );
    } else if (pageID == PAGE_ID["HOME_PAGE"]) {
        return (
            <HomePage 
                onPageOptionClick = {
                    (pageID: number) => {
                        setPageID(pageID);
                    }
                }
                onShelfOptionClick = {
                    (shelfID: string) => {
                        setPageID(PAGE_ID["SHELF_PAGE"]);
                        setOtherData({
                            shelfID: shelfID
                        });
                    }
                }
            />
        );
    } else if (pageID == PAGE_ID["REGISTRATION_PAGE"]) {
        return (
            <RegistrationPage 
                onSuccessfullRegistration = {
                    (currentUserID : string) => {
                    setPageID(PAGE_ID["HOME_PAGE"]);
                    setUserID(currentUserID);
                    }
                }
        
                onLoginRequest = {
                    () => {
                    setPageID(PAGE_ID["WELCOME_PAGE"]);
                    }
                }
            />
        );
    } else if (pageID == PAGE_ID["VOICE_PAGE"]) {
        return (
                <VoicePage />
        );
    } else if (pageID == PAGE_ID["LIBRARY_PAGE"]) {
        return (
                <LibraryPage />
        );
    } else if (pageID == PAGE_ID["BOOK_PAGE"]) {
        return (
                <BookPage />
        );
    } else if (pageID == PAGE_ID["ACCOUNT_PAGE"]) {
        return (
                <AccountPage 
                    onPageOptionClick = {
                        (pageID: number) => {
                            setPageID(pageID);
                        }
                    }
                />
        );
    } else if (pageID == PAGE_ID["SHELF_PAGE"]) {
        return (
                <ShelfPage 

                    onPageOptionClick = {
                        (pageID: number) => {
                            setPageID(pageID);
                        }
                    }

                    onShelfBookOptionClick={
                        (bookID: string) => {
                            setPageID(PAGE_ID["BOOK_INFORMATION_PAGE"]);
                            setOtherData({
                                bookID: bookID
                            });
                        }
                    }

                    shelfID = {otherData.shelfID}
                />
        );
    } else if (pageID == PAGE_ID["BOOK_INFORMATION_PAGE"]) {
        return (
            <div>
                Comming soon
            </div>
        );
    } else if (pageID == PAGE_ID["CHANGE_PASSWORD_PAGE"]) {
        return (
            <ChangePasswordPage 
                
            />
        );
    }
}

export default App;