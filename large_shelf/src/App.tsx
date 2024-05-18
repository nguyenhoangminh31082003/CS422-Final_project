import { useState } from 'react';
import axios from 'axios';
import PAGE_ID from './PageID';
import SpeechServer from './SpeechServer';
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
    var [otherData, setOtherData] = useState<any>({});
    
    const updateOtherData = (newData: any) => {
        let newOtherData = otherData;

        for (let key in newData) {
            newOtherData[key] = newData[key];
        }

        setOtherData(newOtherData);
    };

    const onPageOptionClick = (pageID: number) => {
        setPageID(pageID);
    };

    const onSearchButtonClick = (searchQuery: string) => {
        updateOtherData({
            searchInput: searchQuery
        });

        setPageID(PAGE_ID["LIBRARY_PAGE"]);
    }

    axios.get(`http://127.0.0.1:8000/readingprocess/recentbook/${userID}/`)
        .then((response) => {
            if (response.status === 200) {
                updateOtherData({
                    "mostRecentBook": response.data["book_id"]
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });  
    
    if (userID.length > 0) {
        console.log("Converting text to speech!!!!!!!!!!!!!!!!");
        SpeechServer.convertTextToSpeech(
            "dummy", 
            "4JVOFy4SLQs9my0OLhEw", 
            "Welcome to the library!", 
            "welcome.mp3"
        );
    }

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

                onSearchButtonClick={
                    onSearchButtonClick
                }
                
                onShelfOptionClick = {
                    (shelfID: string) => {
                        setPageID(PAGE_ID["SHELF_PAGE"]);

                        updateOtherData({
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

                onSearchButtonClick={
                    onSearchButtonClick
                }
                
                userID = {userID}

                onAudioFolderOptionClick = {
                    (folderID: string) => {
                        setPageID(PAGE_ID["AUDIO_FOLDER_PAGE"]);
                        updateOtherData({
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
                            updateOtherData({
                                bookID: bookID
                            });
                        }
                    }

                    searchInput = {
                        (otherData.searchInput)
                    }

                    onSearchButtonClick={
                        onSearchButtonClick
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
                    otherData.mostRecentBook
                }

                onSearchButtonClick={
                    onSearchButtonClick
                }

                userID = {userID}
            />
        );
    }
    
    if (pageID === PAGE_ID["ACCOUNT_PAGE"]) {
        return (
            <AccountPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                onSearchButtonClick={
                    onSearchButtonClick
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
                        updateOtherData({
                            bookID: bookID
                        });
                    }
                }

                shelfID = {
                    otherData.shelfID
                }

                userID = {userID}

                onSearchButtonClick={
                    onSearchButtonClick
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

                    onSearchButtonClick={
                        onSearchButtonClick
                    }

                    userID = {userID}

                    onAddToShelfButtonClick = {
                        (bookID: string) => {
                            setPageID(PAGE_ID["ADD_TO_SHELF_PAGE"]);
                            updateOtherData({
                                bookID: bookID
                            });
                        }
                    }

                    onReadButtonClick = {
                        (bookID: string) => {
                            setPageID(PAGE_ID["BOOK_PAGE"]);
                            
                            const responseAfterSettingCurrentPage = (response: any) => {
                                updateOtherData({
                                    mostRecentBook: bookID
                                });
                            };

                            axios.get(`http://127.0.0.1:8000/readingprocess/${userID}/${bookID}/`)
                                .then((response) => {
                                    if (response.status === 200) {
                                        axios.post(`http://127.0.0.1:8000/readingprocess/`, {
                                            "user_id": userID,
                                            "book_id": bookID,
                                            "current_page": response.data["current_page"]
                                        })
                                        .then(responseAfterSettingCurrentPage)
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    }
                                })
                                .catch((error) => {
                                    axios.post(`http://127.0.0.1:8000/readingprocess/`, {
                                            "user_id": userID,
                                            "book_id": bookID,
                                            "current_page": 0
                                        })
                                        .then(responseAfterSettingCurrentPage)
                                        .catch((error) => {
                                            console.log(error);
                                        });
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

                userID = {userID}

                onSearchButtonClick={
                    onSearchButtonClick
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
                        updateOtherData({
                            fileID: fileID
                        });
                    }
                }

                onBackButtonClick = {
                    () => {
                        setPageID(PAGE_ID["VOICE_PAGE"]);
                    }
                }

                userID = {userID}

                onSearchButtonClick={
                    onSearchButtonClick
                }
            />
        );
    }

    if (pageID === PAGE_ID["CREATE_NEW_SHELF_PAGE"]) {
        return (
            <CreateNewShelfPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                userID = {userID}

                onSearchButtonClick={
                    onSearchButtonClick
                }
            />
        );
    }

    if (pageID === PAGE_ID["ADD_TO_SHELF_PAGE"]) {
        return (
            <AddToShelfPage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                bookID = {
                    otherData.bookID
                }

                userID = {
                    userID
                }
            
                onBackButtonClick={
                    () => {
                        setPageID(PAGE_ID["BOOK_INFORMATION_PAGE"]);
                    }
                }

                onSearchButtonClick={
                    onSearchButtonClick
                }
            />
        );
    }
}

export default App;