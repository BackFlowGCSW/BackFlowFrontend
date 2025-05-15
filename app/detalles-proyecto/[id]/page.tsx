"use client"; // Mantén esto si usas hooks de cliente como useParams

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import TimelineCronograma from '@/components/ui/TimelineCronograma';

// Importa los componentes de Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Asegúrate de que este componente funciona o usa la simulación
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importa los componentes del Select
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Importa los componentes del Dialog

// Si necesitas Tablas en la pestaña de Miembros, impórtalas:
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// IMPORTANTE: Si Avatar, Separator u otros componentes siguen dando errores de Radix UI, elimínalos y simúlalos

export default function DetalleProyectosPage() {
  const params = useParams<{ proyectoId: string }>();
  const proyectoId = params.proyectoId;

  // Datos de ejemplo para la información del proyecto (reemplazar con datos reales)
  const proyectoInfo = {
    nombre: "Nombre del Proyecto",
    estado: "Activo",
    fechaInicio: "YYYY-MM-DD",
    descripcion: "Descripción del proyecto...",
    metodologia: "SCRUM",
    fechaFin: "YYYY-MM-DD",
  };

  // Datos de ejemplo para las tareas (pestaña Fases)
  const tareas = [
    { nombre: "Tarea Ejemplo", campo1: "XXXXXX", campo2: "XXXXXX" },
    // Añade más tareas si es necesario
  ];

  // Estado para el formulario de invitación a miembros (existente)
  const [invitacionMiembro, setInvitacionMiembro] = useState({ email: '', rol: '' });
  const roles = ["Desarrollador", "Diseñador", "Tester", "Product Owner"]; // Define tus roles aquí
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
  // Fin del estado y funciones del formulario de invitación


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

  // Función para manejar el cambio en los inputs del modal de tarea
  const handleTareaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaTarea(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   // Función para manejar el cambio en los Selects del modal de tarea (si fueran Selects)
   // Puedes añadir funciones similares a handleInvitationSelectChange si 'asociado' o 'nivelPrioridad' son Selects

  // Función para manejar la creación de la tarea
  const handleCreateTarea = () => {
    console.log("Creando tarea:", nuevaTarea, "para el proyecto:", proyectoId);
    // Aquí integrarías la lógica para crear la tarea (por ejemplo, a una API)
    // Después de crear, podrías actualizar la lista de tareas y cerrar el modal
    setIsTareaModalOpen(false); // Cerrar el modal
    // Limpiar el formulario
    setNuevaTarea({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', asociado: '', nivelPrioridad: '' });
  };

  // Función para abrir el modal de tarea
  const handleOpenTareaModal = () => {
    setIsTareaModalOpen(true);
  };

   // Función para cerrar el modal de tarea y resetear el estado
  const handleCloseTareaModal = () => {
    setIsTareaModalOpen(false);
    setNuevaTarea({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', asociado: '', nivelPrioridad: '' });
  };
  // *** Fin del estado y funciones para el modal "Agregar Tarea" ***


  // Clases de Tailwind para simular el botón (si Button de Shadcn UI falla)
  const buttonPrimaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";
  const buttonSecondaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2";


  return (
    <div className="flex flex-col h-screen">
      {/* Barra Superior (sin cambios) */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
           <div className="flex items-center mr-4">
             <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">
               U
             </div>
             <span>VER PERFIL</span>
           </div>
           <span className="mr-auto">
             ✉️
           </span>
          <div className="ml-auto mr-auto">
             <Image src="/backflow-logo.svg" alt="BackFlow Logo" width={100} height={30} />
          </div>
          <Link href="/logout" className="ml-auto">
             🚪
          </Link>
        </div>
      </div>

      {/* Enlace Regresar (sin cambios) */}
      <div className="p-4 pb-0">
        <Link href="/proyectos" className="text-blue-500 hover:underline flex items-center">
          ← Regresar
        </Link>
      </div>


      {/* *** MODAL "AGREGAR TAREA" *** */}
      <Dialog open={isTareaModalOpen} onOpenChange={handleCloseTareaModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Tarea</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Campos del formulario de tarea */}
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
              <Input id="tarea-fechaInicio" name="fechaInicio" value={nuevaTarea.fechaInicio} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" type="text" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-fechaTermino" className="text-right">Fecha termino:</label>
              <Input id="tarea-fechaTermino" name="fechaTermino" value={nuevaTarea.fechaTermino} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" type="text" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-asociado" className="text-right">Asociado:</label>
              {/* Usamos Input, pero si fuera Select, usarías el componente Select */}
              <Input id="tarea-asociado" name="asociado" value={nuevaTarea.asociado} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tarea-nivelPrioridad" className="text-right">Nivel prioridad:</label>
               {/* Usamos Input, pero si fuera Select, usarías el componente Select */}
              <Input id="tarea-nivelPrioridad" name="nivelPrioridad" value={nuevaTarea.nivelPrioridad} onChange={handleTareaInputChange} className="col-span-3" placeholder="XXXXXX" />
            </div>
          </div>
          <DialogFooter>
            {/* Botones del modal de tarea */}
             <Button variant="outline" onClick={handleCloseTareaModal}>Cancelar</Button> {/* Botón Cancelar */}
             {/* Basado en la imagen, solo hay un botón "→", que podría implicar un siguiente paso o simplemente "Continuar" */}
             {/* Si es solo "Continuar" o "Crear" en este paso, usa un botón primario */}
             <Button onClick={handleCreateTarea}>Crear Tarea</Button> {/* Botón Crear Tarea */}

             {/* Si el botón "→" implica un siguiente paso, podrías tener un botón "Siguiente" aquí y la lógica multipaso */}
              {/* <Button onClick={handleNextStepInTareaModal}>→</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* *** FIN MODAL "AGREGAR TAREA" *** */}


      {/* Contenido Principal de Detalle del Proyecto */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Secciones Superiores (Información y Solicitudes - sin cambios mayores) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Información Proyecto</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div> <p className="font-semibold">Nombre:</p> <p>{proyectoInfo.nombre}</p> </div>
              <div> <p className="font-semibold">Descripción:</p> <p>{proyectoInfo.descripcion}</p> </div>
               <div> <p className="font-semibold">Estado:</p> <p>{proyectoInfo.estado}</p> </div>
               <div> <p className="font-semibold">Metodología:</p> <p>{proyectoInfo.metodologia}</p> </div>
               <div> <p className="font-semibold">Fecha Inicio:</p> <p>{proyectoInfo.fechaInicio}</p> </div>
               <div> <p className="font-semibold">Fecha Fin:</p> <p>{proyectoInfo.fechaFin}</p> </div>
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

        {/* Sección Inferior con Pestañas */}
        <Tabs defaultValue="fases">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="fases">Fases</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="miembros">Miembros</TabsTrigger>
          </TabsList>
           <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="fases">
            {/* Contenido de la pestaña Fases */}
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

              {/* Botón "Crear" que abre el modal de tarea */}
              <div className="flex items-end justify-center sm:justify-start">
                   {/* Usamos el componente Button de Shadcn UI si no da error */}
                   <Button onClick={handleOpenTareaModal}>Crear</Button>
                  {/* Si Button falla, usa este: */}
                  {/* <button className={buttonPrimaryClasses} onClick={handleOpenTareaModal}>Crear</button> */}
               </div>
            </div>
          </TabsContent>

          <TabsContent value="cronograma">
            <div className="w-full h-[600px]">
              <TimelineCronograma />
            </div>
          </TabsContent>

          <TabsContent value="miembros">
            {/* Contenido de la pestaña Miembros (sin cambios) */}
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
                    Enviar Invitacion
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