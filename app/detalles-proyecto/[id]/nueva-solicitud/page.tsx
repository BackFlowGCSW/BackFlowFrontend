"use client";

import { useParams } from 'next/navigation';

export default function NuevaSolicitudPage() {
  const params = useParams();
  const proyectoId = params.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nueva Solicitud</h1>
      <p>Estás creando una solicitud para el proyecto con ID: <strong>{proyectoId}</strong></p>
      {/* Aquí puedes agregar los campos o formulario que necesites */}
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="titulo">
            Título de la solicitud
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Ejemplo: Cambio de fecha"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            placeholder="Detalla tu solicitud..."
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}