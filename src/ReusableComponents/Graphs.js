import React from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "../App.css";

export const Graphs = ({ chartData, chartType }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw !== undefined ? context.raw : context.data;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const renderChart = () => {
    switch (chartType.toLowerCase()) {
      case "doughnut":
        return <Doughnut data={chartData} options={chartOptions} />;
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "pie":
        return <Pie data={chartData} options={chartOptions} />;
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      default:
        return <p>Invalid chart type</p>;
    }
  };

  return (
    <div style={{ position: "relative", height: "300px", width: "100%" }}>
      {Object.keys(chartData).length > 0 && (
        <div className="chart-container" style={{ height: "100%", width: "100%" }}>
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default Graphs;
