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
  { month: 'Enero', revenue: 1200 },
  { month: 'Febrero', revenue: 1250 },
  { month: 'Marzo', revenue: 1140 },
  { month: 'Abril', revenue: 4480 },
  { month: 'Mayo', revenue: 1200 },
  { month: 'Junio', revenue: 2100 },
  { month: 'Julio', revenue: 3400 },
  { month: 'Agosto', revenue: 4100 },
  { month: 'Septiembre', revenue: 2100 },
  { month: 'Octubre', revenue: 6100 },
  { month: 'Noviembre', revenue: 900 },
  { month: 'Diciembre', revenue: 400 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-drcuotasPrimary-bg w-full h-96 shadow-drcuotasPrimary flex justify-center items-center flex-col">
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
