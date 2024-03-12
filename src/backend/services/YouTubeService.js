const {google} = require('googleapis');
const axios = require('axios');


const apiKey = 'AIzaSyAip0McXQRWQCgQ-9ZWc3pfiGqFts2Zvs0'
const youtube = google.youtube({
    version: 'v3',
    auth: apiKey
});

class YouTubeService {
// Function to search for videos
    static async searchVideos(query) {
        try {
            const response = await youtube.search.list({
                part: 'snippet',
                q: query,
                type: 'video'
            });

            return response.data.items;
        } catch (error) {
            console.error('Error searching for videos:', error.message);
        }
    }

    static async getCaptions(videoId) {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/captions', {
            params: {
                part: 'snippet',
                videoId: videoId,
                key: apiKey
            }
        });

        return response.data.items;
    }
}

module.exports = {YouTubeService};


