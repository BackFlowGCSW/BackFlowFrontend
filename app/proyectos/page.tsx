// app/proyectos/page.tsx
'use client';

interface ProyectoPageProps {
  params: {
    orgId: string;
  };
}


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Proyecto {
  uid: string;
  nombre: string;
  descripcion: string;
  fecha_creacion: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  metodologia: string | null;
  repositorio: string | null;
}

const METODOLOGIAS = [
  'SCRUM', 'RUP', 'XP', 'KANBAN', 'CASCADA', 
  'LEAN', 'DSDM', 'FDD', 'CRYSTAL', 'AUP', 
  'SAFE', 'DEVOPS'
];

export default function ProyectosPage() {
  const searchParams = useSearchParams();
  const organizacionId = searchParams.get('org') || '';

  // Estado de listado
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal de creación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaTermino: '',
    metodologia: ''
  });

  // Funciones de formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoProyecto(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectMetodologia = (m: string) => {
    setNuevoProyecto(prev => ({ ...prev, metodologia: m }));
  };
  const handleNextStep = () => setCurrentStep(s => s + 1);
  const handlePreviousStep = () => setCurrentStep(s => s - 1);

  // Crea proyecto llamando al API
  const handleCrearProyecto = async () => {
    // Obtener el id actual cada vez que se ejecuta la función
    const currentOrgId = searchParams.get('org') || '';
    if (!currentOrgId) {
      alert('Falta el ID de la organización');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const payload = {
        nombre: nuevoProyecto.nombre,
        descripcion: nuevoProyecto.descripcion,
        fecha_inicio: nuevoProyecto.fechaInicio || undefined,
        fecha_fin: nuevoProyecto.fechaTermino || undefined,
        metodologia: nuevoProyecto.metodologia,
        organizacion_id: currentOrgId  // Usar el id actual
      };
      const res = await fetch('http://161.132.45.35:8003/proyectos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.mensaje || `HTTP ${res.status}`);
      alert('Proyecto creado correctamente');
      // refresca la lista
      fetchProyectos();
      // cierra y resetea modal
      setIsModalOpen(false);
      setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', metodologia: '' });
      setCurrentStep(1);
    } catch (err: any) {
      alert('Error al crear proyecto: ' + err.message);
    }
};

  // API: lista proyectos
  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://161.132.45.35:8003/proyectos/?org=${organizacionId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Proyecto[] = await res.json();
      setProyectos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, [organizacionId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', metodologia: '' });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Barra Superior */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center mr-4">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">
              U
            </div>
            <span>VER PERFIL</span>
          </div>
          <span className="mr-auto">✉️</span>
          <div className="ml-auto mr-auto">
            <Image src="/backflow-logo.svg" alt="BackFlow Logo" width={100} height={30} />
          </div>
          <Link href="/logout" className="ml-auto">🚪</Link>
        </div>
      </div>

      {/* Modal de Agregar Proyecto */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentStep === 1 ? 'Crear nuevo proyecto' : 'Seleccionar metodología'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="nombre" className="text-right">Nombre:</label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={nuevoProyecto.nombre}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Nombre del proyecto"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="descripcion" className="text-right">Descripción:</label>
                  <Input
                    id="descripcion"
                    name="descripcion"
                    value={nuevoProyecto.descripcion}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Descripción breve"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="fechaInicio" className="text-right">Fecha inicio:</label>
                  <Input
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    value={nuevoProyecto.fechaInicio}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="fechaTermino" className="text-right">Fecha término:</label>
                  <Input
                    id="fechaTermino"
                    name="fechaTermino"
                    type="date"
                    value={nuevoProyecto.fechaTermino}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            {currentStep === 2 && (
              <div className="grid grid-cols-3 gap-4">
                {METODOLOGIAS.map(m => (
                  <Card
                    key={m}
                    className={`cursor-pointer p-4 text-center ${
                      nuevoProyecto.metodologia === m ? 'border-blue-500 border-2' : ''
                    }`}
                    onClick={() => handleSelectMetodologia(m)}
                  >
                    <CardTitle className="text-lg">{m}</CardTitle>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
            {currentStep === 1 && <Button onClick={handleNextStep}>Siguiente</Button>}
            {currentStep === 2 && (
              <>
                <Button variant="outline" onClick={handlePreviousStep}>Anterior</Button>
                <Button onClick={handleCrearProyecto} disabled={!nuevoProyecto.metodologia}>Crear</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="proyectos">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          </TabsList>
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="proyectos">
            {loading ? (
              <p>Cargando proyectos…</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {proyectos.map(p => (
                  <Link key={p.uid} href={`/detalles-proyecto/${p.uid}?org=${organizacionId}`}>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{p.nombre}</CardTitle>
                        <CardDescription>{p.descripcion}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2 bg-gray-300" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                <Card className="flex flex-col items-center justify-center p-6">
                  <CardTitle className="text-center mb-4">Agregar Proyecto</CardTitle>
                  <Button onClick={handleOpenModal}>Agregar</Button>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pendientes">
            <p>No hay proyectos pendientes.</p>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Link href="/organizaciones" className="text-blue-500 hover:underline">
            ← Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}
