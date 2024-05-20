import { useState, useEffect }      from 'react';
import PAGE_ID                      from './PageID';
import StorageServer                from './StorageServer';
import BookPage                     from './components/BookPage';
import HomePage                     from './components/HomePage';
import VoicePage                    from './components/VoicePage';
import ShelfPage                    from './components/ShelfPage';
import LibraryPage                  from './components/LibraryPage';
import AccountPage                  from './components/AccountPage';
import WelcomePage                  from './components/WelcomePage';
import AddToShelfPage               from './components/AddToShelfPage';
import AudioFolderPage              from './components/AudioFolderPage';
import AddAudioFilePage             from './components/AddAudioFilePage';
import RegistrationPage             from './components/RegistrationPage';
import SearchResultPage             from './components/SearchResultPage';
import CreateNewShelfPage           from './components/CreateNewShelfPage';
import ChangePasswordPage           from './components/ChangePasswordPage';
import BookInformationPage          from './components/BookInformationPage';
import CreateNewAudioFolderPage     from './components/CreateNewAudioFolderPage';


function App(): JSX.Element {
    useEffect(() => {
        //<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        let link = document.createElement("meta");
        link.setAttribute("http-equiv", "Content-Security-Policy");
        link.setAttribute("content", "upgrade-insecure-requests");
        document.head.appendChild(link);

        document.title = "Large Shelf";
    }, []);

    var [pageID, setPageID]         = useState(PAGE_ID["WELCOME_PAGE"]);
    var [userID, setUserID]         = useState("");
    var [otherData, setOtherData]   = useState<any>({});
    
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

        setPageID(PAGE_ID["SEARCH_RESULT_PAGE"]);
    }

    StorageServer.getMostRecentBook(
        userID,
        (response) => {
            if (response.status === 200) {
                updateOtherData({
                    "mostRecentBook": response.data["book_id"]
                });
            }
        }
    );
    
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
                        updateOtherData({
                            folderID: folderID
                        });
                        setPageID(PAGE_ID["AUDIO_FOLDER_PAGE"]);
                    }
                }

                onCreateNewAudioFolderButtonClick = {
                    () => {
                        setPageID(PAGE_ID["CREATE_NEW_AUDIO_FOLDER_PAGE"]);
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

                    onSearchButtonClick={
                        onSearchButtonClick
                    }
                />
        );
    }

    if (pageID === PAGE_ID["SEARCH_RESULT_PAGE"]) {
        return (
            <SearchResultPage
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
                    otherData.searchInput
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
                            
                            const responseAfterSettingCurrentPage = (response: any) => {
                                updateOtherData({
                                    mostRecentBook: bookID
                                });
                            
                                setPageID(PAGE_ID["BOOK_PAGE"]);
                            };

                            StorageServer.getUserReadingProcess(
                                userID,
                                bookID,
                                (response) => {
                                    if (response.status === 200) {
                                        StorageServer.updateUserReadingProcess(
                                            userID,
                                            bookID,
                                            response.data["current_page"],
                                            responseAfterSettingCurrentPage
                                        );
                                    }
                                },
                                (error) => {
                                    StorageServer.updateUserReadingProcess(
                                        userID,
                                        bookID,
                                        0,
                                        responseAfterSettingCurrentPage
                                    );
                                }
                            );
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

                onAddAudioFileButtonClick={
                    (folderID) => {
                        updateOtherData({
                            folderID: folderID
                        });
                        setPageID(PAGE_ID["ADD_AUDIO_FILE_PAGE"]);
                    }
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

    if (pageID === PAGE_ID["CREATE_NEW_AUDIO_FOLDER_PAGE"]) {
        return (
            <CreateNewAudioFolderPage
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

    if (pageID === PAGE_ID["ADD_AUDIO_FILE_PAGE"]) {
        return (
            <AddAudioFilePage 
                onPageOptionClick = {
                    onPageOptionClick
                }

                folderID = {
                    otherData.folderID
                }

                userID = {
                    userID
                }

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

    return (
        <>
            Comming soon
        </>
    )
}

export default App;