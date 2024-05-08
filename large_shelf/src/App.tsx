import { useState } from 'react';
import PAGE_ID from './PageID';
import BookPage from './components/BookPage';
import HomePage from './components/HomePage';
import VoicePage from './components/VoicePage';
import LibraryPage from './components/LibraryPage';
import AccountPage from './components/AccountPage';
import WelcomePage from './components/WelcomePage';
import RegistrationPage from './components/RegistrationPage';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient();

function App() {
    const [pageID, setPageID] = useState(PAGE_ID["WELCOME_PAGE"]);
    const [userID, setUserID] = useState(null as string | null);
    
    if (pageID === PAGE_ID["WELCOME_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        );
    } else if (pageID == PAGE_ID["HOME_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
                <HomePage 
                    onPageOptionClick = {
                        (pageID: number) => {
                            setPageID(pageID);
                        }
                    }
                />
            </QueryClientProvider>
        );
    } else if (pageID == PAGE_ID["REGISTRATION_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        );
    } else if (pageID == PAGE_ID["VOICE_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
                <VoicePage />
            </QueryClientProvider>
        );
    } else if (pageID == PAGE_ID["LIBRARY_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
                <LibraryPage />
            </QueryClientProvider>
        );
    } else if (pageID == PAGE_ID["BOOK_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
                <BookPage />
            </QueryClientProvider>
        );
    } else if (pageID == PAGE_ID["ACCOUNT_PAGE"]) {
        return (
            <QueryClientProvider client={queryClient}>
                <AccountPage 
                    onPageOptionClick = {
                        (pageID: number) => {
                            setPageID(pageID);
                        }
                    }
                />
            </QueryClientProvider>
        );
    }
}

export default App;