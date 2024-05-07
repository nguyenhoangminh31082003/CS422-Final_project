import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
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
          />
        );
    } else if (pageID == PAGE_ID["HOME_PAGE"]) {
        return (
            <HomePage />
        );
    }
}

export default App;