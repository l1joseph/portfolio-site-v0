'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SkillsVisualization = () => {
  const data = {
    labels: ['Python', 'R', 'Machine Learning', 'Bioinformatics', 'Web Development', 'Data Visualization'],
    datasets: [
      {
        label: 'Skill Level',
        data: [90, 85, 80, 85, 75, 80],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'My Skills',
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default SkillsVisualization;