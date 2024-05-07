import { useState } from 'react';
import PAGE_ID from './PageID';
import BookPage from './components/BookPage';
import HomePage from './components/HomePage';
import VoicePage from './components/VoicePage';
import LibraryPage from './components/LibraryPage';
import AccountPage from './components/AccountPage';
import WelcomePage from './components/WelcomePage';
import RegistrationPage from './components/RegistrationPage';

function App() {
    const [pageID, setPageID] = useState(PAGE_ID["WELCOME_PAGE"]);
    const [userID, setUserID] = useState(null as string | null);
    
    if (pageID === PAGE_ID["WELCOME_PAGE"]) {
        return (
          <WelcomePage 
            onSucessfullLogin = {
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
            />
        );
    } else if (pageID == PAGE_ID["REGISTRATION_PAGE"]) {
        return (
            <RegistrationPage 
                onSucessfullRegistration = {
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
    }
}

export default App;