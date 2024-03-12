const {YouTubeService} = require("../services/YouTubeService");


module.exports = {

    getVideosList: async function (req, res) {
        const videos = await YouTubeService.searchVideos(req.body.search);
        console.log(videos);
        res.json(videos);
        return res.status(200);
    },

    handleOAuthCallback: async function (req, res) {
        // Not implemented
    },

    getVideoCaptions: async function (req, res) {
        try {
            const captions = await YouTubeService.getCaptions(req.query.videoId)
            console.log(captions);
            res.json(captions);
            return res.status(200);
        } catch (error) {
            console.error('Error fetching captions:', error);
            return null;
        }
    }


}

