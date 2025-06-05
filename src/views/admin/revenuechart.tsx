'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Enero', revenue: 0 },
  { month: 'Febrero', revenue: 0 },
  { month: 'Marzo', revenue: 0 },
  { month: 'Abril', revenue: 0 },
  { month: 'Mayo', revenue: 0 },
  { month: 'Junio', revenue: 0 },
  { month: 'Julio', revenue: 0 },
  { month: 'Agosto', revenue: 0 },
  { month: 'Septiembre', revenue: 0 },
  { month: 'Octubre', revenue: 0 },
  { month: 'Noviembre', revenue: 0 },
  { month: 'Diciembre', revenue: 0 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white  border  w-full h-screen flex justify-center items-center flex-col">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} className="text-xs w-full h-full p-4">
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8576FF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
