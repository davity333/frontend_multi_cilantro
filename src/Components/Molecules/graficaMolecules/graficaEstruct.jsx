import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function GraficaEstruct() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.2,
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          stepSize: 20
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        }
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperatura',
        data: [90, 38, 25, 48, 40, 105, 98],
        borderColor: 'rgb(255, 225, 0)',
        backgroundColor: 'rgba(255, 213, 0, 0.2)',
        fill: true,
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: 'Humedad',
        data: [10, 30, 45, 35, 35, 50, 40],
        borderColor: 'rgb(40, 167, 69)',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="w-[150vh] h-[60vh] px-4 bg-[#ceffd143]">
        <p className='p-7 text-[3.6vh] font-bold text-[#7ab37f]'>Estado del cilantro</p>
      <Line options={options} data={data}/>
    </div>
  );
}

export default GraficaEstruct;