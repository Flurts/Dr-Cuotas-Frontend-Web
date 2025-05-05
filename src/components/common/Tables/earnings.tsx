import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Cargar el componente de forma dinámica solo en el cliente
const Chart = dynamic(async () => await import('react-apexcharts'), {
  ssr: false,
});

const Earnings: React.FC = () => {
  const [chartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [5000, 10000, 20000, 30000, 40000, 5500, 23000, 70500],
      },
    ],
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="1000"
          />
        </div>
      </div>
    </div>
  );
};

export default Earnings;
