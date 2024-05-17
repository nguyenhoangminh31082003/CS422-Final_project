import { useState } from 'react';
import PAGE_ID from './PageID';
import BookPage from './components/BookPage';
import HomePage from './components/HomePage';
import VoicePage from './components/VoicePage';
import ShelfPage from './components/ShelfPage';
import LibraryPage from './components/LibraryPage';
import AccountPage from './components/AccountPage';
import WelcomePage from './components/WelcomePage';
import AddToShelfPage from './components/AddToShelfPage';
import AudioFolderPage from './components/AudioFolderPage';
import RegistrationPage from './components/RegistrationPage';
import CreateNewShelfPage from './components/CreateNewShelfPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import BookInformationPage from './components/BookInformationPage';


function App() {
    const [pageID, setPageID] = useState(PAGE_ID["WELCOME_PAGE"]);
    var [userID, setUserID] = useState("");
    const [otherData, setOtherData] = useState(null as any);
    
    const onPageOptionClick = (pageID: number) => {
        setPageID(pageID);
    };

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
    }
    
    if (pageID === PAGE_ID["HOME_PAGE"]) {
        return (
            <HomePage 
                onPageOptionClick = {
                    onPageOptionClick
                }
                
                onShelfOptionClick = {
                    (shelfID: string) => {
                        setPageID(PAGE_ID["SHELF_PAGE"]);
                        setOtherData({
                            shelfID: shelfID
                        });
                    }
                }

                onCreateNewShelfClick={
                    () => {
                        setPageID(PAGE_ID["CREATE_NEW_SHELF_PAGE"]);
                    }
                }

                userID = {userID}
            />
        );
    } 
    
    if (pageID === PAGE_ID["REGISTRATION_PAGE"]) {
        return (
            <RegistrationPage 
                onSuccessfullRegistration = {
                    (data) => {
                        setPageID(PAGE_ID["WELCOME_PAGE"]);
                    }
                }
            
                onLoginRequest = {
                    () => {
                        setPageID(PAGE_ID["WELCOME_PAGE"]);
                    }
                }
            />
        );
    }
    
    if (pageID === PAGE_ID["VOICE_PAGE"]) {
        return (
            <VoicePage 
                onPageOptionClick = {
                    onPageOptionClick
                }
                
                userID = {userID}

                onAudioFolderOptionClick = {
                    (folderID: string) => {
                        setPageID(PAGE_ID["AUDIO_FOLDER_PAGE"]);
                        setOtherData({
                            folderID: folderID
                        });
                    }
                }
            />
        );
    }
    
    if (pageID === PAGE_ID["LIBRARY_PAGE"]) {
        return (
                <LibraryPage 
                    onPageOptionClick = {
                        onPageOptionClick
                    }

                    onBookOptionClick = {
                        (bookID: string) => {
                            setPageID(PAGE_ID["BOOK_INFORMATION_PAGE"]);
                            setOtherData({
                                bookID: bookID
                            });
                        }
                    }

                    searchInput = {
                        (otherData === null ? null : otherData.searchInput)
                    }
                />
        );
    }
    
    if (pageID === PAGE_ID["BOOK_PAGE"]) {
        return (
            <BookPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                bookID = {
                    "This field will be updated later by the developer"
                }
            />
        );
    }
    
    if (pageID === PAGE_ID["ACCOUNT_PAGE"]) {
        return (
            <AccountPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                userID = {userID}
            />
        );
    }
    
    if (pageID === PAGE_ID["SHELF_PAGE"]) {
        return (
            <ShelfPage 

                onPageOptionClick = {
                    onPageOptionClick
                }

                onShelfBookOptionClick={
                    (bookID: string) => {
                        setPageID(PAGE_ID["BOOK_INFORMATION_PAGE"]);
                        setOtherData({
                            bookID: bookID
                        });
                    }
                }

                shelfID = {
                    otherData.shelfID
                }
            />
        );
    } 
    
    if (pageID === PAGE_ID["BOOK_INFORMATION_PAGE"]) {
            return (
                <BookInformationPage
                    onPageOptionClick = {
                        onPageOptionClick
                    }
                    
                    bookID = {
                        otherData.bookID
                    }

                    userID = {userID}

                    onAddToShelfButtonClick = {
                        (bookID: string) => {
                            setPageID(PAGE_ID["ADD_TO_SHELF_PAGE"]);
                            setOtherData({
                                bookID: bookID
                            });
                        }
                    }
                />
            );
    } 
    
    if (pageID === PAGE_ID["CHANGE_PASSWORD_PAGE"]) {
        return (
            <ChangePasswordPage 
                onPageOptionClick = {
                    onPageOptionClick
                }
            />
        );
    }

    if (pageID === PAGE_ID["AUDIO_FOLDER_PAGE"]) {
        return (
            <AudioFolderPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                folderID = {
                    otherData.folderID
                }

                onAudioFileOptionClick = {
                    (fileID: string) => {
                        setPageID(PAGE_ID["BOOK_PAGE"]);
                        setOtherData({
                            fileID: fileID
                        });
                    }
                }
            />
        );
    }

    if (pageID === PAGE_ID["CREATE_NEW_SHELF_PAGE"]) {
        //console.log(userID);
        return (
            <CreateNewShelfPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                userID = {userID}
            />
        );
    }

    if (pageID === PAGE_ID["ADD_TO_SHELF_PAGE"]) {
        return (
            <AddToShelfPage 
                onPageOptionClick = {
                    onPageOptionClick
                }
            />
        );
    }
}

export default App;