const facebookService = require("../services/facebookService")

const getAllPostFacebook = async (req, res) => {
    try {
        const allPostFacebook = await facebookService.getAllPostFacebook();
        res.send({ status: "OK", data: allPostFacebook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
};

const getAllCommentsFacebook = async (req, res) => {
    try {
        const commentsFacebook = await facebookService.getAllCommentsFacebook();
        res.send({ status: "OK", data: commentsFacebook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
};

const getAllSentimentCommentsFacebook = async (req, res) => {
    try {
        const sentimentCommentsFacebook = await facebookService.getAllSentimentCommentsFacebook();
        res.send({ status: "OK", data: sentimentCommentsFacebook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
};

const getAllReactionFacebook = async (req, res) => {
    try {
        const reactionPostFacebook = await facebookService.getAllReactionFacebook();
        res.send({ status: "OK", data: reactionPostFacebook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
};

const getPorcentageSentimentFacebook = async (req, res) => {
    try {
        const reactionCountFacebook = await facebookService.getPorcentageSentimentFacebook();
        res.send({ status: "OK", data: reactionCountFacebook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
};

const getKeyPhrasesCommentFacebook = async (req, res) => {
    try {
        const KeyPhrasesPostFacebook = await facebookService.getKeyPhrasesCommentFacebook();
        res.send({ status: "OK", data: KeyPhrasesPostFacebook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
};

const getCommentsbyPost = async (req, res) => {
    const postID = req.params.postID;
    try {
        const data = await facebookService.getCommentsbyPost(postID);
        const data1 = await facebookService.getOnePost(postID);
        res.send({ status: "OK", idPost: data1.id , messagePost: data1.message, comentarios: data.comentarios, statsAnalitic: data.estadistica });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: "Error", message: "Error al obtener los datos de Facebook" });
    }
}

module.exports = {
    getAllPostFacebook,
    getAllCommentsFacebook,
    getAllSentimentCommentsFacebook,
    getPorcentageSentimentFacebook,
    getAllReactionFacebook,
    getKeyPhrasesCommentFacebook,
    getCommentsbyPost
};