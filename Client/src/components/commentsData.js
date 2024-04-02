import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentsData = () => {
    const [totalComments, setTotalComments] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:3000/api/facebook/comments");
            setTotalComments(result.data.data.length);
            console.log(totalComments)
        };
        fetchData();
    })

    return (
        <div>
            <h1>COMENTARIOS</h1>
            <h1>{totalComments}</h1>
        </div>
    )
}

export default CommentsData;