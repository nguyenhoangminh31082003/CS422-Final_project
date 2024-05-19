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
        ): Promise<any> {
        
            let audio = new Audio();

            audio.src = "https://samplelib.com/lib/preview/mp3/sample-3s.mp3";

            return audio;

            try {

                const response = await axios.post(`${host}/txt2speech`, {
                    user_id: userID,
                    voice_id: voiceID,
                    text: "This message is used to test"//text
                });
        
                const blob = new Blob([response.data], { type: "audio/mpeg" });
                const url = URL.createObjectURL(blob);

                return new Audio(url);
            } catch (error) {
                console.log(error);
                return new Audio(TrainSound);
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