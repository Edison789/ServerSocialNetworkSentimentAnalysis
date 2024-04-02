const express = require ('express');
const router = express.Router();
const facebookController = require("../controllers/facebookController")

router
    //obtiene la informacion de todas las publicaciones de facebook
    .get("/posts", facebookController.getAllPostFacebook)
    //obtiene la cantidad total de todas las publicaciones
    .get("/posts/reactions", facebookController.getAllReactionFacebook)
    //obtiene la informacion de todos los comentarios
    .get("/comments", facebookController.getAllCommentsFacebook)
    //obtiene la informacion de todos lo comentarios incluida el sentimiento de cada comentario
    .get("/comments/sentiment", facebookController.getAllSentimentCommentsFacebook)
    //obtiene la cantidad de comentarios (positivos, negativos, neutros y mixtos) de todos los comentarios
    .get("/comments/sentiment/percentage", facebookController.getPorcentageSentimentFacebook)
    
    .get("/:postID", facebookController.getOnePostFacebook)

module.exports =  router;