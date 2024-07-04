import React, { useState } from "react";
//import axios from "axios";
import CommentsScatterPlot from './commentsScatterPlot';
import CommentsSentimentPlot from "./commentsSentimentPlot";
import useData from "./useData";
import '../css/App.css';
//para los contenedores
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const GridItem = styled.div`
  padding: 1px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  color: white; 
`;

const CommentsData = () => {
    const [selectedPostId, setSelectedPostId] = useState(null);
    const { data, loading } = useData(selectedPostId ? `http://localhost:3001/api/facebook/commetsPlot/${selectedPostId}` : null);
    // const { totalPosts, loading2 } = useData("http://localhost:3001/api/facebook/posts");
    // console.log(totalSentimentPercentage);
    // console.log(totalPosts);
    const { data: data1, loading: loading1 } = useData("http://localhost:3001/api/facebook/posts/");

    const handleRowClick = (id) => {
        setSelectedPostId(id);
    };

    return (
        <div>
            <Container>
                <GridItem>
                    {loading && <h1>Loading</h1>}
                    <CommentsScatterPlot dataPlot={data} />
                </GridItem>
                <GridItem>
                    {loading1 && <h1>Loading</h1>}
                    {data1?.data ? (
                        <div style={styles.container}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <h3>
                                            <th>Publicaciones ID</th>
                                        </h3>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data1.data.map((post) => (
                                        <tr key={post.id} onClick={() => handleRowClick(post.id)} >
                                            <td >{post.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </GridItem>
                <GridItem>
                    <h3>Publicacion</h3>
                    {data.messagePost ? (
                        <h4>{data.messagePost}</h4>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </GridItem>
                <GridItem>
                    <h3>Recomendacion</h3>
                    {data.messagePost ? (
                        <h4>{data.statsAnalitic.recomendacion}</h4>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </GridItem>
            </Container>
        </div>
    );
};

const styles = {
    container: {
        width: '400px',
        height: '450px',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        padding: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        //border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        //backgroundColor: '#f4f4f4',
    },
    td: {
        //borderBottom: '1px solid white',
        padding: '8px',
        color: 'black', // Ensure text color is visible against the background
    },
};


export default CommentsData;
