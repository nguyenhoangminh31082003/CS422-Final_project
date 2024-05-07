import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import RegistrationPage from './components/RegistrationPage';
import HomePage from './components/HomePage';
import PAGE_ID from './PageID';

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
            <HomePage />
        );
    } else if (pageID == PAGE_ID["REGISTRATION_PAGE"]) {
        return (
            <RegistrationPage />
        );
    }
}

export default App;