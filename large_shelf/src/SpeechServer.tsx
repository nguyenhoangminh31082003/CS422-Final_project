import axios from "axios";

const SpeechServer = (function() {
    const url = 'http://103.82.194.67:8000';
    
    return {
        "convertTextToSpeech": function(
            userID: string,
            voiceID: string,
            text: string,
            outputFileName: string
        ) {
            axios.post(`${url}/txt2speech`, {
                "user_id": userID,
                "voice_id": voiceID,
                "text": text
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        },
    }
})();

export default SpeechServer;