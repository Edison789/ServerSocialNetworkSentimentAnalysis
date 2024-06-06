import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CommentsSentimentPlot = (props) => {
    const { dataPlot } = props;
    //console.log('Este son los sentimientos',dataPlot)
    const [arreglo, setArreglo] = useState([]);

    useEffect(() => {
        const { Positive, Negative, Neutral, Mixed } = dataPlot;
        
        const total = Positive+Negative+Neutral+Neutral;
        const nuevoArreglo = [(Positive*100)/total, (Negative*100)/total, (Neutral*100)/total, (Mixed*100)/total];
        setArreglo(nuevoArreglo);
    }, [dataPlot]);

    //console.log(arreglo)
 
    var options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    var data = {
        labels: ['Positivo', 'Negativo', 'Neutral', 'Mixto'],
        datasets: [
            {
                label: 'Porcentaje',
                data: arreglo,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    if(arreglo.length === 0) {
        return <div>...Loading</div>
    }

    return (
    <div>
        <Pie data={data} options={options} />
    </div>)
}

export default CommentsSentimentPlot;