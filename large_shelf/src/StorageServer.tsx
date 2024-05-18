import axios from "axios";

const StorageServer = (function() {
    const host = 'http://127.0.0.1:8000';
    
    return {
        "getHost": function() {
            return host;
        },

        "getMostRecentBook": function(
            userID: string,
            onSucess: (response: any) => void,
            onError: (error: any) => void
        ) {
            axios.get(`http://127.0.0.1:8000/readingprocess/recentbook/${userID}/`)
            .then((response) => {
                onSucess(response);
            })
            .catch((error) => {
                onError(error);
            });
        }
    }
})();

export default StorageServer;