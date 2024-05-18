import axios from "axios";

const StorageServer = (function() {
    const host = 'http://127.0.0.1:8000';
    
    const printError = function(error: any) {
        console.log(error);
    }

    return {
        "getHost": function() {
            return host;
        },

        "getMostRecentBook": function(
            userID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/readingprocess/recentbook/${userID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getBooksOrderedByRating": function(
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/books`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getUserReadingProcess": function(
            userID: string,
            bookID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/readingprocess/${userID}/${bookID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "updateUserReadingProcess": function(
            userID: string,
            bookID: string | null | undefined,
            currentPage: number,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/readingprocess/`, {
                user_id: userID,
                book_id: bookID,
                current_page: currentPage
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getBookPage": function(
            bookID: string | null | undefined,
            pageNumber: number,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/books/content/${bookID}/${pageNumber}`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        }
    }
})();

export default StorageServer;