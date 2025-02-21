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
    <div className="flex flex-col gap-20  rounded-lg w-full h-full justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <span className="uppercase font-black leading-tight tracking-tight truncate text-drcuotasPrimary-text text-8xl">
          Comenzar Sorteo
        </span>
        <span className="uppercase font-bold leading-tight tracking-tight truncate text-drcuotasPrimary-text text-xl">
          Solo entre Adjudicados con más de 4 cuotas
        </span>
      </div>

      <div className="w-full flex flex-row gap-2 justify-center items-center px-20">
        <input
          type="text"
          placeholder="Ingrese el premio"
          className="border px-4 h-16 rounded-lg w-full border-drcuotasPrimary"
          value={premio}
          onChange={(e) => {
            setPremio(e.target.value);
          }}
        />

        <button
          onClick={handleSortear}
          className="bg-drcuotasSecondaryPrimaryColor text-white w-40 h-16 rounded-lg uppercase font-black leading-tight tracking-tight truncate"
          disabled={loading}
        >
          {loading ? 'Sorteando...' : 'Sortear'}
        </button>
      </div>

      {loading && <div className="mt-2 text-gray-500">Cargando...</div>}

      {ganador && !loading && (
        <div className="bg-white shadow-xl shadow-drcuotasPrimary border border-drcuotasPrimary rounded-xl  w-80 h-40 flex justify-center">
          <table className="w-full flex flex-col justify-center items-center">
            <thead className="w-full h-16 flex justify-center items-center">
              <tr className="border-b">
                <th className="uppercase font-black leading-tight tracking-tight truncate text-drcuotasPrimary-text text-2xl">
                  Ganador
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 uppercase font-bold text-drcuotasPrimary-text leading-tight tracking-tight truncate">
                  {ganador}
                </td>
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
