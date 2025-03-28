import React, { useEffect, useState } from 'react';
import { FaListUl, FaThLarge } from 'react-icons/fa'; // Para el toggle de vista

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';
import AdComponents from '@/components/common/ViewElements/AdComponents';

export default function StoreView() {
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 20, offset: 0 },
  });

  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('destacado'); // Ejemplo
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (data && !error) {
      setSurgeriesList(data.getAllSurgeriesWithValues as Surgery[]);
    } else if (error) {
      console.error(error);
      setSurgeriesList([]);
    }
  }, [data, error]);

  // Filtrado básico por nombre (ejemplo)
  const filteredSurgeries = surgeriesList.filter((surgery) =>
    surgery.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Ordenar (ejemplo simplificado)
  const sortedSurgeries = [...filteredSurgeries].sort((a, b) => {
    if (sortOption === 'destacado') {
      // Podrías ordenar por rating, por ejemplo
      return (b.rating ?? 0) - (a.rating ?? 0);
    } else if (sortOption === 'precio') {
      // Si tuvieras un campo "price" o "cost" en Surgery, podrías usarlo
      return (a.cost ?? 0) - (b.cost ?? 0);
    }
    return 0;
  });

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-center p-10">
        {/* Contenedor principal: Filtros + Contenido */}
        <div className=" w-full h-full flex flex-col lg:flex-row gap-2">
          {/* Panel lateral de filtros */}
          <aside className="w-full lg:w-64 h-auto border rounded-xl p-4 flex-shrink-0">
            <div className="mb-4">
              <h2 className="text-lg mb-2 text-drcuotasTertiary-text font-black uppercase leading-tight tracking-tight">
                Filtros
              </h2>
              <button className="text-sm text-drcuotasPrimary-text hover:underline">
                Limpiar filtros
              </button>
            </div>

            {/* Categorías (ejemplo) */}
            <div className="mb-6">
              <h3 className="text-sm mb-2 text-drcuotasTertiary-text font-bold uppercase leading-tight tracking-tight">
                Categorías
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  <label>
                    <input type="checkbox" className="mr-2 " />
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Todos
                    </span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" className="mr-2" />
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Rostro
                    </span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" className="mr-2" />
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Cuerpo
                    </span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" className="mr-2" />
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Mamarios
                    </span>
                  </label>
                </li>
              </ul>
            </div>

            {/* Precio (ejemplo con rango) */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2 text-drcuotasTertiary-text  uppercase leading-tight tracking-tight">
                Precio
              </h3>
              <input type="range" min="0" max="2000" className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>2000</span>
              </div>
            </div>

            {/* Estado (ejemplo) */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2 uppercase leading-tight tracking-tight text-drcuotasTertiary-text">
                Estado
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  <label>
                    <input type="checkbox" className="mr-2" />
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Ofertas
                    </span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" className="mr-2" />
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Novedades
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1 flex flex-col">
            {/* Barra de búsqueda y opciones */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
              {/* Búsqueda */}
              <div className="flex items-center w-full md:w-1/2 border rounded-md px-2 py-1">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="flex-1 outline-none leading-tight tracking-tight text-drcuotasTertiary-text p-1 w-full"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>

              {/* Selector de orden y vista */}
              <div className="flex items-center gap-4">
                <select
                  className="border rounded-md px-2 py-1 text-sm"
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                  }}
                >
                  <option
                    value="destacado"
                    className="leading-tight tracking-tight"
                  >
                    <span className="leading-tight tracking-tight text-drcuotasTertiary-text">
                      Destacados
                    </span>
                  </option>
                  <option value="precio">Precio</option>
                  {/* Agrega más opciones según tus necesidades */}
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setViewMode('grid');
                    }}
                    className={`p-1 rounded ${
                      viewMode === 'grid' ? 'bg-gray-300' : ''
                    }`}
                  >
                    <FaThLarge />
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('list');
                    }}
                    className={`p-1 rounded ${
                      viewMode === 'list' ? 'bg-gray-300' : ''
                    }`}
                  >
                    <FaListUl />
                  </button>
                </div>
              </div>
            </div>

            {/* Cantidad de productos encontrados */}
            <div className="mb-4 text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
              {sortedSurgeries.length} productos encontrados
            </div>

            {/* Grilla o lista de productos */}
            {sortedSurgeries.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-60 '
                    : 'flex flex-col gap-4'
                }
              >
                {sortedSurgeries.map((surgery) => (
                  <div
                    key={surgery.id}
                    className="bg-white w-80 border  rounded-xl overflow-hidden flex flex-col items-center"
                  >
                    {/* Card principal (imagen, título, descripción, etc.) */}
                    <SpecialtyCard
                      title={surgery.name}
                      description={
                        surgery.description ?? 'Descripción no disponible'
                      }
                      rating={surgery.rating}
                      imageUrl={
                        surgery.file_banner?.file_link ??
                        '/images/elements/specialty.svg'
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-drcuotasTertiary-text text-center text-lg">
                No hay cirugías disponibles.
              </span>
            )}
          </div>
        </div>
      </div>
      <AdComponents />
    </>
  );
}
