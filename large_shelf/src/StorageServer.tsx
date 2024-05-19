import axios from "axios";

const StorageServer = (function() {
    //const host = 'http://127.0.0.1:8000';
    const host = "https://mybackend-project-cs422-version6.onrender.com/";

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
        },

        "login": function(
            email: string,
            password: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/reader/login`, {
                email: email,
                password: password
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getUserInformation": function(
            userID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/readerinfo/id/${userID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "registerNewUser": function(
            email: string,
            password: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/reader/register`, {
                email: email,
                password: password
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getAllAudioFileLinkOfUser": function(
            userID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/audiofiles/${userID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "createNewShelf": function(
            userID: string,
            shelfName: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/shelf/`, {
                name: shelfName,
                user_id: userID
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "createNewAudioFolder": function(
            userID: string,
            audioFolderName: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/audiofolders/`, {
                name: audioFolderName,
                user_id: userID,
                category: "unknown"
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "deleteShelf": function(
            shelfID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.delete(`${host}/shelf/delete/${shelfID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "deleteAudioFolder": function(
            audioFolderID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.delete(`${host}/audiofolder/delete/${audioFolderID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "addAudioFile": function(
            audioFileName: string,
            folderID: string,
            userID: string,
            url: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/audiofiles/`, {
                name: audioFileName,
                folder_id: folderID,
                user_id: userID,
                file_url: url
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "updateUserInformation": function(
            newInformation: any,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(
                `${host}/readerinfo/`,
                newInformation
            )
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getShelvesOfUser": function(
            userID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/shelf/${userID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getBookInformation": function(
            bookID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/books/${bookID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "getListOfShelvesContainingGivenBook": function(
            userID: string,
            bookID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.get(`${host}/shelves-containing-book/${userID}/${bookID}/`)
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },

        "addBookToShelf": function(
            userID: string,
            bookID: string,
            shelfID: string,
            onSuccess: (response: any) => void,
            onError: (error: any) => void = printError
        ) {
            axios.post(`${host}/addedbooks/`, {
                "shelf_id": shelfID,
                "user_id": userID,
                "book_id": bookID
            })
            .then((response) => {
                onSuccess(response);
            })
            .catch((error) => {
                onError(error);
            });
        },
    }
})();

export default StorageServer;