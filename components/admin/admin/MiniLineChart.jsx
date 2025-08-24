// components/MiniLineChart.tsx
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

const MiniLineChart = ({ data, color = "#d14900" }) => {
  return (
    <Line
      data={{
        labels: data.map((_, i) => `روز ${i + 1}`),
        datasets: [
          {
            data,
            borderColor: color,
            backgroundColor: `${color}22`,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            // callbacks: {
            //   label: (context) => `ارزش: ${context.parsed.y}`,
            // },
            backgroundColor: "#d14900", // Dark background
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 8,
            cornerRadius: 6,
          },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      }}
    />
  );
};

export default MiniLineChart;
