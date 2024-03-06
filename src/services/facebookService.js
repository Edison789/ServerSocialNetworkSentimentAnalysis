const axios = require('axios');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

//Credenciales acceso a AWS Comprenhed
const credentials = new AWS.Credentials({
    accessKeyId: 'AKIAVJCIYM6BFLHZYXEE',
    secretAccessKey: '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',
    region: 'us-east-2', // Reemplaza con tu región de AWS
});

const comprehend = new AWS.Comprehend({
    credentials,
});

//Token de acceso
const accessToken = 'EAAYnr8L0ZCwcBO9ZCOKQ45WBHZCgMIuOQE6ysqsPWnSlwZC4BuPUWIwEgRxrBHl7rQS0aIOeSB1YV3YZBZBFRWQHCj3JxtAVr9MrKC5ZCbbHEY1IZAUc8XQ67ZA304oOQLLDNy5WCKimWGfVZAZBzqCYnFqRiZAPPJTtLZBpDF4Nn5AY52jYDDcRCj5cTCsEMaO6h1rIZD';
const idPage = '168603473012560'

const getAllPostFacebook = async () =>{
    try {
        const response = await axios.get(`https://graph.facebook.com/v19.0/${idPage}/feed`, {
            params: {
                access_token: accessToken
            }
        });
        const postData = response.data.data;
        //publicaciones totales
        //console.log(postData.length);
        return postData;
    } catch (error) {
        console.error('Error al obtener los datos de la API de Facebook:', error);
        throw error;
    }
};

const getAllCommentsFacebook = async () =>{
    let comments = [];
    const postData =  await getAllPostFacebook();
    for (const post of postData) {
        try {
            const response = await axios.get(`https://graph.facebook.com/v19.0/${post.id}/comments`, {
                params: {
                    access_token: accessToken
                }
            });
            const commentData = response.data.data;
            comments = comments.concat(commentData);
        } catch (error) {
            console.error('Error al obtener los datos de la API de Facebook:', error);
            throw error;
        }   
    }
    console.log(comments.length)
    return comments;
};

const getAllSentimentCommentsFacebook = async () => {
    sentimentCommets = [];
    const commets = await getAllCommentsFacebook();
    for (const comment of commets){
        const params = {
            Text: comment.message,
            LanguageCode: 'es', 
        };
        try {
            const resultado = await comprehend.detectSentiment(params).promise();
            //console.log('Sentimiento:', resultado.Sentiment);
            comment.sentiment = resultado.Sentiment;
            //console.log(comment);
            sentimentCommets.push(comment);
            //console.log('Confianza:', resultado.SentimentScore);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return sentimentCommets;
}

const getAllReactionFacebook = async () => {

    let total_reaction = 0;

    const posts = await getAllPostFacebook();
    for(const post of posts){
        try {
            const response = await axios.get(`https://graph.facebook.com/v19.0/${post.id}/reactions?summary=total_count`, {
                params: {
                    access_token: accessToken
                }
            });
            const numReactions = response.data.summary.total_count;
            console.log(`${numReactions} reacciones de ${post.id}`);
            total_reaction = total_reaction + numReactions;
        } catch (error) {
            console.error('Error al obtener los datos de la API de Facebook:', error);
            throw error;
        } 
    }
    console.log(total_reaction);
}

const getPorcentageSentimentFacebook = async () => {
    const dataComments = await getAllSentimentCommentsFacebook()
    let sentimentPercentagePost = {
        Positive: 0,
        Negative:0,
        Neutral:0,
        Mixed:0
    };
    dataComments.forEach(comment => {
        switch(comment.sentiment){
            case 'POSITIVE':
                sentimentPercentagePost.Positive++;
                break;
            case 'NEGATIVE':
                sentimentPercentagePost.Negative++;
                break;
            case 'NEUTRAL':
                sentimentPercentagePost.Neutral++;
                break;
            case 'MIXED':
                sentimentPercentagePost.Mixed++;
                break;
            default:
                break;
        }
    });
    return sentimentPercentagePost;
}

const getOneCommetFacebook= async (postID) => {
    const commnetData = await getAllSentimentCommentsFacebook()
    try {
        const post = await PostModel.findOne({ postID: postID });
        return post.reactionCountFacebook; 
    } catch (error) {
        throw error;
    }
    return;
};

module.exports={
    getAllPostFacebook,
    getOneCommetFacebook,
    getAllCommentsFacebook,
    getAllSentimentCommentsFacebook,    
    getPorcentageSentimentFacebook,
    getAllReactionFacebook
};