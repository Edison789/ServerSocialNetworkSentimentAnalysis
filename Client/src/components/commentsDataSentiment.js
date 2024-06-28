import React from "react";
//import axios from "axios";
import CommentsSentimentPlot from "./commentsSentimentPlot";
import useData from "./useData";
import '../css/App.css';

const CommentsDataSentiment = () => {
    //PRUEBA
    // const { data, loading } = useData("http://localhost:3001/api/facebook/comments/sentiment");
    // console.log(data);
    const { data, loading } = useData("http://localhost:3001/api/facebook/comments/sentiment/percentage");
    // const { totalPosts, loading2 } = useData("http://localhost:3001/api/facebook/posts");
    console.log("Sentiment",data);
    // console.log(totalPosts);

    //console.log(totalComments);//hace 3 renderizaciones la primera vacia/ la segunda con 25 / la 3ra con 14

    return (
        <div className="container">
            {loading && <h1>Loading</h1>}
            <CommentsSentimentPlot dataPlot ={data}/>
        </div>
    );
};

export default CommentsDataSentiment;
