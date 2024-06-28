const axios = require('axios');
const AWS = require('aws-sdk');
const { param, post } = require('../routes/facebookRoutes');
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

//Token de acceso Facebook
const accessToken = 'EAAYnr8L0ZCwcBOZCFeAcVuVzbeNQzdPw7mhcC7wrgTGyieDvjZCGpL8rEwS8aNKCZAPTjW0ZAwypybHXsP6mKZBZBQpTPCVmGTaudIuwMIe95Pwa3gUTZA1DZBjY3Mr0LW3ZA7LLIxCZBJZAhLFuq75hg8AOG6sWgCuJ0YHj0nIgvCbdLncN3cbbq14S4ZAFqxWEUpCEZD';
const idPage = '168603473012560'
//Facebook

const analisisSentimientoTexto = async (texto) => {
    const params = {
        Text: texto,
        LanguageCode: 'es',
    };
    try {
        const resultado = await comprehend.detectSentiment(params).promise();
        return {
            texto: texto,
            sentimiento: resultado.Sentiment,
            score: resultado.SentimentScore
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const getAllPostFacebook = async () => {

    try {
        const response = await axios.get(`https://graph.facebook.com/v20.0/${idPage}/feed`, {
            params: {
                access_token: accessToken
            }
        });
        const postData = response.data.data;
        return postData;
    } catch (error) {
        console.error('Error al obtener los datos de la API de Facebook:', error);
        throw error;
    }
};

const getOnePost = async (postID) => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v20.0/${postID}`, {
            params: {
                access_token: accessToken
            }
        });
        const postData = response.data
        return postData
    } catch (error) {
        console.error('Error al obtener los datos de la API de Facebook:', error)
        throw error
    }
}

const getCommentsbyPost = async (postID) => {
    let arregloDeComentarios = []
    try {
        const responseCommets = await axios.get(`https://graph.facebook.com/v20.0/${postID}/comments`, {
            params: {
                access_token: accessToken
            }
        });
        const dataComments = responseCommets.data.data
        for (const comment of dataComments) {
            const data = await analisisSentimientoTexto(comment.message)
            arregloDeComentarios.push(data)
        }
        const estadisticas = generarSugerencia(arregloDeComentarios)

        return {
            comentarios: arregloDeComentarios,
            estadistica: estadisticas
        }

    } catch (error) {
        console.error('Error al obtener los datos de la API de Facebook:', error);
        throw error;
    }
}

const generarSugerencia = (obj) => {

    let totalPositive = 0;
    let totalNegative = 0;
    let totalNeutral = 0;
    let totalMixed = 0;

    obj.forEach(comentario => {
        totalPositive += comentario.score.Positive;
        totalNegative += comentario.score.Negative;
        totalNeutral += comentario.score.Neutral;
        totalMixed += comentario.score.Mixed;
    });

    const numComentarios = obj.length;
    const avgScores = {
        Positive: totalPositive / numComentarios,
        Negative: totalNegative / numComentarios,
        Neutral: totalNeutral / numComentarios,
        Mixed: totalMixed / numComentarios
    };
    // Analiza los scores promedio y da una recomendación
    let recomendacion = '';

    if (avgScores.Positive > 0.7) {
        recomendacion = "El texto muestra un alto nivel de positividad. Continúe con las prácticas que generan este tipo de comentarios positivos y considere destacar estos aspectos en futuras comunicaciones.";
    } else if (avgScores.Positive > 0.4) {
        recomendacion = "El texto es mayormente positivo, pero hay espacio para mejoras. Identifique y refuerce los elementos positivos mencionados para aumentar la satisfacción general.";
    } else if (avgScores.Neutral > 0.4) {
        recomendacion = "El texto es predominantemente neutral. Considere preguntar a los usuarios por sugerencias o feedback más específico para mejorar la experiencia y generar sentimientos más positivos.";
    } else if (avgScores.Negative > 0.2) {
        recomendacion = "El texto tiene algunos elementos negativos. Analice los puntos negativos detalladamente y tome medidas correctivas para abordar estas preocupaciones.";
    } else if (avgScores.Negative > 0.4) {
        recomendacion = "El texto es predominantemente negativo. Es crucial investigar las razones detrás de los sentimientos negativos y actuar rápidamente para corregir los problemas identificados.";
    } else if (avgScores.Mixed > 0.2) {
        recomendacion = "El texto muestra sentimientos mixtos. Esto puede indicar experiencias inconsistentes. Trabaje en uniformizar la calidad del servicio o producto para reducir la variabilidad en las experiencias de los usuarios.";
    } else {
        recomendacion = "El texto tiene una mezcla de sentimientos. Revise los aspectos neutrales o mixtos para comprender mejor las áreas de mejora y enfoque en incrementar los puntos positivos.";
    }
    //console.log(avgScores)
    //console.log(recomendacion)
    return {
        avgScores: avgScores,
        recomendacion: recomendacion
    }
};

//Facebook 
const getAllCommentsFacebook = async () => {
    let comments = [];
    const postData = await getAllPostFacebook();
    for (const post of postData) {
        try {
            const response = await axios.get(`https://graph.facebook.com/v20.0/${post.id}/comments`, {
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
    return comments;
};
//AWS & Facebook----------------------------------------------------------
const getAllSentimentCommentsFacebook = async () => {
    sentimentCommets = [];
    const commets = await getAllCommentsFacebook();
    for (const comment of commets) {
        const params = {
            Text: comment.message,
            LanguageCode: 'es',
        };
        try {
            const resultado = await comprehend.detectSentiment(params).promise();
            console.log('Sentimiento:', resultado.Sentiment);
            console.log('Sentimiento:', resultado.SentimentScore);
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

const getKeyPhrasesCommentFacebook = async () => {
    keyPhrases = [];
    const comments = await getAllCommentsFacebook();
    for (const comment of comments) {
        const params = {
            Text: comment.message,
            LanguageCode: 'es',
        };
        try {
            const resultado = await comprehend.detectKeyPhrases(params).promise();
            const dataKeyPhrases = {
                commentID: comment.id,
                keyPhrases: resultado.KeyPhrases
            }
            keyPhrases.push(dataKeyPhrases);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return keyPhrases;
}

//Facebook
const getAllReactionFacebook = async () => {

    let total_reaction = 0;

    const posts = await getAllPostFacebook();
    for (const post of posts) {
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
//Facebook
const getPorcentageSentimentFacebook = async () => {
    const dataComments = await getAllSentimentCommentsFacebook()
    let sentimentPercentagePost = {
        Positive: 0,
        Negative: 0,
        Neutral: 0,
        Mixed: 0
    };
    dataComments.forEach(comment => {
        switch (comment.sentiment) {
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
//Facebook
const getOneCommetFacebook = async (postID) => {
    const commnetData = await getAllSentimentCommentsFacebook()
    try {
        const post = await PostModel.findOne({ postID: postID });
        return post.reactionCountFacebook;
    } catch (error) {
        throw error;
    }
    return;
};

module.exports = {
    getAllPostFacebook,
    getOneCommetFacebook,
    getAllCommentsFacebook,
    getAllSentimentCommentsFacebook,
    getPorcentageSentimentFacebook,
    getAllReactionFacebook,
    getKeyPhrasesCommentFacebook,
    getCommentsbyPost,
    getOnePost
};