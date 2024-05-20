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

            try {

                const response = await axios.post(`${host}/txt2speech/url`, {
                    user_id: userID,
                    voice_id: voiceID,
                    text: text.slice(0, Math.min(text.length, 49))
                });
        
                console.log(response);

                return response.data;
            } catch (error) {
                console.log(error);
                return TrainSound;
            }
        },
        
        "getUserVoiceList": async function getUserVoiceList(userID: string): Promise<any> {
            try {
                const response = await axios.get(`${host}/voices/${userID}`);
                return response.data;
            } catch (error) {
                console.log(error);
                return [];
            }
        },

        "addVoiceURL": async function addVoice(
            userID: string,
            name: string,
            url: string,
            description: string
        ): Promise<any> {
            try {
                const response = await axios.post(`${host}/voices/url`, {
                    "user_id": userID,
                    "voice_name": name,
                    "voice_sample_url": url,
                    "description": description
                });

                return response;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    }
})();

export default SpeechServer;