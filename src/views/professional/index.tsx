import OurProfessionals from '@/pages/view-account/doctor/[slug]';
import React, { useState } from 'react';
import { FaThLarge, FaListUl } from 'react-icons/fa';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  location: string;
}

export default function ProfessionalView() {
  // Datos de ejemplo (reemplaza con tu data real)
  const allEmployees: Employee[] = [
    {
      id: '1',
      name: 'Andy',
      position: 'Directora Ejecutiva',
      department: 'Cirugano',
      location: 'Argentina',
    },
    {
      id: '2',
      name: 'Brayan Suarez',
      position: 'Desarrollador Backend',
      department: 'Tecnologia',
      location: 'Colombia',
    },
    {
      id: '3',
      name: 'Miguel Jaimes',
      position: 'Desarrollador Frontend',
      department: 'Tecnologia',
      location: 'Colombia',
    },
    {
      id: '4',
      name: 'Tomas',
      position: 'Cirugano Plastico',
      department: 'Cirugano',
      location: 'Argentina',
    },
    {
      id: '5',
      name: 'Samuel',
      position: 'Cirugano Plastico',
      department: 'Cirugano',
      location: 'Argentina',
    },
    {
      id: '6',
      name: 'Moski',
      position: 'Cirugano Plastico',
      department: 'Cirugano',
      location: 'Argentina',
    },

  ];

  // Estados para filtros y vista
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [locationFilter, setLocationFilter] = useState('Todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Obtener departamentos y ubicaciones únicas (para los selects)
  const departments = ['Todos', ...new Set(allEmployees.map((e) => e.department))];
  const locations = ['Todas', ...new Set(allEmployees.map((e) => e.location))];

  // Filtrado
  const filteredEmployees = allEmployees.filter((emp) => {
    // Filtro por búsqueda
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por departamento
    const matchesDepartment =
      departmentFilter === 'Todos' || emp.department === departmentFilter;

    // Filtro por ubicación
    const matchesLocation =
      locationFilter === 'Todas' || emp.location === locationFilter;

    return matchesSearch && matchesDepartment && matchesLocation;
  });

  // Ejemplo de estadísticas
  const totalEmployees = allEmployees.length;
  const uniqueDepartments = new Set(allEmployees.map((e) => e.department)).size;
  const uniqueLocations = new Set(allEmployees.map((e) => e.location)).size;

  return (
    <>
    <div className="w-full h-full flex flex-col gap-2 p-20">

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Búsqueda */}
        <div className="flex items-center w-full sm:w-auto border rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="flex-1 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filtro departamento */}
          <select
            className="border px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50 transition"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Filtro ubicación */}
          <select
            className="border px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50 transition"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Toggle vista cuadrícula / lista */}
          <div className="flex items-center gap-1">
            <button
              className={`border px-3 py-2 text-sm rounded-l-md hover:bg-gray-50 transition 
                ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <FaThLarge />
            </button>
            <button
              className={`border px-3 py-2 text-sm rounded-r-md hover:bg-gray-50 transition 
                ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <FaListUl />
            </button>
          </div>
        </div>
      </div>

      {/* Conteo de empleados */}
      <div className="text-sm text-gray-500">
        {filteredEmployees.length} empleados encontrados
      </div>

      {/* Grid / Lista de empleados */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="border rounded-md overflow-hidden bg-white">
              {/* Imagen (placeholder) */}
              <div className="bg-gray-100 h-40 flex items-center justify-center">
                <span className="text-gray-400">Foto</span>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-base font-bold">{emp.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{emp.position}</p>
              
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <span className=' uppercase leading-tight tracking-tight'>{emp.location}</span>
                </div>
                <button className="border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition  uppercase leading-tight tracking-tight">
                  Ver perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 ">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="border rounded-md overflow-hidden bg-white flex">
              {/* Imagen (placeholder) */}
              <div className="bg-gray-100 w-32 h-32 flex items-center justify-center">
                <span className="text-gray-400">Foto</span>
              </div>
              {/* Info */}
              <div className="p-4 flex flex-col justify-center">
                <h3 className="text-base font-bold">{emp.name}</h3>
                <p className="text-sm text-gray-500">{emp.position}</p>
                <span className="text-sm text-gray-500">{emp.department}</span>
                <span className="text-sm text-gray-500">{emp.location}</span>
                <button className="border border-gray-300 rounded-md px-3 py-2 text-sm mt-2 hover:bg-gray-100 transition self-start">
                  Ver perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sección de estadísticas */}
      <div className="flex flex-col sm:flex-row gap-4 p-10">
        <div className="flex-1 border rounded-md p-4 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Total de empleados</span>
          <span className="text-2xl font-bold">{totalEmployees}</span>
        </div>
        <div className="flex-1 border rounded-md p-4 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Departamentos</span>
          <span className="text-2xl font-bold">{uniqueDepartments}</span>
        </div>
        <div className="flex-1 border rounded-md p-4 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Ubicaciones</span>
          <span className="text-2xl font-bold">{uniqueLocations}</span>
        </div>
      </div>
    </div>
    </>

  );
}
