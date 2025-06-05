/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

export enum SurgeryCategories {
  FacialSurgeries = 'FacialSurgeries',
  BreastSurgeries = 'BreastSurgeries',
  BodySurgeries = 'BodySurgeries',
  ReconstructiveSurgeries = 'ReconstructiveSurgeries',
  GeneralSurgeries = 'GeneralSurgeries',
  CosmeticSurgeries = 'CosmeticSurgeries',
  OrthopedicSurgeries = 'OrthopedicSurgeries',
  NeurologicalSurgeries = 'NeurologicalSurgeries',
  OphthalmicSurgeries = 'OphthalmicSurgeries',
  PediatricSurgeries = 'PediatricSurgeries',
  UrologicSurgeries = 'UrologicSurgeries',
  GynecologicSurgeries = 'GynecologicSurgeries',
  ThoracicSurgeries = 'ThoracicSurgeries',
  TransplantSurgeries = 'TransplantSurgeries',
  ENTSurgeries = 'ENTSurgeries',
  DentalSurgeries = 'DentalSurgeries',
}

// Mapeo de categorías para mostrar nombres amigables
const categoryLabels = {
  [SurgeryCategories.FacialSurgeries]: 'Cirugías Faciales',
  [SurgeryCategories.BreastSurgeries]: 'Cirugías Mamarias',
  [SurgeryCategories.BodySurgeries]: 'Cirugías Corporales',
  [SurgeryCategories.ReconstructiveSurgeries]: 'Cirugías Reconstructivas',
  [SurgeryCategories.GeneralSurgeries]: 'Cirugías Generales',
  [SurgeryCategories.CosmeticSurgeries]: 'Cirugías Cosméticas',
  [SurgeryCategories.OrthopedicSurgeries]: 'Cirugías Ortopédicas',
  [SurgeryCategories.NeurologicalSurgeries]: 'Cirugías Neurológicas',
  [SurgeryCategories.OphthalmicSurgeries]: 'Cirugías Oftálmicas',
  [SurgeryCategories.PediatricSurgeries]: 'Cirugías Pediátricas',
  [SurgeryCategories.UrologicSurgeries]: 'Cirugías Urológicas',
  [SurgeryCategories.GynecologicSurgeries]: 'Cirugías Ginecológicas',
  [SurgeryCategories.ThoracicSurgeries]: 'Cirugías Torácicas',
  [SurgeryCategories.TransplantSurgeries]: 'Cirugías de Trasplante',
  [SurgeryCategories.ENTSurgeries]: 'Cirugías ORL',
  [SurgeryCategories.DentalSurgeries]: 'Cirugías Dentales',
};

interface Filters {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
}

