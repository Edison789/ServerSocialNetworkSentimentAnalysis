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

const getOnePostFacebook = async (req, res) => {
    const postFacebook = facebookService.getOnePostFacebook();
    res.send(`Obtener el detalle de la publicacion ${req.params.postID}`);
};
module.exports = {
    getAllPostFacebook,
    getOnePostFacebook,
    getAllCommentsFacebook,
    getAllSentimentCommentsFacebook,
    getPorcentageSentimentFacebook,
    getAllReactionFacebook
};