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
                // Extract the audio data from the response
                const binaryData = response.data;

                //console.log(binaryData);

                const length = binaryData.length;
                const uint8Array = new Uint8Array(length);
                for (let i = 0; i < length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                }

                // Write the Uint8Array to a file
                const blob = new Blob([uint8Array]);
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = outputFileName;
                link.click();

                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.log("Error in convertTextToSpeech");
                console.log(error);
                console.log("!!!")
            });
        },

        "getFixedPublicVoiceList": function() {
            return [
                {
                    "id": "4JVOFy4SLQs9my0OLhEw",
                    "name": "Luca"
                },
                {
                    "id": "j9jfwdrw7BRfcR43Qohk",
                    "name": "Frederick Surrey"
                },
                {
                    "id": "ucTq4wzRNSiqJDhpxhUO",
                    "name": "Sue"
                }
            ];
        }  
    }
})();

export default SpeechServer;