import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const data1 = getBenfordData();

const BenfordTable = calculateBenford(data1);

let resArr = [];

   var i =0;

    for(let item of BenfordTable)
    {
      resArr[i] = (item["dataFrequencyPercent"] * 100).toFixed(2).padStart(6, " ");
      i++;
    }
console.log(resArr);
const rand = () => Math.floor(Math.random() * 255);

const genData = () => ({
  labels: ['1', '2', '3', '4', '5', '6', '7','8','9'],
  datasets: [
    {
      type: 'line',
      label: 'Benfords Distribution',
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
      fill: false,
      data: [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6],
    },
    {
      type: 'bar',
      label: 'Random Data',
      backgroundColor:  [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],

      data: [resArr[0], resArr[1],resArr[2],resArr[3],resArr[4],resArr[5],resArr[6],resArr[7],resArr[8]],
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
});

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

const data = genData();

const ClickEvents = () => {
  
  const getDatasetAtEvent = dataset => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    setClickedDataset(data.datasets[datasetIndex].label);
  };

  const getElementAtEvent = element => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    setClickedElement(
      `${data.labels[index]} - ${data.datasets[datasetIndex].data[index]}`
    );
  };

  const getElementsAtEvent = elements => {
    if (!elements.length) return;

    setClickedElements(elements.length);
  };

  return (
   
      <Bar
        data={data}
        options={options}
        getDatasetAtEvent={getDatasetAtEvent}
        getElementAtEvent={getElementAtEvent}
        getElementsAtEvent={getElementsAtEvent}
      />
     
  );
};





function calculateBenford(data)
{
    

    //                              1      2      3      4      5      6      7      8      9
    const BenfordPercentages = [0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046];

    let results = [];

    const firstDigits = data.map(function (item, index, array)
    {
        return item.toString()[0];
    });

    const firstDigitFrequencies = getDigitsFrequencies(firstDigits);

    let dataFrequency;
    let dataFrequencyPercent;
    let BenfordFrequency;
    let BenfordFrequencyPercent;
    let differenceFrequency;
    let differenceFrequencyPercent;

    for(let n = 1; n <= 9; n++)
    {
        dataFrequency = firstDigitFrequencies[n];
        dataFrequencyPercent = dataFrequency / data.length;
        BenfordFrequency = data.length * BenfordPercentages[n];
        BenfordFrequencyPercent = BenfordPercentages[n];
        differenceFrequency = dataFrequency - BenfordFrequency;
        differenceFrequencyPercent = dataFrequencyPercent - BenfordFrequencyPercent;

        results.push({"n": n,
                        "dataFrequency":              dataFrequency,
                        "dataFrequencyPercent":       dataFrequencyPercent,
                        "BenfordFrequency":           BenfordFrequency,
                        "BenfordFrequencyPercent":    BenfordFrequencyPercent,
                        "differenceFrequency":        differenceFrequency,
                        "differenceFrequencyPercent": differenceFrequencyPercent});
    }

    return results;
}


function getDigitsFrequencies(firstDigits)
{
    const digitCounts = Array(10).fill(0);

    for(let n of firstDigits)
    {
        digitCounts[n]++;
    }

    return digitCounts;
}






function getRandomData()
{
    // Returns a list of 1000 numbers approximately
    // following the uniform distribution NOT the
    // Benford Distribution.

    const randomData = new Array(1000);

    for(let i = 0; i < 1000; i++)
    {
        randomData[i] = Math.floor(Math.random() * 1000);
    }

    return randomData;
}


function getBenfordData()
{
    // Returns a list of approximately 1000 numbers
    // approximately following the Benford Distribution.

    const BENFORD_PERCENTAGES = [0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046];

    let BenfordData = [];

    let randomfactor;
    let start;
    let max;

    for(let firstdigit = 1; firstdigit <= 9; firstdigit++)
    {
        // get a random number between 0.8 and 1.2
        randomfactor = (Math.random() * 0.4) + 0.8;

        max = Math.floor(1000 * BENFORD_PERCENTAGES[firstdigit] * randomfactor);

        for(let numcount = 1; numcount < max; numcount++)
        {
            start = firstdigit * 1000;
            BenfordData.push(randBetween(start, start + 1000));
        }
    }

    return BenfordData;
}


function randBetween(min, max)
{
    const range = max - min;

     var n = (Math.random() * range) + min;

    return n;
}


module.exports = ClickEvents;