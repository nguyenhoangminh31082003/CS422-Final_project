import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import PAGE_ID from './PageID';

function App() {
    const [pageID, setPageID] = useState(PAGE_ID["WELCOME_PAGE"]);
    
    if (pageID === PAGE_ID["WELCOME_PAGE"]) {
        return (
            <div>
                <WelcomePage />
            </div>
        );
    } else {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default App;