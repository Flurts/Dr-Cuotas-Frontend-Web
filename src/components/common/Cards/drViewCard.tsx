import { useEffect, useState } from 'react';

import settings from '@/settings';

interface Surgery {
  name: string;
  status: string;
  amount: number;
  category: string;
  subcategory: string;
}

interface Adjudicated {
  status: string;
  totalPaid: number | null;
  totalPaidSum: number | null;
  total_price: number;
  quotas_paid: number;
  quotas_number: number;
  quota_price: number;
  user: {
    first_name: string;
    last_access: string;
  };
  adjudicated_status: string;
  surgery: {
    name: string;
  };
}

const fetchSurgeries = async (setSurgeries: (data: Surgery[]) => void) => {
  const token = localStorage.getItem('accessToken');
  const query = `
    query GetMySurgeries {
      getMySurgeries {
        name
        status
        amount
        category
        subcategory
      }
    }
  `;

  try {
    const response = await fetch(`${settings.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    if (data.errors)
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

    setSurgeries(data.data.getMySurgeries || []);
  } catch (error) {
    console.error('Error al obtener las cirugías:', error);
  }
};

const fetchAdjudicated = async (
  setAdjudicated: (data: Adjudicated[]) => void,
) => {
  const token = localStorage.getItem('accessToken');
  const query = `
    query GetAdjudicatedByDoctor {
      getAdjudicatedByDoctor {
        status
        totalPaid
        totalPaidSum
        total_price
        quotas_paid
        quotas_number
        quota_price
        user {
          first_name
          last_access
        }
        adjudicated_status
        surgery {
          name
        }
      }
    }
  `;

  try {
    const response = await fetch(`${settings.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    if (data.errors)
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

    setAdjudicated(data.data.getAdjudicatedByDoctor || []);
  } catch (error) {
    console.error('Error al obtener adjudicaciones:', error);
  }
};

const SurgeryCard = ({ surgeries }: { surgeries: Surgery[] }) => (
  <div className="w-full bg-white rounded-2xl shadow-lg p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
      {surgeries.length > 0 ? (
        surgeries.map((surgery, index) => (
          <div
            key={index}
            className="bg-drcuotasPrimary-bg bg-opacity-10 rounded-xl p-4 border border-drcuotasPrimary-text border-opacity-20 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-drcuotasPrimary-text truncate">
                {surgery.name}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  surgery.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {surgery.status}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Amount:</span> $
                {surgery.amount.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Category:</span>{' '}
                {surgery.category}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Subcategory:</span>{' '}
                {surgery.subcategory}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full">
          No hay cirugías disponibles
        </p>
      )}
    </div>
  </div>
);

const AdjudicatedCard = ({ adjudicated }: { adjudicated: Adjudicated[] }) => (
  <div className="w-full bg-white rounded-2xl shadow-lg p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
      {adjudicated.length > 0 ? (
        adjudicated.map((adj, index) => (
          <div
            key={index}
            className="bg-drcuotasPrimary-bg bg-opacity-10 rounded-xl p-4 border border-drcuotasPrimary-text border-opacity-20 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-drcuotasPrimary-text truncate">
                {adj.user.first_name}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  adj.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {adj.status}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Total Price:</span> $
                {adj.total_price.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Quotas:</span> {adj.quotas_paid}/
                {adj.quotas_number}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Surgery:</span> {adj.surgery.name}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Adjudication Status:</span>{' '}
                {adj.adjudicated_status}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Last Access:</span>{' '}
                {new Date(adj.user.last_access).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full">
          No hay adjudicaciones disponibles
        </p>
      )}
    </div>
  </div>
);

const DrViewCard = () => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [adjudicated, setAdjudicated] = useState<Adjudicated[]>([]);

  useEffect(() => {
    void fetchSurgeries(setSurgeries);
    void fetchAdjudicated(setAdjudicated);
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-drcuotasPrimary-bg bg-opacity-10 p-8"
      style={{ backgroundImage: "url('/images/fondo/DrCuotasFondo.svg')" }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-drcuotasPrimary-text mb-6">
          Mi Panel de Cirugías
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-drcuotasPrimary-text mb-4">
            Mis Cirugías
          </h2>
          <SurgeryCard surgeries={surgeries} />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-drcuotasPrimary-text mb-4">
            Mis Adjudicados
          </h2>
          <AdjudicatedCard adjudicated={adjudicated} />
        </div>
      </div>
    </div>
  );
};

export default DrViewCard;
