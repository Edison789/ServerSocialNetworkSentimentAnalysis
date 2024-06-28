import React from "react";
//import axios from "axios";
import CommentsScatterPlot from './commentsScatterPlot';
import CommentsSentimentPlot from "./commentsSentimentPlot";
import useData from "./useData";
import '../css/App.css';

const CommentsData = () => {
    //PRUEBA
    const { data, loading } = useData("http://localhost:3001/api/facebook/commetsPlot/168603473012560_122158486310197635");
    console.log("comentarios",data);
    // const { totalSentimentPercentage, loading1 } = useData("http://localhost:3001/api/facebook/comments/sentiment/percentage");
    // const { totalPosts, loading2 } = useData("http://localhost:3001/api/facebook/posts");
    // console.log(totalSentimentPercentage);
    // console.log(totalPosts);

    //console.log(totalComments);//hace 3 renderizaciones la primera vacia/ la segunda con 25 / la 3ra con 14

    return (
        <div>
            {loading && <h1>Loading</h1>}
            <CommentsScatterPlot dataPlot ={data}/>
        </div>
    );
};

export default CommentsData;
