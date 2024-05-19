import axios from "axios";
import TrainSound from "./assets/train_sound.mp3"

const SpeechServer = (function() {
    const host = 'http://103.82.194.67:8000';
    
    return {

        "getHost": function() {
            return host;
        },

        "convertTextToSpeech": async function convertTextToSpeech(
            userID: string,
            voiceID: string,
            text: string
        ): Promise<string> {

            return TrainSound;

            try {
                const response = await axios.post(`${host}/txt2speech`, {
                    user_id: userID,
                    voice_id: voiceID,
                    text: text
                });
        
                const binaryData = response.data;
                const length = binaryData.length;
                const uint8Array = new Uint8Array(length);
        
                for (let i = 0; i < length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                }
        
                const blob = new Blob([uint8Array]);
                const url = URL.createObjectURL(blob);
        
                return url;
            } catch (error) {
                console.log(error);
                return TrainSound;
            }
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