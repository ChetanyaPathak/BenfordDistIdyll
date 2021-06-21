import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    {
      label: 'Percentage',
      data: [30.1, 17.6, 12.5, 9.7, 7.9, 6.7 , 5.8, 5.1, 4.6],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => (
  
   
    <Bar data={data} options={options} />
  
);

module.exports = VerticalBar;