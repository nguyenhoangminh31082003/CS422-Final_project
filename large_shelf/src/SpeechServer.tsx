import axios from "axios";

const SpeechServer = (function() {
    const host = 'http://103.82.194.67:8000';
    
    return {

        "getHost": function() {
            return host;
        },

        "convertTextToSpeech": function(
            userID: string,
            voiceID: string,
            text: string,
            outputFileName: string
        ) {
            axios.post(`${host}/txt2speech`, {
                "user_id": userID,
                "voice_id": voiceID,
                "text": text
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log("Error in convertTextToSpeech");
                console.log(error);
                console.log("!!!")
            });
        },


    }
})();

export default SpeechServer;