import { useState } from 'react';

import settings from '@/settings';
const LotteryComponent = () => {
  const [premio, setPremio] = useState('');
  const [ganador, setGanador] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSortear = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              getUserLottery {
                user {
                  first_name
                  last_name
                  email
                }
                quotas_paid
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      if (data.getUserLottery.length > 0) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { first_name, last_name, email } = data.getUserLottery[0].user;
        setGanador(`${first_name} ${last_name} - ${email}`);
      } else {
        setGanador('No hay ganadores');
      }
    } catch (error) {
      console.error('Error al obtener el ganador:', error);
      setGanador('Error al obtener el ganador');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-gray-100 rounded-lg h-[500px] justify-center items-center">
      <span className="text-lg text-drcuotasPrimary-text font-semibold mb-10">
        Sorteo entre adjudicados con más de 4 cuotas
      </span>

      <input
        type="text"
        placeholder="Ingrese el premio"
        className="border p-2 rounded-lg"
        value={premio}
        onChange={(e) => {
          setPremio(e.target.value);
        }}
      />

      <button
        onClick={handleSortear}
        className="bg-drcuotasSecondaryPrimaryColor text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? 'Sorteando...' : 'Sortear'}
      </button>
      {loading && <div className="mt-2 text-gray-500">Cargando...</div>}

      {ganador && !loading && (
        <div className="mt-5 bg-white p-4 rounded-lg shadow-md w-80">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b">
                <th className="p-2">Ganador</th>
                <th className="p-2">Premio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-semibold">{ganador}</td>
                <td className="p-2 text-drcuotasSecondaryPrimaryColor-text">
                  {premio}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LotteryComponent;