export default function StoreView() {
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 100, offset: 0 },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    category: '',
    minPrice: null,
    maxPrice: null,
    minRating: null,
    sortBy: 'popular',
  });

  // Efecto para leer parámetros de la URL y aplicar filtros
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (
      categoryFromUrl &&
      Object.values(SurgeryCategories).includes(
        categoryFromUrl as SurgeryCategories,
      )
    ) {
      setFilters((prev) => ({
        ...prev,
        category: categoryFromUrl,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (data && !error) {
      setSurgeriesList(data.getAllSurgeriesWithValues as Surgery[]);
    } else if (error) {
      console.error('Error fetching surgeries:', error);
      setSurgeriesList([]);
    }
  }, [data, error]);

  // Filtrado y ordenamiento con useMemo para optimización
  const filteredAndSortedSurgeries = useMemo(() => {
    let result = [...surgeriesList];

    // Filtro por búsqueda
    if (searchTerm) {
      result = result.filter((surgery) =>
        surgery.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filtro por categoría
    if (filters.category) {
      result = result.filter(
        (surgery) => surgery.category === filters.category,
      );
    }

    // Filtro por precio
    if (filters.minPrice !== null) {
      result = result.filter(
        (surgery) => (surgery.amount ?? 0) >= filters.minPrice!,
      );
    }
    if (filters.maxPrice !== null) {
      result = result.filter(
        (surgery) => (surgery.amount ?? 0) <= filters.maxPrice!,
      );
    }

    // Filtro por rating
    if (filters.minRating !== null) {
      result = result.filter(
        (surgery) => (surgery.rating ?? 0) >= filters.minRating!,
      );
    }

    // Ordenamiento
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return (a.name ?? '').localeCompare(b.name ?? '');
        case 'price-asc':
          return (a.amount ?? 0) - (b.amount ?? 0);
        case 'price-desc':
          return (b.amount ?? 0) - (a.amount ?? 0);
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'popular':
        default:
          // Podrías usar un campo de popularidad o rating como proxy
          return (b.rating ?? 0) - (a.rating ?? 0);
      }
    });

    return result;
  }, [surgeriesList, searchTerm, filters]);

  const handleFilterChange = (filterType: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: null,
      maxPrice: null,
      minRating: null,
      sortBy: 'popular',
    });
    setSearchTerm('');
    // Limpiar también la URL
    router.push('/store');
  };

  // Función para manejar el click y redirigir
  const handleCardClick = (surgeryId: string) => {
    router.push(`/store/${surgeryId}`);
  };

  return (
    <div className="w-full min-h-screen p-10">
      <div className="flex flex-col xl:flex-row gap-2">
        {/* Sidebar - Filtros */}
        <div
          className={`${showFilters ? 'block' : 'hidden'} xl:block xl:w-80 xl:flex-shrink-0`}
        >
          <div className="bg-white w-full h-screen border p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-sm ">Filtros</h2>
              <button onClick={clearFilters} className="text-sm text-blue-600 ">
                Limpiar
              </button>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cirugía
              </label>
              <select
                value={filters.category}
                onChange={(e) => {
                  handleFilterChange('category', e.target.value);
                }}
                className="w-full p-2.5 lg:p-3 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las categorías</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rango de precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de precio
              </label>
              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <input
                  type="number"
                  placeholder="Precio mín."
                  value={filters.minPrice ?? ''}
                  onChange={(e) => {
                    handleFilterChange(
                      'minPrice',
                      e.target.value ? Number(e.target.value) : null,
                    );
                  }}
                  className="p-2.5 lg:p-3 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Precio máx."
                  value={filters.maxPrice ?? ''}
                  onChange={(e) => {
                    handleFilterChange(
                      'maxPrice',
                      e.target.value ? Number(e.target.value) : null,
                    );
                  }}
                  className="p-2.5 lg:p-3 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="w-full  p-10">
          {/* Barra de búsqueda y controles */}
          <div className="bg-white mb-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-full ">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Buscar cirugías..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 lg:py-3 text-sm border  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Contador de resultados */}
                <span className="text-sm text-gray-600 text-center sm:text-left whitespace-nowrap">
                  {filteredAndSortedSurgeries.length} resultado
                  {filteredAndSortedSurgeries.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Lista de cirugías */}
          {filteredAndSortedSurgeries.length > 0 ? (
            <div className="space-y-4">
              {filteredAndSortedSurgeries.map((surgery) => (
                //  Producto Tienda
                <div
                  key={surgery.id}
                  onClick={() => {
                    handleCardClick(surgery.id);
                  }}
                  className="w-full max-w-md mx-auto sm:max-w-full sm:h-52  overflow-hidden border   hover:shadow-lg hover:shadow-drcuotasPrimary-bg transition-shadow duration-500 flex flex-col sm:flex-row bg-white cursor-pointer"
                >
                  {/* Imagen más grande y bien centrada */}
                  <div className="w-full sm:w-48 h-48 sm:h-full relative">
                    <img
                      src={
                        surgery.file_banner?.file_link ??
                        '/images/elements/specialty.svg'
                      }
                      alt={surgery.name || 'Cirugía'}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                        {surgery.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {categoryLabels[
                          surgery.category as SurgeryCategories
                        ] || 'General'}
                      </span>
                    </div>

                    {surgery.amount && (
                      <span className="mt-4 text-2xl font-bold text-green-600">
                        ${surgery.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow-sm border p-8 lg:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FaSearch size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron cirugías
              </h3>
              <p className="text-gray-600 mb-4 text-sm lg:text-base">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm lg:text-base"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
