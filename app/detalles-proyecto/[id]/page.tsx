"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import TimelineCronograma from '@/components/ui/TimelineCronograma';

// Importa los componentes de Shadcn UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  metodologia: string;
  fechaInicio: string;
  fechaFin: string;
}

export default function DetalleProyectosPage() {
  const params = useParams<{ proyectoId: string; orgId: string }>();
  const proyectoId = params?.proyectoId || '';
  const organizacionId = params?.orgId || '';

  // Estados
  const [proyectoInfo, setProyectoInfo] = useState({
    nombre: "Nombre del Proyecto",
    estado: "Activo",
    fechaInicio: "YYYY-MM-DD",
    descripcion: "Descripción del proyecto...",
    metodologia: "SCRUM",
    fechaFin: "YYYY-MM-DD",
  });

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectoUid, setProyectoUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo para las tareas (pestaña Fases)
  const [tareas, setTareas] = useState([
    { nombre: "Tarea Ejemplo", campo1: "XXXXXX", campo2: "XXXXXX" },
  ]);

  // Estado para el formulario de invitación a miembros
  const [invitacionMiembro, setInvitacionMiembro] = useState({ email: '', rol: '' });
  const roles = ["Desarrollador", "Diseñador", "Tester", "Product Owner"];

  const handleInvitationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvitacionMiembro(prevState => ({ ...prevState, [name]: value }));
  };

  const handleInvitationSelectChange = (value: string) => {
    setInvitacionMiembro(prevState => ({ ...prevState, rol: value }));
  };

  const handleSendInvitation = () => {
    console.log("Enviando invitación:", invitacionMiembro, "para el proyecto:", proyectoId);
    setInvitacionMiembro({ email: '', rol: '' });
  };

  // *** Estado y funciones para el modal "Agregar Tarea" ***
  const [isTareaModalOpen, setIsTareaModalOpen] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaTermino: '',
    asociado: '',
    nivelPrioridad: ''
  });

  const handleTareaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaTarea(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateTarea = () => {
    console.log("Creando tarea:", nuevaTarea, "para el proyecto:", proyectoId);
    setIsTareaModalOpen(false);
    setNuevaTarea({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', asociado: '', nivelPrioridad: '' });
  };

  const handleOpenTareaModal = () => {
    setIsTareaModalOpen(true);
  };

  const handleCloseTareaModal = () => {
    setIsTareaModalOpen(false);
    setNuevaTarea({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', asociado: '', nivelPrioridad: '' });
  };
  // *** Fin del estado y funciones para el modal "Agregar Tarea" ***

  // Cargar proyectos desde la API
  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://161.132.45.35:8003/proyectos/?org=${organizacionId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: Proyecto[] = await res.json();
      setProyectos(data);

      // Guardar UID del proyecto actual si está en params
      if (data.length > 0 && proyectoId) {
        const proyectoActual = data.find(p => p.id === proyectoId) || data[0];
        setProyectoUid(proyectoActual.id);
        setProyectoInfo({
          nombre: proyectoActual.nombre,
          estado: "Activo",
          fechaInicio: proyectoActual.fechaInicio,
          descripcion: proyectoActual.descripcion,
          metodologia: proyectoActual.metodologia,
          fechaFin: proyectoActual.fechaFin,
        });
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, [organizacionId, proyectoId]);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      {/* Barra Superior */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center mr-4">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">U</div>
            <span>VER PERFIL</span>
          </div>
          <span className="mr-auto">✉️</span>
          <div className="ml-auto mr-auto">
            <Image src="/backflow-logo.svg" alt="BackFlow Logo" width={100} height={30} />
          </div>
          <Link href="/logout" className="ml-auto">🚪</Link>
        </div>
      </div>

      {/* Enlace Regresar */}
      <div className="p-4 pb-0">
        <Link href="/proyectos" className="text-blue-500 hover:underline flex items-center">
          ← Regresar
        </Link>
      </div>

      {/* Modal Agregar Tarea */}
      <Dialog open={isTareaModalOpen} onOpenChange={handleCloseTareaModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Tarea</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-nombre" className="text-right">Nombre:</label>
              <Input id="tarea-nombre" name="nombre" value={nuevaTarea.nombre} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-descripcion" className="text-right">Descripción:</label>
              <Input id="tarea-descripcion" name="descripcion" value={nuevaTarea.descripcion} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-fechaInicio" className="text-right">Fecha inicio:</label>
              <Input id="tarea-fechaInicio" name="fechaInicio" value={nuevaTarea.fechaInicio} onChange={handleTareaInputChange} className="col-span-3" type="date" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-fechaTermino" className="text-right">Fecha término:</label>
              <Input id="tarea-fechaTermino" name="fechaTermino" value={nuevaTarea.fechaTermino} onChange={handleTareaInputChange} className="col-span-3" type="date" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-asociado" className="text-right">Asociado:</label>
              <Input id="tarea-asociado" name="asociado" value={nuevaTarea.asociado} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-nivelPrioridad" className="text-right">Prioridad:</label>
              <Input id="tarea-nivelPrioridad" name="nivelPrioridad" value={nuevaTarea.nivelPrioridad} onChange={handleTareaInputChange} className="col-span-3" placeholder="Alta/Media/Baja" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseTareaModal}>Cancelar</Button>
            <Button onClick={handleCreateTarea}>Crear Tarea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Información Proyecto</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div><p className="font-semibold">Nombre:</p><p>{proyectoInfo.nombre}</p></div>
              <div><p className="font-semibold">Descripción:</p><p>{proyectoInfo.descripcion}</p></div>
              <div><p className="font-semibold">Estado:</p><p>{proyectoInfo.estado}</p></div>
              <div><p className="font-semibold">Metodología:</p><p>{proyectoInfo.metodologia}</p></div>
              <div><p className="font-semibold">Fecha Inicio:</p><p>{proyectoInfo.fechaInicio}</p></div>
              <div><p className="font-semibold">Fecha Fin:</p><p>{proyectoInfo.fechaFin}</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Solicitudes</CardTitle>
              <Link href={`/detalles-proyecto/${proyectoId}/nueva-solicitud`}>
                <Button size="icon">+</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input placeholder="Solicitud Ejemplo" />
              <Input placeholder="XXXXXX" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fases">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="fases">Fases</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="miembros">Miembros</TabsTrigger>
          </TabsList>
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
          <TabsContent value="fases">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tareas.map((tarea, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{tarea.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <Input placeholder={tarea.campo1} />
                    <Input placeholder={tarea.campo2} />
                  </CardContent>
                </Card>
              ))}
              <div className="flex items-end justify-center sm:justify-start">
                <Button onClick={handleOpenTareaModal}>Crear</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="cronograma">
            <div className="w-full h-[600px]">
              <TimelineCronograma />
            </div>
          </TabsContent>
          <TabsContent value="miembros">
            <div className="flex justify-center p-4">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle className="text-center">Invitar Miembro</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="XXXXXX"
                      value={invitacionMiembro.email}
                      onChange={handleInvitationInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="rol" className="block text-sm font-medium mb-1">Rol:</label>
                    <Select onValueChange={handleInvitationSelectChange} value={invitacionMiembro.rol}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="XXXXXX" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(rol => (
                          <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSendInvitation} className="w-full mt-4">
                    Enviar Invitación
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}