import React, { useEffect, useState } from 'react';
import { FaListUl, FaThLarge } from 'react-icons/fa'; // Para el toggle de vista

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

export default function StoreView() {
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 20, offset: 0 },
  });

  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption] = useState('destacado'); // Ejemplo
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
  console.log('Sorted Surgeries:', data);

  return (
    <>
      <div className="w-full h-screen flex flex-row justify-center items-center gap-4 p-10">
        {/* Barra lateral - Filtros  */}
        <>
          <div className="w-80 h-full border border-black flex flex-col p-4 gap-4">
            <h1 className="text-xl  leading-tight tracking-tight">Filtros</h1>

            {/* Tipo de cirugía */}
            <div>
              <label className="text-sm leading-tight tracking-tight">
                Tipo de cirugía
              </label>
              <select className="w-full p-2 border border-black text-xs">
                <option value="">Todas</option>
                <option value="facial">Facial</option>
                <option value="corporal">Corporal</option>
                <option value="mamaria">Mamaria</option>
              </select>
            </div>

            {/* Rango de precio */}
            <div>
              <label className="text-sm leading-tight tracking-tight">
                Rango de precio
              </label>
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="number"
                  placeholder="$ Max"
                  className="w-full p-2 border border-black"
                />
              </div>
            </div>

            {/* Popularidad o puntuación */}
            <div>
              <label className="text-sm leading-tight tracking-tight">
                Ordenar por
              </label>
              <select className="w-full p-2  border border-black text-xs">
                <option value="populares">Más populares</option>
                <option value="mejor_valoradas">Mejor valoradas</option>
                <option value="precio_menor">Precio más bajo</option>
                <option value="precio_mayor">Precio más alto</option>
              </select>
            </div>

            {/* Botón aplicar filtros */}
            <button className="w-full bg-black text-white p-2 hover:bg-gray-800 transition">
              Aplicar filtros
            </button>
          </div>
        </>
        {/* Mostrario de Productos  */}
        <>
          <div className="w-full h-full flex flex-col border border-black gap-20 p-10">
            {/* Barra de búsqueda y opciones */}
            <>
              <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
                {/* Búsqueda */}
                <div className="flex items-center w-full md:w-1/2 border border-black px-2 py-2">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="flex-1 outline-none leading-tight tracking-tight w-full text-black"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </div>

                {/* Selector de orden y vista */}
                <div className="w-2/2 flex items-center gap-4">
                  <div className="text-xs leading-tight tracking-tight ">
                    {sortedSurgeries.length} encontrados
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setViewMode('grid');
                      }}
                      className={`p-2 ${
                        viewMode === 'grid' ? 'bg-gray-300' : ''
                      }`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => {
                        setViewMode('list');
                      }}
                      className={`p-2  ${
                        viewMode === 'list' ? 'bg-gray-300' : ''
                      }`}
                    >
                      <FaListUl />
                    </button>
                  </div>
                </div>
              </div>
            </>

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
                      id={surgery.id}
                      price={surgery.amount}
                      category={surgery.category}
                      description={
                        surgery.description ?? 'Descripción no disponible'
                      }
                      rating={surgery.rating}
                      doctors={(surgery.doctors ?? []).map((d) => ({
                        id: d.doctor?.id ?? '',
                        provincia: d.doctor?.provincia ?? 'Sin provincia',
                        first_name: d.doctor?.user?.first_name ?? 'Sin nombre',
                        last_name: d.doctor?.user?.last_name ?? 'Sin apellido',
                      }))}
                      imageUrl={
                        surgery.file_banner?.file_link ??
                        '/images/elements/specialty.svg'
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <span className="text-xs leading-tight tracking-tight">
                  No hay cirugías disponibles.
                </span>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
}
