import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CommentsScatterPlot = (props) => {
  const { dataPlot } = props;
  const [arregloComentario, setArregloComentario] = useState([]);
  const [sentimentNum, setSentimentNum] = useState([]);

  //console.log(dataPlot);//hace 3 renderizaciones / la 1ra de dos vacias / 2da de 4 con un dato/ la 3ra con 4 de 14 datos

  //console.log(dataPlot)
  //Object.keys lee las propiedades de un objeto -> {}
  //console.log(Object.keys(dataPlot).length) 
  useEffect(() => {
    if (dataPlot && Object.keys(dataPlot).length > 0) {
      const nuevosComentarios = [];
      const nuevosSentimientos = [];
      // Recorremos los elementos de dataPlot para extraer comentarios y sentimientos
      dataPlot.comentarios.forEach((elemento) => {
        nuevosComentarios.push(elemento.texto);
        // Mapeamos los sentimientos a su correspondiente valor numérico
        switch (elemento.sentimiento) {
          case "NEUTRAL":
            nuevosSentimientos.push(2);
            break;
          case "MIXED":
            nuevosSentimientos.push(3);
            break;
          case "POSITIVE":
            nuevosSentimientos.push(4);
            break;
          case "NEGATIVE":
            nuevosSentimientos.push(1);
            break;
          default:
            nuevosSentimientos.push(0);
            break;
        }
      });
      setArregloComentario(nuevosComentarios);
      setSentimentNum(nuevosSentimientos);
    }
  }, [dataPlot]);

  const sentimentLabels = {
    0: "0",
    1: "Negativo",
    2: "Neutral",
    3: "Mixto",
    4: "Positivo"
  };

  if (dataPlot.length === 0) {
    return <div>...Cargando Datos</div>;
  }

  const miData = {
    labels: arregloComentario.map((_, index) => index + 1),//
    datasets: [
      {
        label: "Sentimientos-Comentarios",
        data: sentimentNum,
        fill: true,
        borderColor: "rgba(27, 77, 152, 1)",
        backgroundColor: "rgba(27, 77, 152, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(27, 77, 152, 1)",
        pointBackgroundColor: "rgba(27, 77, 152, 1)",
      },
    ],
  };

  const myOptions = {

    //maintainAspectRatio:true,
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          color: "white",
          stepSize:1,
          callback: function(value) {
            return sentimentLabels[value];
          }
        },
      },
      x: {
        ticks: { color: "white" },
      },
    },
    plugins: {
      legend: {},
    },
  };

  return (
    <div style={{ width: '1000px', height: '400px' }}> {/* Ajusta el tamaño del canvas aquí */}
      <Line data={miData} options={myOptions} />
    </div>
  );
};

export default CommentsScatterPlot;
